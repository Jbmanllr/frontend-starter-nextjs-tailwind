import React, { useState } from "react";
import { RadioGroup } from '@headlessui/react'
import cn from 'clsx'
import { useUIContext } from '@context';
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const ThemesObj = [
    { id: 1, title: 'Default', slug: 'theme-default', users: <div className="flex gap-2 mt-1"><div className="h-3 w-7 bg-info rounded-sm"></div><div className="h-3 w-3 bg-success-400 rounded-sm"></div><div className="h-3 w-4 bg-warning rounded-sm"></div></div> },
    { id: 2, title: 'Theme 1', slug: 'theme-1', users: <div className="flex gap-2 mt-1"><div className="h-3 w-7 bg-info rounded-sm"></div><div className="h-3 w-3 bg-success-400 rounded-sm"></div><div className="h-3 w-4 bg-warning rounded-sm"></div></div> },
    { id: 3, title: 'Theme 2', slug: 'theme-2', users: <div className="flex gap-2 mt-1"><div className="h-3 w-7 bg-info rounded-sm"></div><div className="h-3 w-3 bg-success-400 rounded-sm"></div><div className="h-3 w-4 bg-warning rounded-sm"></div></div> }
]

const ThemeMenu: React.FC = () => {

    const {theme, setTheme} = useUIContext()
    const [selectedTheme, setSelectedTheme] = useState(ThemesObj[0])

    console.log('THEME SELECTED: ', theme, selectedTheme)

    const handleSelectTheme = (item : any) => {
        setSelectedTheme(item);
        setTheme(item.slug);   
    }

    return (
        <RadioGroup value={selectedTheme} onChange={handleSelectTheme}>
            <RadioGroup.Label className="text-xs font-medium text-gray-900 dark:text-dark-palette-200">Theme Selection</RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-1 sm:gap-x-4">
                {ThemesObj.map((mailingList) => (
                    <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ checked, active }) =>
                            cn(
                              checked ? 'border-transparent' : 'border-gray-300 dark:border-dark-palette-700/60',
                              active ? 'border-primary-500 outline-4 outline-primary-500 dark:ring-primary-400 dark:border-primary-400' : '',
                              'dark:highlight-white/10 relative flex cursor-pointer rounded-lg border bg-white dark:bg-dark-palette-800 p-3 shadow focus:outline-none'
                            )
                          }
                    >
                        {({ checked, active }) => (
                            <>
                                <span className="flex flex-1">
                                    <span className="flex flex-col">
                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900 dark:text-dark-palette-300">
                                        {mailingList.title}
                                    </RadioGroup.Label>
                                
                                    <RadioGroup.Description as="span" className="text-xs font-normal text-gray-900">
                                        {mailingList.users}
                                    </RadioGroup.Description>
                                    </span>
                                </span>
                                <CheckCircleIcon
                                    className={cn(!checked ? 'invisible' : '', 'h-5 w-5 text-primary-600 dark:text-primary-400')}
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

export default ThemeMenu
