import React from "react";
import { Fragment, useState } from 'react'
import { MagnifyingGlassIcon, DocumentPlusIcon, EnvelopeIcon, FolderPlusIcon, HashtagIcon, TagIcon, FolderIcon } from '@heroicons/react/20/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { Button } from "@components";


const projects = [
    { id: 1, name: 'Workflow Inc. / Website Redesign', url: '#' },
    // More projects...
  ]
  const recent = [projects[0]]
  const quickActions = [
    { name: 'Add new file...', icon: DocumentPlusIcon, shortcut: 'N', url: '#' },
    { name: 'Add new folder...', icon: FolderPlusIcon, shortcut: 'F', url: '#' },
    { name: 'Add hashtag...', icon: HashtagIcon, shortcut: 'H', url: '#' },
    { name: 'Add label...', icon: TagIcon, shortcut: 'L', url: '#' },
  ]
  
const people = [
    { id: 1, name: 'Leslie Alexander', url: '#' },
    // More people...
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  


export const GlobalSearch: React.FC = () => {

    const [query, setQuery] = useState('')

    const [open, setOpen] = useState(false)

    const [rawQuery, setRawQuery] = useState('')

    const filteredProjects =
    rawQuery === '#'
      ? projects
      : query === '' || rawQuery.startsWith('>')
      ? []
      : projects.filter((project) => project.name.toLowerCase().includes(query))


    const filteredPeople =
    query === ''
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

    return (

        <>
      
        <button 
        type="button" 
        className="bg-white relative pointer-events-auto ml-5 flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 px-1.5 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
        onClick={() => setOpen(true)}
        >
            <MagnifyingGlassIcon className="block h-6 w-6" aria-hidden="true"/>
        </button>
      

<Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-palette-900 bg-opacity-70 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={(item) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-900 text-opacity-40"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === '' || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                  >
                    <li className="p-2">
                      {query === '' && (
                        <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-900">Recent searches</h2>
                      )}
                      <ul className="text-sm text-gray-700">
                        {(query === '' ? recent : filteredProjects).map((project) => (
                          <Combobox.Option
                            key={project.id}
                            value={project}
                            className={({ active }) =>
                              classNames(
                                'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <FolderIcon
                                  className={classNames(
                                    'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                    active && 'text-opacity-100'
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">{project.name}</span>
                                {active && <span className="ml-3 flex-none text-gray-500">Jump to...</span>}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </ul>
                    </li>
                    {query === '' && (
                      <li className="p-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-700">
                          {quickActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                  active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={classNames(
                                      'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                      active && 'text-opacity-100'
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">{action.name}</span>
                                  <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">{action.shortcut}</kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filteredProjects.length === 0 && (
                  <div className="py-14 px-6 text-center sm:px-14">
                    <FolderIcon className="mx-auto h-6 w-6 text-gray-900 text-opacity-40" aria-hidden="true" />
                    <p className="mt-4 text-sm text-gray-900">
                      We couldn't find any projects with that term. Please try again.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700 backdrop-blur backdrop-filter">
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('#') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    #
                  </kbd>{' '}
                  <span className="sm:hidden">for projects,</span>
                  <span className="hidden sm:inline">to access projects,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for users, and{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

        </>
    );
};
