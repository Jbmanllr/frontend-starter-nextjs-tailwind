import { FC, CSSProperties } from 'react'
import cn from 'clsx'
import Image from 'next/image'
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
    'border border-light-palette-100/70 dark:border-dark-palette-800/50 h-full flex overflow-hidden rounded-lg col-span-1 rounded-lg site-foreground dark:highlight-white/5 shadow-md shadow-gray-200/60',
    { ['horizontal flex-row h-40']: layout === 'horizontal', ['vertical flex-col divide-y divide-gray-200 dark:divide-dark-palette-700']: layout === 'vertical' },
    className
  )

  const imgWrapperClassName = cn(
    'flex-shrink-0 relative',
    { ['w-40 h-40 overflow-hidden rounded-md p-3']: layout === 'horizontal', ['w-full h-44 rounded-md']: layout === 'vertical' }
  )

  const imgClassName = cn(
    'transition-all duration-1000',
    { ['p-3']: layout === 'horizontal', ['object-cover']: layout === 'vertical' }
  )

  const contentClassName = cn(
    'flex flex-1 flex-col justify-between',
    { ['p-3']: layout === 'horizontal', ['p-5']: layout === 'vertical' }
  )
  const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
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

      //{`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      const keyStr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    
    const triplet = (e1: number, e2: number, e3: number) =>
      keyStr.charAt(e1 >> 2) +
      keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
      keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
      keyStr.charAt(e3 & 63)

      const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

  return (
    
        <div className={rootClassName}>
            {/*<img src={`${item.pictureBlur}`}/>*/}

            {/*<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
                    8w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />*/}
            {/*<Image
                  alt="Mountains"
                  src={item.picture}
                  placeholder="blur"
                  blurDataURL={item.pictureBlur}
                  width={700}
                  height={475}
              />*/}

              <ImageComponent
                loadingSpinner={true}
                isNext={true}
                //loading={'lazy'}
                imgWrapperClassName={imgWrapperClassName}
                className={imgClassName}
                src={item.picture}
                sizes="100vw" 
                fill
                width={300}
                height={200}
                quality={100}
                blurDataURL={rgbDataURL(item.pictureMainColor[0], item.pictureMainColor[1], item.pictureMainColor[2])}
                placeholder="blur"
                //{`data:image/svg+xml;base64,${useToBase64(shimmer(700, 475))}`}
                //{item.pictureBlur}
                //layout="responsive"
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
