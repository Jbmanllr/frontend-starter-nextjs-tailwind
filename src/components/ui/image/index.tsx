import React, { FC, CSSProperties, useState } from 'react'
import Image, { ImageProps } from 'next/future/image'
import { ClipLoader } from "react-spinners";
import { useToBase64 } from '@utils'

export interface ImageComponentProps {
    imgWrapperClassName : string;
    isNext : boolean;
    className : string;
    loadingSpinner : boolean;
    loading : string,
    src : string,
    quality : string,
    blurDataURL : string,
    placeholder : string,
    layout : string,
    ImageProps : ImageProps;
    width : number;
    height : number;
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
    ImageProps, 
    loading,
    src,
    quality,
    blurDataURL,
    placeholder,
    layout,
    props
}) => {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(src ? false : true);

    const timeStamp = new Date().getTime()

    console.log('IMG PROPS', src, blurDataURL, ImageProps, props, className, loaded)

    //src={`${src}?${timeStamp}`}

    return (<>
      <img src={blurDataURL} alt="Red dot" className='h-8 w-full' />
        <div className={imgWrapperClassName}>
        
            {
                loadingSpinner &&
                <ClipLoader
                    className='absolute z-50 h-full m-auto top-[45%] right-[45%]'
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
                    src={src}
                    placeholder={'blur'}
                    blurDataURL={blurDataURL}
                    fill
                    quality={quality}
                    onLoadingComplete={() => setLoaded(true)}
                    onError={() => error ? '' : setError(true)}
                    className={className}
                    //loader={myLoader}
                    //loading={loading}
                    //width={''}
                    //height={''}
                    //sizes="100vw"
                    //{...ImageProps}
                />
            }
            <figcaption className='sr-only'>Figure Caption</figcaption>
      

        </div>
        </>)
}

export default ImageComponent