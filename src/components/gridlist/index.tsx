import { FC, useState, useEffect } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Card, Button, Pagination } from "@components";
import { RadioGroup } from '@headlessui/react'
import { AtSymbolIcon, ChevronRightIcon, ChevronLeftIcon, AcademicCapIcon, ChevronDownIcon, PhoneIcon, EnvelopeIcon, CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'




const layouts = [
  {
    name: 'Vertical',
    id: 'vertical'
  },
  {
    name: 'Horizontal',
    id: 'horizontal'
  }
]

interface GridListProps {
  className?: string
  item? : any
  children? : any
  data? : any
  defaultLayout?: 'vertical' | 'horizontal'
  variant?: 'cards' | 'default' | 'table'
}

const placeholderImg = '/product-img-placeholder.svg'

const GridList: FC<GridListProps> = ({ data, children, item, className, variant = 'default', defaultLayout = 'vertical' }) => {

  const totalPages = data?.data?.pageCount

  {/*useEffect(() => {
    setPage(parseInt(data?.data?.page)-1)
  });
*/}
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

console.log('DATA IN GRID', data,)
console.log('PAGE', page, data?.data?.page)
const [selectedLayout, setSelectedLayout] = useState(defaultLayout)

  const rootClassName = cn(
    'mx-auto mt-12 grid gap-5 lg:max-w-none',
    { ['horizontal lg:grid-cols-2']: selectedLayout === 'horizontal', ['vertical xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4']: selectedLayout === 'vertical' },
    className
  )

  const imgClassName = cn(
    'ob+ject-cover',
    { ['w-40 h-40 p-3 overflow-hidden rounded-md']: selectedLayout === 'horizontal', ['w-full h-48']: selectedLayout === 'vertical' }
  )

  const contentClassName = cn(
    'flex flex-1 flex-col justify-between',
    { ['p-3']: selectedLayout === 'horizontal', ['p-5']: selectedLayout === 'vertical' }
  )


  return (
  <>
    <div className="px-4 py-4">
      <div className="ml-auto w-44">
        <RadioGroup value={selectedLayout} onChange={setSelectedLayout}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {layouts.map((layout) => (
              <RadioGroup.Option
                key={layout.id}
                value={layout.id}
                className=''>
                {({ active, checked }) => (
                  <><Button>Button</Button>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {layout.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>

    <ul role="list" className={rootClassName}>
        {data?.data?.rows?.map((item, i) => (
          <>

            <li key={i}>
                <Link href={`/product`}>
                  <Card item={item} layout={selectedLayout}/>
                </Link>
            </li>
            </>
        ))}
    </ul>
    
    <Pagination data={data}/>


   
    </>
  )
}

export default GridList
