import cn from 'clsx'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import s from './Button.module.css'
//import { LoadingDots } from '@components/ui'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark' | 'white' | 'ghost' | 'naked' | 'info' | 'success' | 'danger' | 'warning' | 'default'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const ButtonOld: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'primary',
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

  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
      [s.tertiary]: variant === 'tertiary',
      [s.light]: variant === 'light',
      [s.dark]: variant === 'dark',
      [s.white]: variant === 'white',
      [s.ghost]: variant === 'ghost',
      [s.naked]: variant === 'naked',
      [s.info]: variant === 'info',
      [s.success]: variant === 'success',
      [s.danger]: variant === 'danger',
      [s.warning]: variant === 'warning',
      [s.default]: variant === 'default',
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  return (
    <Component
      type={type}
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          {/* <LoadingDots /> */}
        </i>
      )}
    </Component>
  )
})

export default ButtonOld
