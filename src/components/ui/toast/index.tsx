// your-toast.jsx
import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { 
    XMarkIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

const toasties = [
    {   
        id: (Math.floor(Math.random() * 1000)),
        type: 'success',
        title: 'Success',
        content: 'Successfully Saved !',
    },
    {
        id: (Math.floor(Math.random() * 1000)),
        type: 'warning',
        title: 'Warning',
        content: 'Warning man !',
        action: 'visit',
        text: 'Change settings',
        target: 'settings'
      },
      {
        id: (Math.floor(Math.random() * 1000)),
        type: 'warning',
        title: 'Warning',
        content: 'Warning man !',
        action: 'visit',
        text: 'Change settings',
        target: 'settings'
      },
  ]

const Toast = React.forwardRef((props, forwardedRef) => {

    //const [notifications, setNotifications] = React.useState(toasties);
    const [count, setCount] = React.useState(toasties.length);
    const [open, setOpen] = React.useState(true);

  React.useImperativeHandle(forwardedRef, () => ({
    publish: () => setCount((count) => count + 1),
  }));

  console.log('Toast Count', count, Array(count).keys())

  return (
    <>
        {toasties.map((toast, index) => (
            
            <ToastPrimitive.Root
                key={index}
                open={open}
                duration={3000}
                className="relative w-80 mb-5 pointer-events-auto overflow-hidden rounded-lg bg-white/80 backdrop-blur-lg shadow-lg ring-1 ring-gray-500 ring-opacity-5"
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 w-0 flex-1 pt-0.5">
                            <ToastPrimitive.Title className="text-sm font-medium text-gray-900">
                                {toast.title}
                            </ToastPrimitive.Title>
                            <ToastPrimitive.Description>
                                {toast.content}
                                {toast.id}
                            </ToastPrimitive.Description>
                                {toast.action ?
                                    <button>Go</button> 
                                    : ''
                                }
                        </div>
                        <ToastPrimitive.Close 
                            className='absolute top-3 right-3'
                        >
                            <button
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </ToastPrimitive.Close>
                    </div>
                </div>
            </ToastPrimitive.Root>
    
        ))}
    </>
  );
});

export default Toast