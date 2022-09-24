import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
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
  
  const Paginate: FC<Props> = ({ className, data }) => {

    let totalPages = data?.data?.pageCount
    let pageSize = data?.data?.rows.length

    const [page, setPage] = useState<number>(parseInt(data?.data?.page));
    const [hasPrevious, setHasPrevious] = useState(page === 1 ? false : true);
    const [hasNext, setHasNext] = useState(page === totalPages ? false : true);

    const handlePageChange = (page: number) => {
      setPage(page);
    };
  
    console.log('Pagination state', page, totalPages, pageSize)
    console.log('hasPrevious', hasPrevious, 'hasNext', hasNext)
    return (
        <>
    <div className={cn('flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6', className)}>
    <div className="flex flex-1 justify-between sm:hidden">
      
      
    <Link
    onClick={() => setPage(page-1)}
    href="/"
    className={hasPrevious ? "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" : "d-none"}
    >
        Previous
      </Link>
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
          Page {page} of {totalPages} - Showing <span className="font-medium">1</span> to <span className="font-medium">{pageSize}</span> of{' '}
          <span className="font-medium">{totalPages*pageSize}</span> results
        </p>
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
         { hasPrevious ? <a
            href="#"
            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a> : ''}
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

  export default Paginate