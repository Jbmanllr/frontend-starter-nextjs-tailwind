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
        loading={'lazy'}
        className={imgClassName}
        src={`data:image/svg+xml;base64,${useToBase64(shimmer(700, 475))}`}
        width={250}
        height={240}
        quality={100}
        blurDataURL={`data:image/svg+xml;base64,${useToBase64(shimmer(700, 475))}`}
        placeholder="blur"
        layout="responsive"
            {...props}
        />
    )
}

export default ImageComponent