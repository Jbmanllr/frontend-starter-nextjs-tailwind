import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Card } from "@components";

interface GridListProps {
  className?: string
  item? : any
  children? : any
  data? : any
  layout?: 'vertical' | 'horizontal'
  variant?: 'cards' | 'default' | 'table'
}

const placeholderImg = '/product-img-placeholder.svg'

const GridList: FC<GridListProps> = ({ data, children, item, className, variant = 'default', layout = 'horizontal' }) => {

//console.log('ITEM', item)

  const rootClassName = cn(
    'mx-auto mt-12 grid gap-5 lg:max-w-none',
    { ['horizontal lg:grid-cols-2']: layout === 'horizontal', ['vertical lg:grid-cols-3']: layout === 'vertical' },
    className
  )

  const imgClassName = cn(
    'ob+ject-cover',
    { ['w-40 h-40 p-3 overflow-hidden rounded-md']: layout === 'horizontal', ['w-full h-48']: layout === 'vertical' }
  )

  const contentClassName = cn(
    'flex flex-1 flex-col justify-between',
    { ['p-3']: layout === 'horizontal', ['p-5']: layout === 'vertical' }
  )


  return (
    <ul role="list" className={rootClassName}>
        {data.map((item, i) => (
            <li key={i}>
                <Link href={`/product`}>
                  <Card item={item} layout={layout}/>
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default GridList
