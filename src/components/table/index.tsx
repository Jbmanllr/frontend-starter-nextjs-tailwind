
import React, { HTMLAttributes, HTMLProps, FC, useReducer, useLayoutEffect, useRef, useEffect, useState, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


import { makeData, Person } from '../../mock-api/makeData'
//import { fetchData, Person } from '../../mock-api/fake-people'
    
import {
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    Table as TableTypes,
    useReactTable,
} from '@tanstack/react-table'
    
    interface TableProps {
        className?: string
      }

      
    const Table: FC<TableProps> = ({ className }) => {

      const rerender = useReducer(() => ({}), {})[1]
      const [sorting, setSorting] = useState<SortingState>([])
    
      const [rowSelection, setRowSelection] = useState({})
      const [globalFilter, setGlobalFilter] = useState('')
    
      const columns = useMemo<ColumnDef<Person>[]>(
        () => [
          {
            id: 'select',
            header: ({ table }) => (
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />
            ),
            cell: ({ row }) => (
              <div className="px-1">
                <IndeterminateCheckbox
                  {...{
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              </div>
            ),
          },
          {
            header: 'Name',
            footer: props => props.column.id,
            columns: [
              {
                accessorKey: 'firstName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
              },
              {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id,
              },
            ],
          },
          {
            header: 'Info',
            footer: props => props.column.id,
            columns: [
              {
                accessorKey: 'age',
                header: () => 'Age',
                footer: props => props.column.id,
              },
              {
                header: 'More Info',
                columns: [
                  {
                    accessorKey: 'visits',
                    header: () => <span>Visits</span>,
                    footer: props => props.column.id,
                  },
                  {
                    accessorKey: 'status',
                    header: 'Status',
                    footer: props => props.column.id,
                  },
                  {
                    accessorKey: 'progress',
                    header: 'Profile Progress',
                    footer: props => props.column.id,
                  },
                ],
              },
            ],
          },
        ],
        []
      )
    
      const [data, setData] = useState(() => makeData(100000))
      const refreshData = () => setData(() => makeData(100000))
    
      const table = useReactTable({
        data,
        columns,
        state: {
          rowSelection,
          sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
      })
    
      return (
        <div className="p-2">
          <div>
            <input
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="p-2 font-lg shadow border border-block"
              placeholder="Search all columns..."
            />
          </div>
          <div className="h-2" />
          <table className="min-w-full table-fixed divide-y divide-gray-300">
            <thead className='bg-gray-50'>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                          <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer bg-red yoyo p-8 select-none min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >sort</div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id} className={table.getSelectedRowModel().flatRows.includes(cell.id) ? 'bg-primary-500' : undefined+' py-2'}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-1">
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                  />
                </td>
                <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
              </tr>
            </tfoot>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            {Object.keys(rowSelection).length} of{' '}
            {table.getPreFilteredRowModel().rows.length} Total Rows Selected
          </div>
          <hr />
          <br />
          <div>
            <button className="border rounded p-2 mb-2" onClick={() => rerender()}>
              Force Rerender
            </button>
          </div>
          <div>
            <button
              className="border rounded p-2 mb-2"
              onClick={() => refreshData()}
            >
              Refresh Data
            </button>
          </div>
          <div>
            <button
              className="border rounded p-2 mb-2"
              onClick={() => console.info('rowSelection', rowSelection)}
            >
              Log `rowSelection` state
            </button>
          </div>
          <div>
            <button
              className="border rounded p-2 mb-2"
              onClick={() =>
                console.info(
                  'table.getSelectedFlatRows()',
                  table.getSelectedRowModel().flatRows
                )
              }
            >
              Log table.getSelectedFlatRows()
            </button>
          </div>
        </div>
      )
    }
    
    function Filter({
      column,
      table,
    }: {
      column: Column<any, any>
      table: TableTypes<any>
    }) {
      const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)
    
      return typeof firstValue === 'number' ? (
        <div className="flex space-x-2">
          <input
            type="number"
            value={((column.getFilterValue() as any)?.[0] ?? '') as string}
            onChange={e =>
              column.setFilterValue((old: any) => [e.target.value, old?.[1]])
            }
            placeholder={`Min`}
            className="w-24 border shadow rounded"
          />
          <input
            type="number"
            value={((column.getFilterValue() as any)?.[1] ?? '') as string}
            onChange={e =>
              column.setFilterValue((old: any) => [old?.[0], e.target.value])
            }
            placeholder={`Max`}
            className="w-24 border shadow rounded"
          />
        </div>
      ) : (
        <input
          type="text"
          value={(column.getFilterValue() ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`Search...`}
          className="w-36 border shadow rounded"
        />
      )
    }
    
    function IndeterminateCheckbox({
      indeterminate,
      className = '',
      ...rest
    }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
      const ref = React.useRef<HTMLInputElement>(null!)
    
      useEffect(() => {
        if (typeof indeterminate === 'boolean') {
          ref.current.indeterminate = !rest.checked && indeterminate
        }
      }, [ref, indeterminate])
    
      return (
        <input
          type="checkbox"
          ref={ref}
          className={className + ' h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6'}
          {...rest}
        />
      )
    }
    
    
export default Table