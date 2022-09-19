import React, { Fragment, useState, useEffect } from "react";
import { Transition, Listbox } from '@headlessui/react'
import {useTheme} from 'next-themes'
import cn from 'clsx'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'

    const themes = [
      { id: 1, name: 'Light', slug: 'light', icon: <SunIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/> },
      { id: 2, name: 'Dark', slug: 'dark', icon: <MoonIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/> },
      { id: 3, name: 'System', slug: 'system', icon: <ComputerDesktopIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/>}
    ]
 
export const ThemeSelectionMenu: React.FC = () => {

    const { theme, setTheme } = useTheme()

    {/*
        const [mounted, setMounted] = useState(false)

        useEffect(() => {
          setMounted(true)
        }, [])

        if (!mounted) {
          return null
        }
    */}

    console.log('CURRENT THEME', theme)

    let [selected, setSelected] = useState(themes[0])

    useEffect(() => {
        setTheme(selected.slug);
      }, [selected]); // <- add the count variable her

    return (
      <>
        <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative ml-5">
              <Listbox.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-600 p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="block truncate">{selected.icon}</span>
              </Listbox.Button>
  
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options className="border border-white border-opacity-10 bg-opacity-70 dark:bg-slate-800 backdrop-blur backdrop-filter p-2 absolute right-0 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {themes.map((theme) => (
                    <Listbox.Option
                      key={theme.id}
                      className={({ active }) =>
                        cn(
                          active ? 'bg-slate-300 dark:bg-opacity-20 dark:border-slate-600 dark:bg-slate-300 text-gray-900 dark:text-slate-300' : 'text-gray-700 dark:text-slate-400',
                          'group rounded-lg text-sm relative cursor-pointer select-none py-2 pl-8 pr-4 bg-opacity-30'
                        )
                      }
                      value={theme}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={cn(selected ? 'font-semibold' : 'font-normal', 'block truncate ml-2')}>
                            {theme.name}
                          </span>
                          <span
                              className={cn(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                              )}
                            >
                            <button className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5" type="button" aria-label="Light">
                                {theme.icon}
                            </button>
                          </span>
  
                          {selected ? (
                            <span
                              className={cn(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                              )}
                            >
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};


