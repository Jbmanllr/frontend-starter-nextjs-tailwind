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
    closable = false,
    size = 'md',
    iconOnly = false
}) => {

    const [visible, setIsVisible] = useState(true);

    const root = clsx(
        'tag',
        className,
        {
            [`closable`] : closable,
            [variant]: !unstyled && variant,
            [`size-${size}`]: size,
        },
    );

    const closeIconClassName = clsx(
        'close h-3 w-3',
        {
        },
    );

    console.log('CLSX',  root)

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
                <span className="sr-only">Remove</span>
                <XMarkIcon className={closeIconClassName} />
            </button>}
           
        </Transition>
        </>
    )
}

export default Tag