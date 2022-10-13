import React, { useState } from "react";
import { RadioGroup } from '@headlessui/react'
import cn from 'clsx'
import { useAppContext, useUIContext } from '@context';
import { CheckCircleIcon, EyeIcon } from '@heroicons/react/20/solid'

const cbSchemesObj = [
    { id: 1, title: 'Default', slug: 'cbs-default', users: <div className="flex gap-2 mt-1"><div className="h-1.5 w-1.5 bg-info rounded-sm"></div><div className="h-1.5 w-1.5 bg-success-400 rounded-sm"></div><div className="h-1.5 w-1.5 bg-warning rounded-sm"></div><div className="h-1.5 w-1.5 bg-red-400 rounded-sm"></div></div> },
    { id: 2, title: 'Tritanopia', slug: 'cbs-tritanopia', users: <div className="flex gap-2 mt-1"><div className="h-1.5 w-1.5 bg-info rounded-sm"></div><div className="h-1.5 w-1.5 bg-success-400 rounded-sm"></div><div className="h-1.5 w-1.5 bg-warning rounded-sm"></div><div className="h-1.5 w-1.5 bg-red-400 rounded-sm"></div></div> },
    { id: 3, title: 'Protanopia', slug: 'cbs-protanopia', users: <div className="flex gap-2 mt-1"><div className="h-1.5 w-1.5 bg-info rounded-sm"></div><div className="h-1.5 w-1.5 bg-success-400 rounded-sm"></div><div className="h-1.5 w-1.5 bg-warning rounded-sm"></div><div className="h-1.5 w-1.5 bg-red-400 rounded-sm"></div></div> },
    { id: 4, title: 'Deuteranopia', slug: 'cbs-deuteranopia', users: <div className="flex gap-2 mt-1"><div className="h-1.5 w-1.5 bg-info rounded-sm"></div><div className="h-1.5 w-1.5 bg-success-400 rounded-sm"></div><div className="h-1.5 w-1.5 bg-warning rounded-sm"></div><div className="h-1.5 w-1.5 bg-red-400 rounded-sm"></div></div> },
]

const ColorBlindSchemeMenu: React.FC = () => {

    const { cbScheme, setCbScheme } = useUIContext()

    console.log('COLOR BLIND SCHEME: ', cbScheme)

    const [selectedMailingLists, setSelectedMailingLists] = useState(cbSchemesObj[0])

    const handleSelectCBScheme = (item : any) => {
      setSelectedMailingLists(item);
      setCbScheme(item.slug);   
    }

    return (
        <RadioGroup value={selectedMailingLists} onChange={handleSelectCBScheme}>
            <RadioGroup.Label className="text-xs font-medium text-gray-900 dark:text-dark-palette-200">Color Blind</RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-1 sm:gap-x-4">
                {cbSchemesObj.map((mailingList) => (
                    <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ checked, active }) =>
                            cn(
                              checked ? 'border-transparent' : 'border-gray-300 dark:border-dark-palette-700/60',
                              active ? 'border-primary-500 ring-2 ring-primary-500 dark:ring-primary-400 dark:border-primary-400' : '',
                              'relative flex cursor-pointer rounded-lg border bg-white dark:bg-dark-palette-800 px-3 py-2 shadow focus:outline-none'
                            )
                          }
                    >
                        {({ checked, active }) => (
                            <>
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                    <span className="flex flex-row">
                                    <EyeIcon className="h-4 w-4 mr-2 text-light-palette-500" />
                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900 dark:text-dark-palette-300">
                                        {mailingList.title}
                                    </RadioGroup.Label>
                                    </span>
                                
                                    <RadioGroup.Description as="span" className="text-xs font-normal text-gray-900">
                                        {mailingList.users}
                                    </RadioGroup.Description>
                                    </span>
                                </span>
                                <CheckCircleIcon
                                    className={cn(!checked ? 'invisible' : '', 'h-5 w-5 text-primary-600 dark:text-primary-40')}
                                    aria-hidden="true"
                                />
                                <span
                                    className={cn(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-primary-500 dark:border-primary-400' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

export default ColorBlindSchemeMenu
