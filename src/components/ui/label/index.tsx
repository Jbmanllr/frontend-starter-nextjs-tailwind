import React, { FC, useState } from 'react'
import { Transition } from '@headlessui/react'
import cn from 'clsx'
import {  XMarkIcon } from '@heroicons/react/24/outline'

interface LabelProps {
    //prefixCls?: string;
    className?: string;
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

const Label: FC<LabelProps> = ({ 
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

    const root = cn('label',
    {
       
    },
    className,
);

    return (
        <div className={root}>LABEL</div>
    )
}

export default Label
