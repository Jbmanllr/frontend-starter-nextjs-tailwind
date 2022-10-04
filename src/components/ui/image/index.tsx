import React, { FC, CSSProperties, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { ClipLoader } from "react-spinners";
import { useToBase64 } from '@utils'

export interface ImageComponentProps {
    imgWrapperClassName: string;
    className: string;
    loader : boolean;
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

const ImageComponent: FC<ImageComponentProps> = ({ 
    className,
    imgWrapperClassName,
    loader,
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

    console.log('IMG PROPS', ImageProps, props, className, loaded)
    return (
    
        <div className={imgWrapperClassName}>

            {
                loader && 
                    <ClipLoader
                        className='absolute z-50 top-[45%] right-[45%]'
                        speedMultiplier={0.7} 
                        color={''}
                        loading={!loaded} 
                        cssOverride={override} 
                        size={ 25 } 
                    />
            }

            <Image
                loading={loading}
                className={className}
                src={src}
                width={width}
                height={height}
                quality={quality}
                blurDataURL={blurDataURL}
                placeholder={placeholder}
                layout={layout}
                onLoadingComplete={() => setLoaded(true)}
                {...ImageProps}
            />
        </div> 
    )
}

export default ImageComponent