import { FC, useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import cn from 'clsx'
import { 
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    CheckIcon,
    ChevronUpDownIcon
} from '@heroicons/react/20/solid'

import { Paginate } from "@components";

interface Props {
  className?: string
  children?: any
  data?: any
}

const pageSizes = [
  { name: '4' },
  { name: '20' },
  { name: '30' },
  { name: '50' },
]


const Pagination: FC<Props> = ({ className, data }) => {

  const [selected, setSelected] = useState(pageSizes[0])

  let totalPages = data?.data?.pageCount
  let pageSize = selected.name
  let thisPageSize = data?.data?.rows.length
  let totalItems = totalPages*pageSize

  const checkIcon = false

  console.log('Total Pages', totalPages, 'Page Size', pageSize)

  //useEffect(() => {
  //  setPage(parseInt(data?.data?.page))
  //});

  const [page, setPage] = useState<number>(parseInt(data?.data?.page));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const onChange = (current, pageSize) => {
    setPage(current)
    console.log('onChange:current=', current);
    console.log('onChange:pageSize=', pageSize);
  };
  const onShowSizeChange = (current, pageSize) => {
    console.log(current);
    console.log(pageSize);
  };
  
  return (

    <>
        <Paginate
          className='flex justify-between gap-8 mt-12 py-3 items-center'
          showLessItems
          //pageSize={pageSize}
          prevIcon={<ChevronLeftIcon className='h-5 w-10'/>}
          nextIcon={<ChevronRightIcon className='h-5 w-10'/>}
          jumpPrevIcon={<EllipsisHorizontalIcon className='h-5 w-10 text-light-palette-400 hover:text-light-palette-800'/>}
          jumpNextIcon={<EllipsisHorizontalIcon className='h-5 w-10 text-light-palette-400 hover:text-light-palette-800 dark:hover:text-dark-palette-400'/>}
          total={10000}
          current={page}
          pageSizeOptions={['4', '20', '50', '100']}
          showTotal={(total, range) =>
            `${range[0]} - ${range[1]} of ${total} items`
          }
          totalBoundaryShowSizeChanger={4}
          //selectComponentClass={Select}
          showSizeChanger
          showQuickJumper={{ goButton: <button type="button"><ChevronRightIcon className='h-5 w-10'/></button> }}
          defaultPageSize={10}
          defaultCurrent={1}
          onShowSizeChange={onShowSizeChange}
          onChange={onChange}
        />

      
      {/*<Paginate
          simple
          current={page}
          showQuickJumper={{ goButton: true }}
          defaultCurrent={1}
          pageSize={pageSize}
          total={10000}
        />*/}
  </>
  )
}

export default Pagination