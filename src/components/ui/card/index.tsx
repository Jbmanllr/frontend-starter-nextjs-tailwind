import { FC, CSSProperties } from 'react'
import cn from 'clsx'
import Link from 'next/link'
//import type { Product } from '@commerce/types/product'
//import s from './ProductCard.module.css'
import { ImageProps } from 'next/image'
//import WishlistButton from '@components/wishlist/WishlistButton'
//import usePrice from '@framework/product/use-price'
//import ProductTag from '../ProductTag'
import { useToBase64 } from '@utils'
import { ImageComponent } from '@components'

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

  const rootClassName = cn(
    'border border-light-palette-100 dark:border-dark-palette-700/80 h-full flex overflow-hidden rounded-lg col-span-1 rounded-lg site-foreground dark:highlight-white/5 shadow-md shadow-gray-200/60',
    { ['horizontal flex-row h-40']: layout === 'horizontal', ['vertical flex-col divide-y divide-gray-200 dark:divide-dark-palette-700']: layout === 'vertical' },
    className
  )

  const imgWrapperClassName = cn(
    'flex-shrink-0 relative',
    { ['w-40 h-40 p-3 overflow-hidden rounded-md p-3']: layout === 'horizontal', ['w-full h-44 rounded-md']: layout === 'vertical' }
  )

  const imgClassName = cn(
    { ['']: layout === 'horizontal', ['object-cover']: layout === 'vertical' }
  )

  const contentClassName = cn(
    'flex flex-1 flex-col justify-between',
    { ['p-3']: layout === 'horizontal', ['p-5']: layout === 'vertical' }
  )

  //#adadad4a

  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`



      //{item.picture}
  return (
    
        <div className={rootClassName}>

              <ImageComponent
                loadingSpinner={true}
                isNext={true}
                loading={'lazy'}
                imgWrapperClassName={imgWrapperClassName}
                className={imgClassName}
                src={item.picture}
                sizes="100vw" 
                fill
                width={300}
                height={200}
                quality={100}
                blurDataURL={`data:image/svg+xml;base64,${useToBase64(shimmer(700, 475))}`}
                placeholder="blur"
                //{item.pictureBlur}
                //layout="responsive"
                {...imgProps}
              />
           
            <div className={contentClassName}>
                <div className="flex-1">
                    <p className="text-xs font-medium">
                        <a href={item.category.href} className="hover:underline hover:text-color text-color-accent-2">
                            {item.category}
                        </a>
                    </p>
                    <a href={item.href} className="mt-2 block">
                        <p className="text-md font-semibold text-dark hover:text-dark line-clamp-2 dark:text-dark-palette-100">{item.title}</p>
                        <p className="mt-3 text-sm text-color-accent-1 dark:text-dark-palette-100 line-clamp-3">{item.text}</p>
                    </a>
                </div>
                <div className="mt-4 flex items-center">
                    {/*<div className="flex-shrink-0">
                        <a href={item.author.href}>
                            <span className="sr-only">{item.author.name}</span>
                            <img className="h-10 w-10 rounded-full" src={item.author.imageUrl} alt="" />
                        </a>
  </div>*/}
                    <div className="ml-auto">
                       {/* <p className="text-sm font-medium text-gray-900 dark:text-slate-500">
                            <a href={item.author.href} className="hover:underline">
                                {item.author.name}
                            </a>
</p>*/}
                        <div className="flex space-x-1 text-xs text-color-accent-3">
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
