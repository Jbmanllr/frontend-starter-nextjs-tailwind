import React, {
    FC,
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
  useState,
  useEffect,
  CSSProperties
} from 'react'
import { Transition } from '@headlessui/react'
import cn from 'clsx'
import { makeData } from 'src/mock-api/fake-posts';
import { 
    XMarkIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

interface TagProps {
    /** Number to show in badge */
    prefixCls?: string;
    className?: string;
    variant?: 'contained' | 'outlined' | 'text'
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fill'
    rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    color?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark' | 'light-accent' | 'dark-accent' | 'white' | 'info' | 'success' | 'danger' | 'warning'
    closable?: boolean;
    closeIcon?: React.ReactNode;
    iconOnly?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
}

//{ ['bg-tertiary-100 text-tertiary-700 ring-tertiary-400/30 outline-tertiary-400/30']: color === 'tertiary' && variant === 'contained' },

const Tag: FC<TagProps> = ({ 
    className, 
    variant = 'contained', 
    color, 
    closable = false, 
    rounded = true, 
    size = 'sm',
    iconOnly = false
}) => {

    const [visible, setIsVisible] = React.useState(true);

    const rootClassName = cn(
        'inline-flex items-center font-medium h-min',
    { ['bg-primary-500 text-white ring-primary-400/30 outline-primary-400/30']: color === 'primary' && variant === 'contained' },
    { ['bg-secondary-500 text-white ring-secondary-400/30 outline-secondary-400/30']: color === 'secondary' && variant === 'contained' },
    { ['bg-tertiary-500 text-white ring-tertiary-400/30 outline-tertiary-400/30']: color === 'tertiary' && variant === 'contained' },
    { ['bg-slate-300 text-slate-500 ring-slate-400/30 outline-slate-400/30']: color === 'light' && variant === 'contained' },
    { ['bg-slate-700 text-slate-100 ring-slate-600/30 outline-slate-600/30']: color === 'dark' && variant === 'contained' },
    { ['bg-white border-gray-200 border text-black ring-slate-700/10']: color === 'white' && variant === 'contained' },
    { ['bg-info-100 text-info-500 outline-50 ring-info-400/30 outline-info-400/30']: color === 'info' && variant === 'contained' },
    { ['bg-success-100 text-success-500 ring-success-400/30 outline-success-400/30']: color === 'success' && variant === 'contained' },
    { ['bg-danger-100 text-danger-500 ring-danger-400/30 outline-danger-400/30']: color === 'danger' && variant === 'contained' },
    { ['bg-warning-100 text-warning-500 ring-warning-400/30 outline-warning-400/30']: color === 'warning' && variant === 'contained' },

    { ['rounded-sm']: rounded === 'sm' },
    { ['rounded']: rounded === true },
    { ['rounded-md']: rounded === 'md' },
    { ['rounded-lg']: rounded === 'lg' },
    { ['rounded-xl']: rounded === 'xl' },
    { ['rounded-full']: rounded === 'full' },

    { ['py-0.5 pl-2 pr-0.5 text-xs font-normal']: !iconOnly && size === 'xs' },
    { ['py-1 pl-2 pr-1 text-xs font-normal']: !iconOnly && size === 'sm' },
    { ['py-1.5 pl-2.5 pr-1.5 text-xs font-medium']: !iconOnly && size === 'md' },
    { ['py-2 pl-3 pr-2 text-xs font-medium']: !iconOnly && size === 'lg' },
    { ['py-2 pl-3.5 pr-2.5 text-sm font-normal']: !iconOnly && size === 'xl' },

        className
    )

    const buttonClassName = cn(
        'disabled:!bg-primary-500 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none',
        { ['ml-0.5']: !iconOnly && size === 'xs' },
        { ['ml-0.5']: !iconOnly && size === 'sm' },
        { ['ml-0.5']: !iconOnly && size === 'md' },
        { ['ml-1']: !iconOnly && size === 'lg' },
        { ['ml-1.5']: !iconOnly && size === 'xl' },
        )

    return (
        <>
        <Transition
            show={visible}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-600"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={rootClassName}
            as='span'
        >
            
                {/*<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
                </svg>*/}
            Small
            <button
                type="button"
                aria-label="Remove"
                className={buttonClassName}
                onClick={() => setIsVisible(false)}
            >
                <span className="sr-only">Remove small option</span>
                <svg className="h-2 w-2" stroke="white" fill="white" viewBox="0 0 8 8">
                <path strokeLinecap="round" fill="fill-current" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
            </button>
           
        </Transition>
        </>
    )
}

export default Tag