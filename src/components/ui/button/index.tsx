import React from 'react'
import { useButton } from 'react-aria';
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'
import { DotLoader, SyncLoader, BeatLoader, ClipLoader, PulseLoader, BarLoader, PropagateLoader } from "react-spinners";

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean
  disabled?: boolean
  loading?: boolean
  disableWhileLoading?: boolean
  isToggle?: boolean
  //type?: boolean
  loadingMessage?: string
}

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "transparent rgba(255, 255, 255, 0.03) rgba(255, 255, 255, 0.14) rgba(255, 255, 255, 0.75)",
  borderWidth: "2px 2px 2px 3px"
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {

  const { 
    asChild,
    children,
    className,
    disabled = false,
    loading = false,
    isToggle = false,
    disableWhileLoading = true,
    loadingMessage = 'Loading...',
  } = props

  const childrenType = children?.type
  const isChildrenLink = childrenType === 'a'

  const Component = (asChild ? Slot : 'button') as 'button'

  console.log('Children butto', children, 'Is children link', isChildrenLink)

  const { buttonProps, isPressed } = useButton({
    ...props, 
    elementType: (asChild ? childrenType : 'button')
  }, forwardedRef);
  
  //console.log('COMPONENT', Component, isPressed)

  const loader = 
    <ClipLoader
      speedMultiplier={0.9} 
      color={'transparent'}
      loading={loading} 
      cssOverride={override} 
      size={25} 
    />

  const buttonCN = clsx(
    className,
    'button',
    { ['loading']: loading === true },
    { ['disabled']: disabled === true },
    { ['focused']: isPressed === true }
  )

  //console.log('LOADING, DISABLED', loading, disabled)

  return (
    <Component
      {...buttonProps}
      //role={asChild ? 'button' : null}
      disabled={!asChild ? loading && disableWhileLoading ? true : disabled : false}
      ref={forwardedRef}
      //aria-pressed={!isToggle ? null : false}
      className={buttonCN}
    >
      {!asChild && loading ? 
        <>
          {loader}
          {children}
        </> 
        : children
      }
    </Component>
  )
})

export default Button