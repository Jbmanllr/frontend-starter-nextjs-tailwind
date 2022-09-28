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
import cn from 'clsx'
import { makeData } from 'src/mock-api/fake-posts';

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

const Tag: FC<TagProps> = ({ 
    className, 
    variant, 
    color, 
    closable = false, 
    rounded = 'sm', 
    size = 'md',
    iconOnly = false
}) => {

    const rootClassName = cn(
        'inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2 pr-0.5 text-xs font-medium text-indigo-700',
        className
    )

    const buttonClassName = cn(
        'ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none'
    )

    return (
        <>
        <span className={rootClassName}>
          Small
          <button
            type="button"
            className={buttonClassName}
          >
            <span className="sr-only">Remove small option</span>
            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
        <span className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-indigo-700">
          Large
          <button
            type="button"
            className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
          >
            <span className="sr-only">Remove large option</span>
            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      </>
    )
}

export default Tag