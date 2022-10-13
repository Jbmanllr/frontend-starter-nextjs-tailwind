import React, { useState } from "react";
import { RadioGroup } from '@headlessui/react'
import cn from 'clsx'
import { useUIContext } from '@context';
import { CheckCircleIcon, TableCellsIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/20/solid'

const ListingLayoutsObj = [
    { id: 1, title: 'Vertical', slug: 'vertical', icon: <ListBulletIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/>},
    { id: 2, title: 'Horizontal', slug: 'horizontal',icon: <Squares2X2Icon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/>},
    { id: 3, title: 'Table', slug: 'table', icon: <TableCellsIcon className="h-4 text-gray-400 dark:text-slate-400 group-hover:text-gray-600" aria-hidden="true"/> }
]

const ListingLayoutMenu: React.FC = () => {

    const {globalListingLayout, setGlobalListingLayout} = useUIContext()
    const [selectedListingLayout, setListingLayout] = useState(ListingLayoutsObj[0])

    console.log('LISTING LAYOUT SELECTED: ', globalListingLayout, selectedListingLayout)

    const handleSelectListingLayout = (item : any) => {
        setListingLayout(item);
        setGlobalListingLayout(item.slug);   
    }

    return (
        <RadioGroup value={selectedListingLayout} onChange={handleSelectListingLayout}>
            <RadioGroup.Label className="text-xs font-medium text-gray-900 dark:text-dark-palette-200">Theme Selection</RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-1 sm:gap-x-4">
                {ListingLayoutsObj.map((mailingList) => (
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
                                    <span className="flex flex-row">
                                    {mailingList.icon}
                                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900 dark:text-dark-palette-300">
                                        {mailingList.title}
                                    </RadioGroup.Label>
                                    
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

export default ListingLayoutMenu