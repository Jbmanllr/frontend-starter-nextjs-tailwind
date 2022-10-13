import React, { Fragment, useState } from "react";
import { Transition, Listbox, RadioGroup, Popover, Dialog } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import cn from 'clsx'
import { ColorBlindSchemeMenu, ThemeMenu, ThemeSchemeMenu, ListingLayoutMenu } from '@components';
import { useAppContext, useUIContext } from '@context';
import { SunIcon, MoonIcon, ComputerDesktopIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const themeSelection = true
const colorBlindSchemeSelection = true

const UiPreferencesMenu: React.FC = () => {

  const Content = <>
    {themeSelection && <ThemeMenu />}
    {colorBlindSchemeSelection && <ColorBlindSchemeMenu />}
    {true && <ListingLayoutMenu />}
  </>

  let [isOpenUI, setIsOpenUI] = useState(false)

  function closeUIModal() {
    setIsOpenUI(false)
  }

  function openUIModal() {
    setIsOpenUI(true)
  }

    return (
      <>
        <Popover className="relative z-0">
  
      {({ open }) => (
        <>
          <div className="relative z-10 bg-white shadow">
            <div className="mx-auto flex max-w-7xl px-2 py-2 sm:px-6 lg:px-4">
              <Popover.Button
                className={cn(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <ChevronDownIcon className="h-5 w-5 ui-open:rotate-180 ui-open:transform" />
            
              </Popover.Button>
            </div>
          </div>
          {/*<Popover.Overlay className="fixed inset-0 bg-black opacity-30 z-100" />*/}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            
            <Popover.Panel className="absolute -inset-x-[450px] lg:-inset-x-40 z-10 transform translate-y-4 shadow-lg w-[80vw] md:w-screen-2/3 lg:w-[46vw] lg:min-w-[30rem] lg:max-w-[35rem]">
              <div className="bg-white dark:bg-dark-palette-900 rounded-lg backdrop-blur-lg dark:border-dark-palette-800 border">
                <div className="mx-auto grid max-w-7xl gap-y-6 px-4 py-6 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-6 lg:grid-cols-3 lg:px-8 lg:py-8 xl:py-10">
              
                  {Content}

                </div>
              </div>
            </Popover.Panel>
            
          </Transition>
        </>
      )}
    
    </Popover>

        <button
            onClick={openUIModal}
            className={cn(
                isOpenUI ? 'text-gray-900' : 'text-gray-500',
                'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            <ChevronDownIcon className="h-5 w-5 ui-open:rotate-180 ui-open:transform" />
            
          </button>

    <Transition appear show={isOpenUI} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeUIModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:max-w-md md:relative absolute max-h-96 overflow-scroll bottom-0 md:rounded-2xl transform rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  {Content}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeUIModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    
    </>
  );
};

export default UiPreferencesMenu
