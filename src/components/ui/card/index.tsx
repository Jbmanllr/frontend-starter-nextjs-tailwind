import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
//import type { Product } from '@commerce/types/product'
//import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
//import WishlistButton from '@components/wishlist/WishlistButton'
//import usePrice from '@framework/product/use-price'
//import ProductTag from '../ProductTag'

interface CardProps {
  className?: string
  item? : any
  children? : any
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  layout?: 'vertical' | 'horizontal'
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const Card: FC<CardProps> = ({ children, item, imgProps, className, variant = 'default', layout = 'horizontal' }) => {

//console.log('ITEM', item)

  const rootClassName = cn(
    'flex overflow-hidden rounded-lg col-span-1 rounded-lg site-foreground-accent-1 dark:highlight-white/5 shadow-md shadow-gray-200/60',
    { ['horizontal flex-row h-40']: layout === 'horizontal', ['vertical flex-col divide-y divide-gray-200']: layout === 'vertical' },
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

{/*  <Image
    alt={product.name || 'Product Image'}
    className={s.productImage}
    src={product.images[0]?.url || placeholderImg}
    height={540}
    width={540}
    quality="85"
    layout="responsive"
    {...imgProps}
    />
  */}

  return (
    
        <div className={rootClassName}>
            <div className="flex-shrink-0">
                <img className={imgClassName} src={item.imageUrl} alt="" />
            </div>
            <div className={contentClassName}>
                <div className="flex-1">
                    <p className="text-xs font-medium text-indigo-600">
                        <a href={item.category.href} className="hover:underline dark:text-slate-400">
                            {item.category.name}
                        </a>
                    </p>
                    <a href={item.href} className="mt-2 block">
                        <p className="text-md font-semibold text-gray-900 line-clamp-2 dark:text-slate-300">{item.title}</p>
                        <p className="mt-3 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </a>
                </div>
                <div className="mt-6 flex items-center">
                    {/*<div className="flex-shrink-0">
                        <a href={item.author.href}>
                            <span className="sr-only">{item.author.name}</span>
                            <img className="h-10 w-10 rounded-full" src={item.author.imageUrl} alt="" />
                        </a>
  </div>*/}
                    <div className="ml-3">
                       {/* <p className="text-sm font-medium text-gray-900 dark:text-slate-500">
                            <a href={item.author.href} className="hover:underline">
                                {item.author.name}
                            </a>
</p>*/}
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={item.datetime}>{item.date}</time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{item.readingTime} read</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Card
