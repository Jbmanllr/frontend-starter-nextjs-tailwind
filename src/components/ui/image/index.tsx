import React, { FC, CSSProperties, useState } from 'react'
import Image, { ImageProps } from 'next/future/image'
import { ClipLoader } from "react-spinners";
import { useToBase64 } from '@utils'

export interface ImageComponentProps {
    imgWrapperClassName : string;
    isNext : boolean;
    className : string;
    loadingSpinner : boolean;
    ImageProps : Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
    //props : any
  }
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "transparent rgba(255, 255, 255, 0.03) rgba(255, 255, 255, 0.14) rgba(255, 255, 255, 0.75)",
    borderWidth: "2px 2px 2px 3px"
  };

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

  //`data:image/svg+xml;base64,${useToBase64(shimmer(700, 475))}`

  const myLoader = ({ src, width, quality }) => {
    console.log('LOADER PROPS', src, width, quality)
    return `${src}?w=${width}&q=${quality || 75}`
  }

const ImageComponent: FC<ImageComponentProps> = ({ 
    className,
    imgWrapperClassName,
    loadingSpinner,
    isNext = true,
    props,
    ImageProps, 
    loading,
    src,
    width,
    height,
    quality,
    blurDataURL,
    placeholder,
    layout
}) => {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(src ? false : true);

    const css = { width: '100%', height: 'auto' }
    console.log('IMG PROPS', ImageProps, props, className, loaded)

    return (
   
        <div className={imgWrapperClassName}>

            {
                loadingSpinner &&
                <ClipLoader
                    className='absolute z-50 h-full top-[45%] right-[45%]'
                    speedMultiplier={0.7} 
                    color={''}
                    loading={loaded} 
                    cssOverride={override} 
                    size={ 25 } 
                />
            }

           {
           
                isNext &&
                <Image
                    alt={'alt'}
                    fill
                    //loader={myLoader}
                    //loading={loading}
                    className={className}
                    src={src} 
                    width={''}
                    height={''}
                    //sizes="100vw"
                    quality={quality}
                    placeholder={placeholder}
                    blurDataURL={blurDataURL}
                    onLoadingComplete={() => setLoaded(true)}
                    onError={() => error ? '' : setError(true)}
                    //{...ImageProps}
                />
            }
        </div>
    )
}

export default ImageComponent