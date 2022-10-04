import React, { FC } from 'react'
import Image, { ImageProps } from 'next/image'

export interface ImageComponentProps {
    className: string;
    loading : any;
    ImageProps : Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
    //props : any
  }


const ImageComponent: FC<ImageComponentProps> = ({ 
    className,
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
    return (
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
    )
}

export default ImageComponent