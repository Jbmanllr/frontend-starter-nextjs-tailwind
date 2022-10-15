import { FC, useState, useEffect } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Card, Button, Pagination } from "@components";
import { RadioGroup } from '@headlessui/react'
import { AtSymbolIcon, Bars3Icon ,ChevronRightIcon, ChevronLeftIcon, AcademicCapIcon, ChevronDownIcon, PhoneIcon, EnvelopeIcon, CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useUIContext } from '@context';

const layouts = [
  {
    name: 'Vertical',
    slug: 'vertical'
  },
  {
    name: 'Horizontal',
    slug: 'horizontal'
  }
]

interface ListingProps {
  className?: string
  item? : any
  children? : any
  data? : any
  defaultLayout?: 'vertical' | 'horizontal'
  variant?: 'cards' | 'default' | 'table'
}

const placeholderImg = '/product-img-placeholder.svg'

const Listing: FC<ListingProps> = ({ data, children, item, className, variant = 'default', defaultLayout = 'vertical' }) => {

const {globalListingLayout, setGlobalListingLayout} = useUIContext()
const [selectedLayout, setSelectedLayout] = useState(globalListingLayout)

console.log('LYOUT LISTING HOME', globalListingLayout)

  const rootClassName = cn(
    'mx-auto grid gap-5 lg:max-w-none',
    { ['horizontal lg:grid-cols-2']: globalListingLayout === 'horizontal', ['vertical xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4']: globalListingLayout === 'vertical' },
    className
  )

  const imgClassName = cn(
    'ob+ject-cover',
    { ['w-40 h-40 p-3 overflow-hidden rounded-md']: globalListingLayout === 'horizontal', ['w-full h-48']: globalListingLayout === 'vertical' }
  )

  const contentClassName = cn(
    'flex flex-1 flex-col justify-between',
    { ['p-3']: globalListingLayout === 'horizontal', ['p-5']: globalListingLayout === 'vertical' }
  )


  return (
  <>
    <div className="flex pb-5">
      <div className="ml-auto">
        <RadioGroup value={globalListingLayout} onChange={setSelectedLayout}>
          <RadioGroup.Label className="sr-only">Select List Layout</RadioGroup.Label>
          <div className="flex">
            {layouts.map((layout) => (
              <RadioGroup.Option
                key={layout.slug}
                value={layout.slug}
                className=''>
                {({ active, checked }) => (
                  <>
                  <Button color={'light'} size={'xs'}><Bars3Icon className='h-5 w-5'/></Button>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium sr-only`}
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

            <li key={i}>
                <Link href={`/product`}>
                  <Card item={item} layout={globalListingLayout}/>
                </Link>
            </li>
  
        ))}
    </ul>
    
    <Pagination data={data}/>


   
    </>
  )
}

export default Listing
