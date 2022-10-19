import React, { useState, useMemo, useContext, Context, createContext } from 'react'
import clsx from 'clsx'

interface CardProps {
    className?: string;
    closable?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
    as? : React.ElementType | 'div' |'span' | 'li',
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    as = 'div'
}) => {

    const cardCN = clsx('text-dark-palette-100 text-opacity-70 group relative py-8 px-24 bg-dark-palette-900/90 shadow-xl border-none border-yellow-500 rounded highlight-white/20 ring-none ring-red-500 outline-0 outline-offset-none outline-primary-300',
        { [`hidden`] : false },
        className,
    );

    const As = as

    return (
        <div className='relative'>
            <span className='absolute mx-4 py-12 border blur-md opacity-50 group-hover:opacity-70 inset-0 bg-gradient-to-r from-pink-600 to-purple-600'></span>
        
        <As className={cardCN}>
           CLICK
        </As>
        </div>
    )
}

const Image: React.FC<CardProps> = ({
    children,
    className
}) => {

    const imageContainerCN = clsx('card-image-container', {}, className);
    const imageCN = clsx('card-image fit-picture', {}, className);

    return (
        !children ? 
        <div className={imageContainerCN}>
            <img className={imageCN}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
                alt="Grapefruit slice atop a pile of other slices">
            </img>
        </div> 
        : children
    )
}

//Card.Header = Header
Card.Image = Image
//Card.Body = Body
//Card.Footer = Footer

export default Card