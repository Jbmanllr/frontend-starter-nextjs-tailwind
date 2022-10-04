import { FC, CSSProperties } from 'react'
import cn from 'clsx'
import Link from 'next/link'
//import type { Product } from '@commerce/types/product'
//import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
//import WishlistButton from '@components/wishlist/WishlistButton'
//import usePrice from '@framework/product/use-price'
//import ProductTag from '../ProductTag'
import { DotLoader, SyncLoader, BeatLoader, ClipLoader, PulseLoader, BarLoader, PropagateLoader } from "react-spinners";

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

  const imgClassName = cn(
    'ob+ject-cover',
    { ['w-40 h-40 p-4 overflow-hidden rounded-md']: layout === 'horizontal', ['w-full h-48']: layout === 'vertical' }
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

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "transparent rgba(255, 255, 255, 0.03) rgba(255, 255, 255, 0.14) rgba(255, 255, 255, 0.75)",
        borderWidth: "2px 2px 2px 3px"
      };

  return (
    
        <div className={rootClassName}>
            <div className="flex-shrink-0">
            <ClipLoader 
                className='absolute z-50'
                speedMultiplier={0.9} 
                color={''}
                loading={true} 
                cssOverride={override} 
                size={ 25 } 
           />
            <Image
                loading={'lazy'}
                className={imgClassName}
                src={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                width={250}
                height={240}
                quality={75}
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                placeholder="blur"
                />
              
            </div>
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
