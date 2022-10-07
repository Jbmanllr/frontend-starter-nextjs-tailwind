import React, { FC, useState } from 'react'
import { Transition } from '@headlessui/react'
import cn from 'clsx'
import {  XMarkIcon } from '@heroicons/react/24/outline'

interface TagProps {
    //prefixCls?: string;
    className?: string;
    buttonClassName?: string;
    unstyled?: boolean;
    variant?: 'contained' | 'outlined';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    rounded?: boolean | 'rounded-sm' | 'rounded-md' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-full';
    fill?: boolean;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const Tag: FC<TagProps> = ({ 
    className,
    buttonClassName,
    children,
    fill = false,
    unstyled = false,
    rounded,
    variant = 'contained', 
    closable = false,
    closeIcon = <XMarkIcon className='close-icon' />,
    size = 'md',
    icon = false
}) => {

    const [visible, setIsVisible] = useState(true);
    const iconOnly = icon && !children
    
    const root = cn('tag',
        {
            [variant]: !unstyled && variant,
            [`${typeof rounded == "string" ? rounded : 'rounded'}`]: !unstyled && rounded,
            [`closable`] : closable,
            [`have-icon`] : !iconOnly ? icon : '',
            [`icon-only`] : iconOnly,
            [`size-${size}`]: size,
            [`fill`]: fill,
        },
        className,
    );

    const buttonClasses = cn('close-button', buttonClassName,
        {
            [`${typeof rounded == "string" ? rounded : 'rounded'}`]: !unstyled && rounded
        }
    )

    return (

        <Transition
            show={visible}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-600"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={root}
            as='span'
        >
            <span className='inline-flex items-center h-full'>
                {icon && <>{icon}</>}
                {!iconOnly && <span>{children}</span>}
            </span>

            {closable && 
                <button
                    type="button"
                    aria-label="Remove"
                    className={buttonClasses}
                    onClick={() => setIsVisible(false)}
                >
                    <span className="sr-only">Remove</span>
                    {closeIcon}
                </button> 
            }

        </Transition>
    )
}

export default Tag