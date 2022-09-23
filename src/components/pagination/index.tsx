import { FC, useState, useEffect } from 'react'
import { Pagination as Paginate } from "react-headless-pagination";
import cn from 'clsx'
import { 
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/20/solid'

interface Props {
  className?: string
  children?: any
  data?: any
}

const Pagination: FC<Props> = ({ className, data }) => {
    
    
  const totalPages = data?.data?.pageCount

  {/*useEffect(() => {
    setPage(parseInt(data?.data?.page)-1)
  });
*/}
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  
  return (

    <>
    <div className={cn('flex mt-8 items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6', className)}>
    <div className='flex'>

<div>
    <p className="text-sm text-gray-700">
      Page {page} / {totalPages} pages / <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
      <span className="font-medium">{totalPages*10}</span> results
    </p>
  </div>
</div>

<div className='flex'>

<Paginate
  currentPage={page}
  setCurrentPage={handlePageChange}
  totalPages={totalPages}
  edgePageCount={2}
  middlePagesSiblingCount={2}
  className="lol"
  truncableText="..."
  truncableClassName="px-4 py-2 shadow-none bg-none"
>
    <nav aria-label="Pagination">
  <Paginate.PrevButton className="relative inline-flex items-center rounded-md border border-gray-300  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /></Paginate.PrevButton>

  <div className="relative ml-3 inline-flex items-center rounded-md shadow-sm bg-white dark:bg-dark-palette-700 text-sm font-medium text-gray-700 dark:text-light-palette-100">
    <Paginate.PageButton
      activeClassName="border-indigo-500 dark:border-gray-700 bg-indigo-50 dark:bg-dark-palette-200 text-indigo-600 dark:text-dark-palette-600"
      inactiveClassName="hover:bg-gray-50"
      className="first:rounded-l-md last:rounded-r-md relative z-10 inline-flex items-center border border-gray-300 dark:border-gray-800 px-4 py-2 text-sm font-medium focus:z-20 cursor-pointer"
    />
  </div>

  <Paginate.NextButton className="relative inline-flex items-center rounded-md border ml-3 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><ChevronRightIcon className="h-5 w-5" aria-hidden="true" /></Paginate.NextButton>
  <span className='ml-3'>Go to page <input className={'w-12'} type={'text'}></input></span>
  
  </nav>
</Paginate>

</div>
</div>
    
    <div className={cn('flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6', className)}>
    <div className="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        href="#"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </a>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">97</span> results
        </p>
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            href="#"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
          <a
            href="#"
            aria-current="page"
            className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            2
          </a>
          <a
            href="#"
            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
          >
            3
          </a>
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
          <a
            href="#"
            className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
          >
            8
          </a>
          <a
            href="#"
            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            9
          </a>
          <a
            href="#"
            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            10
          </a>
          <a
            href="#"
            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
  </>
  )
}

export default Pagination