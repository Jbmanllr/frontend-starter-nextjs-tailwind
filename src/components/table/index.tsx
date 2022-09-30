import React, { 
  HTMLProps, 
  FC, 
  useReducer,
  useEffect, 
  useState, 
  useMemo 
} from 'react'

//import { map }from 'lodash';

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
            accessorKey: 'id',
            header: 'ID',
            size: 60,
          },
          {
            accessorKey: 'firstName',
            cell: info => info.getValue(),
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
          },
          {
            accessorKey: 'age',
            id: 'age',
            header: () => 'Age',
            size: 50,
          },
          {
            accessorKey: 'visits',
            id: 'id',
            header: () => <span>Visits</span>,
            size: 50,
          },
          {
            accessorKey: 'status',
            id: 'status',
            header: 'Status',
          },
          {
            accessorKey: 'progress',
            id: 'progress',
            header: 'Profile Progress',
            size: 80,
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
    
      let selectedIdsArray = table.getSelectedRowModel().flatRows.map(row =>  row.id )

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
          <table className="min-w-full table-auto divide-y divide-gray-300 shadow-lg rounded-lg">
            <thead className='theadz rounded-lg '>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className=''>
                  {headerGroup.headers.map(header => {
                    return (
                      <th key={header.id} colSpan={header.colSpan} className={' border-r p-3 relative border-gray-200 dark:border-dark-palette-700'}>
                        {header.isPlaceholder ? null : (
                          <>
                          <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'absolute right-4 w-4 cursor-pointer mb-3 bg-gray-200 rounded-full px-3 select-none py-1 pr-3 text-left text-sm font-semibold text-gray-900'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      ><span className='font-normal'>*</span></div>
                      <span className='font-semibold'>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}</span>
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
                  <>
                  {/*console.log('ARRAY OF SELECTED ID', selectedIdsArray)*/}
                  {/*console.log('row ID', row.id, row.index)*/}

                  <tr key={row.id} className={selectedIdsArray.includes(row.id) ? 'bg-primary-100 dark:bg-primary-500 border-l-4 rounded text-primary-700 dark:text-primary-100 border-primary-400 hover:bg-primary-200 dark:hover:bg-primary-400' : row.index % 2 === 0 ? 'bg-light-palette-50 dark:bg-dark-palette-700 border-light-palette-100 hover:bg-light-palette-100' : 'bg-white dark:bg-dark-palette-900 hover:bg-light-palette-100 border-light-palette-100'}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <>
                        
                        <td key={cell.id} className={selectedIdsArray.includes(row.id) ? 'focus:shadow-lg transition-all hover:scale-105 duration-300 z-100 outline-primary-400 border-r border-primary-200 dark:border-primary-400 px-3 py-2 hover:bg-primary-300/60' : parseInt(cell.id) % 2 === 0 ? 'px-3 py-2 border-r border-light-palette-200/50' : 'px-3 py-2 border-r border-light-palette-200/50'}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      </>)
                    })}
                  </tr>
                  </>)
              })}
            </tbody>
            <tfoot>
              <tr className={'bg-light-palette-100 py-3'}>
                <td className="p-4">
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
            className="w-13 h-7 shadow-sm rounded border-none text-sm font-normal mt-2"
          />
          <input
            type="number"
            value={((column.getFilterValue() as any)?.[1] ?? '') as string}
            onChange={e =>
              column.setFilterValue((old: any) => [old?.[0], e.target.value])
            }
            placeholder={`Max`}
            className="w-13 h-7 shadow-sm rounded border-none text-sm font-normal mt-2"
          />
        </div>
      ) : (
        <input
          type="text"
          value={(column.getFilterValue() ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`Search...`}
          className="w-28 h-7 shadow-sm rounded border-none text-sm font-normal mt-2"
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