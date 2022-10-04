import React, { FC, CSSProperties } from 'react'
import Image, { ImageProps } from 'next/image'
import { DotLoader, SyncLoader, BeatLoader, ClipLoader, PulseLoader, BarLoader, PropagateLoader } from "react-spinners";
import { useToBase64 } from '@utils'

export interface ImageComponentProps {
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

const ImageComponent: FC<ImageComponentProps> = ({ 
    className,
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
    console.log('IMG PROPS', ImageProps, props, className)
    return (<>
       {loader && <ClipLoader
        className='absolute z-50 top-[45%] right-[45%]'
        speedMultiplier={0.7} 
        color={''}
        loading={true} 
        cssOverride={override} 
        size={ 25 } 
      />}
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
        {...ImageProps}
        />
   </> )
}

export default ImageComponent