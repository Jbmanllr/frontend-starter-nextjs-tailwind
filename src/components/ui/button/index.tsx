import cn from 'clsx'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
  useState,
  useEffect,
  CSSProperties
} from 'react'
import mergeRefs from 'react-merge-refs'

import { DotLoader, SyncLoader, BeatLoader, ClipLoader, PulseLoader, BarLoader, PropagateLoader } from "react-spinners";
import { Loading } from '@components'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "transparent rgba(255, 255, 255, 0.03) rgba(255, 255, 255, 0.14) rgba(255, 255, 255, 0.75)",
  borderWidth: "2px 2px 2px 3px"
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'contained' | 'outlined' | 'text'
  color? : 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark' | 'white' | 'info' | 'success' | 'danger' | 'warning'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fill'
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  plainShadow? : boolean
  ripple? : boolean
  scale? : boolean
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
  icon?: any
  iconOnly?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {

  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 800);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  function rippleGo(e) {
    const rect = e.target.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const {
    className,
    variant = 'contained',
    color = 'primary',
    size = 'md',
    shadow = 'md',
    plainShadow = false,
    ripple = true,
    scale = false,
    rounded = 'sm',
    icon,
    iconOnly = false,
    children,
    active,
    type='button',
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const haveIcon = !iconOnly && icon
 // 
  const rootClassName = cn(
    'dark:highlight-white/10 overflow-hidden relative transition-colors duration-300 cursor-pointer outline-4 outline-gray-300 inline-flex leading-6 text-center justify-center items-center tracking-wide',
    { ['shadow-md']: variant === 'contained' && shadow === 'md'},
    { ['active:scale-97']: scale === true },
    { ['']: variant === 'contained' },
    { ['ripple-button']: ripple === true },

    { ['shadow-primary-400/70 dark:shadow-primary-800']: plainShadow === true && color === 'primary' && variant === 'contained' },
    { ['shadow-secondary-400/70 dark:shadow-secondary-800']: plainShadow === true && color === 'secondary' && variant === 'contained' },
    { ['shadow-gray-400/70 dark:shadow-gray-700']: plainShadow === true && color === 'tertiary' && variant === 'contained' },
    { ['shadow-slate-400/70 dark:shadow-slate-700']: plainShadow === true && color === 'light' && variant === 'contained' },
    { ['shadow-slate-400/70 dark:shadow-slate-800']: plainShadow === true && color === 'dark' && variant === 'contained' },
    { ['shadow-black-400/70 dark:shadow-white/30']: plainShadow === true && color === 'white' && variant === 'contained' },
    { ['shadow-info-400/30']: plainShadow === true && color === 'info' && variant === 'contained' },
    { ['shadow-success-400/30']: plainShadow === true && color === 'success' && variant === 'contained' },
    { ['shadow-danger-400/30']: plainShadow === true && color === 'danger' && variant === 'contained' },
    { ['shadow-warning-400/30']: plainShadow === true && color === 'warning' && variant === 'contained' },

    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'primary' && variant === 'outlined' },
    { ['border border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-gray-100']: color === 'secondary' && variant === 'outlined' },
    { ['border border-tertiary-500 text-tertiary-500 hover:bg-tertiary-500 hover:text-gray-100']: color === 'tertiary' && variant === 'outlined' },
    { ['border border-light-500 text-light-500 hover:bg-light-500 hover:text-gray-100']: color === 'light' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'dark' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'white' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'info' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'success' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'danger' && variant === 'outlined' },
    { ['border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-gray-100']: color === 'warning' && variant === 'outlined' },
    
    { ['rounded-sm']: rounded === 'sm' },
    { ['rounded-md']: rounded === 'md' || typeof rounded == "boolean"},
    { ['rounded-lg']: rounded === 'lg' },
    { ['rounded-xl']: rounded === 'xl' },
    { ['rounded-full']: rounded === 'full' },
    { ['']: !iconOnly },

    { ['h-8 max-h-8 text-xs font-normal']: !iconOnly && size === '2xs' },
    { ['h-9 max-h-9 text-sm font-normal']: !iconOnly && size === 'xs' },
    { ['h-11 max-h-11 text-sm font-normal']: !iconOnly && size === 'sm' },
    { ['h-13 max-h-13 text-md font-normal']: !iconOnly && size === 'md' },
    { ['h-14 max-h-14 text-lg font-normal']: !iconOnly && size === 'lg' },
    { ['h-15 max-h-15 text-lg font-normal']: !iconOnly && size === 'xl' },
    { ['h-16 max-h-16 text-xl font-normal']: !iconOnly && size === '2xl' },
    { ['h-18 max-h-18 text-xl font-semibold']: !iconOnly && size === '3xl' },

    { ['pr-3.5 pl-3']: haveIcon && size === '2xs' },
    { ['pr-4 pl-3.5']: haveIcon && size === 'xs' },
    { ['pr-5 pl-4']: haveIcon && size === 'sm' },
    { ['pr-6 pl-5']: haveIcon && size === 'md' },
    { ['pr-7 pl-6']: haveIcon && size === 'lg' },
    { ['pr-7 pl-6']: haveIcon && size === 'xl' },
    { ['pr-7 pl-6']: haveIcon && size === '2xl' },
    { ['pr-8 pl-7']: haveIcon && size === '3xl' },

    { ['px-3.5']: !iconOnly && !icon && size === '2xs' },
    { ['px-4']: !iconOnly && !icon && size === 'xs' },
    { ['px-5']: !iconOnly && !icon && size === 'sm' },
    { ['px-6']: !iconOnly && !icon && size === 'md' },
    { ['px-7']: !iconOnly && !icon && size === 'lg' },
    { ['px-7']: !iconOnly && !icon && size === 'xl' },
    { ['px-7']: !iconOnly && !icon && size === '2xl' },
    { ['px-8']: !iconOnly && !icon && size === '3xl' },

    { ['text-xs h-8 max-h-8 w-8']: iconOnly && size === '2xs' },
    { ['text-xs h-9 max-h-9 w-9']: iconOnly && size === 'xs' },
    { ['text-sm h-11 max-h-11 w-11']: iconOnly && size === 'sm' },
    { ['text-sm h-13 max-h-13 w-13']: iconOnly && size === 'md' },
    { ['text-md h-14 max-h-14 w-14']: iconOnly && size === 'lg' },
    { ['text-lg h-15 max-h-15 w-15']: iconOnly && size === 'xl' },
    { ['text-lg h-16 max-h-16 w-16']: iconOnly && size === '2xl' },
    { ['text-lg h-18 max-h-18 w-18']: iconOnly && size === '3xl' },

    { ['bg-primary-500 hover:bg-primary-400 text-primary-100 ring-primary-400/30 outline-primary-400/30']: color === 'primary' && variant === 'contained' },
    { ['bg-secondary-500 hover:bg-secondary-400 text-secondary-100 ring-secondary-400/30 outline-secondary-400/30']: color === 'secondary' && variant === 'contained' },
    { ['bg-gray-400 text-gray-700 ring-gray-400/30 outline-gray-400/30']: color === 'tertiary' && variant === 'contained' },
    { ['bg-slate-500 text-slate-300 ring-slate-400/30 outline-slate-400/30']: color === 'light' && variant === 'contained' },
    { ['bg-slate-700 text-slate-300 ring-slate-600/30 outline-slate-600/30']: color === 'dark' && variant === 'contained' },
    { ['bg-white text-black ring-slate-700/10']: color === 'white' && variant === 'contained' },
    { ['bg-info-100 text-info-500 outline-50 ring-info-400/30 outline-info-400/30']: color === 'info' && variant === 'contained' },
    { ['bg-success-100 text-success-500 ring-success-400/30 outline-success-400/30']: color === 'success' && variant === 'contained' },
    { ['bg-danger-100 text-danger-500 ring-danger-400/30 outline-danger-400/30']: color === 'danger' && variant === 'contained' },
    { ['bg-warning-100 text-warning-500 ring-warning-400/30 outline-warning-400/30']: color === 'warning' && variant === 'contained' },

    { ['hover:bg-primary-500/25 text-primary-500 dark:text-white/90 hover:dark:text-primary-300 shadow-primary-300/60 ring-primary-400/30 outline-primary-400/30']: color === 'primary' && variant === 'text' },
    { ['hover:bg-secondary-500/25 text-secondary-500 dark:text-white/90 hover:dark:text-secondary-300 shadow-secondary-300/60 drop-shadow-secondary-400 ring-secondary-400/30 outline-secondary-400/30']: color === 'secondary' && variant === 'text' },
    { ['hover:bg-gray-400/25 text-tertiary-500 dark:text-white/90 hover:dark:text-gray-300 ring-gray-400/30 outline-gray-400/30']: color === 'tertiary' && variant === 'text' },
    { ['hover:bg-slate-500/25 text-slate-500 dark:text-white/90 hover:dark:text-primary-300 ring-slate-400/30 outline-slate-400/30']: color === 'light' && variant === 'text' },
    { ['hover:bg-slate-700/25 text-slate-700 dark:text-white/90 hover:dark:text-white ring-slate-600/30 outline-slate-600/30']: color === 'dark' && variant === 'text' },
    { ['hover:bg-gray-300/25 text-black dark:text-white/90 hover:dark:text-primary-300 ring-slate-700/10']: color === 'white' && variant === 'text' },
    { ['hover:bg-info-300/25 hover:dark:bg-info-100/25 hover:dark:text-info-400 dark:text-info-300 text-info-500 outline-50 ring-info-400/30 outline-info-400/30']: color === 'info' && variant === 'text' },
    { ['hover:bg-success-300/25 text-success-500 hover:dark:text-success-400 dark:text-success-300 ring-success-400/30 outline-success-400/30']: color === 'success' && variant === 'text' },
    { ['hover:bg-danger-300/25 text-danger-500 hover:dark:text-danger-500 dark:text-danger-400 ring-danger-400/30 outline-danger-400/30']: color === 'danger' && variant === 'text' },
    { ['hover:bg-warning-300/25 text-warning-500 hover:dark:text-warning-400 dark:text-warning-300 ring-warning-400/30 outline-warning-400/30']: color === 'warning' && variant === 'text' },
    className
  )

  const iconClassName = cn(
    { ['mr-2']: size === '2xs' },
    { ['mr-2.5']: size === 'xs' },
    { ['mr-3']: size === 'sm' },
    { ['mr-3']: size === 'md' },
    { ['mr-3']: size === 'lg' },
    { ['mr-3']: size === 'xl' },
    { ['mr-3']: size === '2xl' }
  )

  return (
    <Component
      onClick={e => { ripple && !isRippling ? rippleGo(e) : '' }}
      type={type}
      aria-pressed={active}
      data-variant={variant}
      data-color={color}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={loading ? true : disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : (
        ''
      )}
      
      { icon && !iconOnly ? <i className={iconClassName}>{icon}</i> : '' }
      { icon && iconOnly ? !loading ? icon : '' : '' }
      { children }
      { loading && (
        <i className={cn((iconOnly ? '' : 'ml-3'), 'm-0 flex')}>
           <ClipLoader 
           speedMultiplier={0.9} 
           color={'transparent'} 
           loading={true} 
           cssOverride={override} 
           size={ size === '2xs' || size === 'xs' || size === 'sm' ? 15 : size === 'md' || size === 'lg' ? 22 : size === 'xl' || size === '2xl' ? 28 : 25 } />
          {/*<Loading size={ size === '2xs' || size === 'xs' || size === 'sm' ? 'sm' : size === 'md' || size === 'lg' ? 'md' : size === 'xl' || size === '2xl' ? 'lg' : 'lg' } />*/}
        </i>
      ) }
    </Component>
  )
})

export default Button