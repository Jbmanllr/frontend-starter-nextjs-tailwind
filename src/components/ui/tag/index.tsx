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
import cn, { clsx } from 'clsx'
import { makeData } from 'src/mock-api/fake-posts';
import { 
    XMarkIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

interface TagProps {
    prefixCls?: string;
    className?: string;
    unstyled?: boolean;
    variant?: 'contained' | 'outlined'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fill'
    rounded?: boolean | 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    color?: 'primary' | 'secondary' | 'tertiary' | 'tot' | 'tot-s1' | 'tot-s2' | 'tot-s3' | 'info' | 'success' | 'danger' | 'warning' | 'default'
    closable?: boolean;
    closeIcon?: React.ReactNode;
    iconOnly?: boolean;
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
    icon?: React.ReactNode;
    children?: any
}

//{ ['bg-tertiary-100 text-tertiary-700 ring-tertiary-400/30 outline-tertiary-400/30']: color === 'tertiary' && variant === 'contained' },

const Tag: FC<TagProps> = ({ 
    className,
    children,
    unstyled = false,
    variant = 'contained', 
    color = 'default',
    closable = true, 
    rounded = true, 
    size = 'md',
    iconOnly = false
}) => {

    const [visible, setIsVisible] = useState(true);

    const test = 'test tested testing'

    const root = clsx(
        className,
        'tag',
        {
            [`closable`] : closable,
            [`${color}`]: !unstyled && color,
            [variant]: !unstyled && variant,
            [`rounded${typeof rounded == "boolean" || rounded === 'default' ? '' : !rounded ? '' : `-${rounded}` }`]: !unstyled && rounded,
            [`size-${size}`]: size,
        },
    );

    console.log('CLSX',  root)

    const rootClassName = cn(
        'tag',
    { ['bg-primary-500 border border-primary-500 text-white ring-primary-400/30 outline-primary-400/30']: color === 'primary' && variant === 'contained' },
    { ['bg-secondary-500 border border-secondary-500 text-white ring-secondary-400/30 outline-secondary-400/30']: color === 'secondary' && variant === 'contained' },
    { ['bg-tertiary-500 border border-tertiary-500 text-white ring-tertiary-400/30 outline-tertiary-400/30']: color === 'tertiary' && variant === 'contained' },
    { ['bg-light-palette-300 dark:bg-dark-palette-700 border border-light-palette-300 dark:border-dark-palette-700 dark:text-dark-palette-200 text-light-palette-700 ring-light-palette-400/30 outline-light-palette-400/30']: color === 'light' && variant === 'contained' },
    { ['bg-dark-palette-700 dark:bg-dark-palette-100 border-light-palette-300 dark:border-dark-palette-100 dark:text-dark-palette-800 border border-dark-palette-700 text-dark-palette-100 ring-dark-palette-600/30 outline-dark-palette-600/30']: color === 'dark' && variant === 'contained' },
    { ['bg-white border-gray-200 border text-black ring-slate-700/10']: color === 'white' && variant === 'contained' },
    { ['bg-info-100 text-info-500 border border-info-100 outline-50 ring-info-400/30 outline-info-400/30']: color === 'info' && variant === 'contained' },
    { ['bg-success-100 border border-success-100 text-success-500 ring-success-400/30 outline-success-400/30']: color === 'success' && variant === 'contained' },
    { ['bg-danger-100 border border-danger-100 text-danger-500 ring-danger-400/30 outline-danger-400/30']: color === 'danger' && variant === 'contained' },
    { ['bg-warning-100 border border-warning-100 text-warning-500 ring-warning-400/30 outline-warning-400/30']: color === 'warning' && variant === 'contained' },

    { ['rounded-sm']: rounded === 'sm' },
    { ['rounded']: rounded === true },
    { ['rounded-md']: rounded === 'md' },
    { ['rounded-lg']: rounded === 'lg' },
    { ['rounded-xl']: rounded === 'xl' },
    { ['rounded-full']: rounded === 'full' },

    { ['py-0.5 pl-2 pr-0.5 text-xs font-normal']: !iconOnly && size === 'xs' },
    { ['py-1 pl-2 pr-1 text-xs font-normal']: !iconOnly && size === 'sm' },
    { ['py-1.5 pl-2.5 pr-1.5 text-xs font-medium']: !iconOnly && size === 'md' },
    { ['py-1.5 pl-3 pr-2 text-sm font-medium']: !iconOnly && size === 'lg' },
    { ['py-2 pl-3.5 pr-2.5 text-sm font-normal']: !iconOnly && size === 'xl' },

        className
    )

    const buttonClassName = cn(
        'disabled:!bg-primary-500 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-white/40 hover:bg-current/50 focus:text-white focus:outline-none',
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
            className={root}
            as='span'
        >
            
                {/*<svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
                </svg>*/}
            {children}
            {closable && <button
                type="button"
                aria-label="Remove"
                className={buttonClassName}
                onClick={() => setIsVisible(false)}
            >
                <span className="sr-only">Remove small option</span>
                <XMarkIcon className='h-3 w-3 text-current' />
            </button>}
           
        </Transition>
        </>
    )
}

export default Tag