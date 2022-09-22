import React, { Fragment, useEffect, useRef, useState } from "react";
import cn from 'clsx'
import { Menu, Transition, Combobox, Tab, Dialog, Disclosure, Popover } from '@headlessui/react'
import { AtSymbolIcon, ChevronRightIcon, ChevronLeftIcon, AcademicCapIcon, ChevronDownIcon, PhoneIcon, EnvelopeIcon, CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'

import {
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Container, Header, Main, Footer, Cards, Button, Breadcrumb, Pagination, Card, Gridlist } from "@components";

const activeFilters = [{ value: 'objects', label: 'Objects' }]


const posts = [
  {
    title: 'Boost your conversion rate',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'How to use search engine optimization to drive sales',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Improve your customer experience',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#', current: true, count: '158' },
  { name: 'Backpacks', href: '#', current: false, count: '896' },
  { name: 'Travel Bags', href: '#', current: false, count: '999+' },
  { name: 'Hip Bags', href: '#', current: false, count: '574' },
  { name: 'Laptop Sleeves', href: '#', current: false, count: '328' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false, count: '20+' },
      { value: 'beige', label: 'Beige', checked: false, count: '1025' },
      { value: 'blue', label: 'Blue', checked: true, count: '20+' },
      { value: 'brown', label: 'Brown', checked: false, count: '20+' },
      { value: 'green', label: 'Green', checked: false, count: '20+' },
      { value: 'purple', label: 'Purple', checked: false, count: '20+' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

const Home: React.FC = () => {
    
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [open, setOpen] = useState(false)

    return (
        <Container>
           {/*<img src="https://tailwindui.com/img/beams-basic.png" alt="" class="absolute top-0 left-1/2 -ml-[39rem] w-[113.125rem] max-w-none"></img>*/}

    <div className="flex flex-col justify-center relative overflow-hidden sm:py-12">
  <div className="max-w-screen-2xl mx-auto">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-1000"></div>
      <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
        </svg>
        <div className="space-y-2">
          <p className="text-slate-800">Learn how to make a glowing gradient background!</p>
          <a href="https://braydoncoyer.dev/blog/tailwind-gradients-how-to-make-a-glowing-gradient-background" className="block text-indigo-400 group-hover:text-slate-800 transition duration-200" target="_blank">Read Article →</a>
        </div>
      </div>
    </div>
  </div>
</div>



            <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={cn(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-screen-2xl py-16 px-4 sm:px-6 lg:px-8 rounded-lg mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Workspace sale</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-gray-700 dark:text-slate-300">
          Our thoughtfully designed workspace objects are crafted in limited runs.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-slate-400">
          Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
          organization with these sale items before we run out, workspace objects are crafted in limited runs.
        </p>
      <div className="mt-4 py-4 gap-4 grid grid-cols-2 md:grid-cols-4">
        <Button className="h-3" color="primary" size="lg" rounded='md' scale>Button</Button>
        <Button color="secondary" size="lg" rounded='md' scale>Button</Button>
        <Button color="tertiary" size="lg" rounded scale>Button</Button>
        <Button color="light" size="lg" rounded='md' scale>Button</Button>
        <Button color="dark" size="lg" rounded='md' scale>Button</Button>
        <Button color="dark" size="lg" rounded='full' scale>Button</Button>
        </div>
        <div className="flex mt-4 py-4 gap-5">
          <div className="flex gap-2">
            <Button color="primary" size="2xs" rounded='md' icon={<FunnelIcon className="w-3.5" aria-hidden="true" />}  ripple>
              Contain 2XS
            </Button>
            <Button 
              color="primary" 
              size="2xs" 
              rounded='md' 
              iconOnly 
              icon={<FunnelIcon className="w-3.5" aria-hidden="true" />}
            />
          </div>
          <div className="flex gap-2">
            <Button color="secondary" size="xs" rounded='md' ripple icon={<EnvelopeIcon className="w-4" aria-hidden="true" />} >
              Contain XS
            </Button>
            <Button 
              color="secondary" 
              size="xs" 
              rounded='md' 
              iconOnly 
              icon={<EnvelopeIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="tertiary" size="sm" rounded='md' ripple icon={<PhoneIcon className="w-4" aria-hidden="true" />}>
              Contain SM
            </Button>
            <Button 
              color="tertiary" 
              size="sm" 
              rounded='md' 
              iconOnly 
              icon={<PhoneIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="dark" size="md" rounded='md' ripple icon={<MagnifyingGlassIcon className="w-5" aria-hidden="true" />}>
              Contain MD
            </Button>
            <Button 
              color="dark" 
              size="md" 
              rounded='md' 
              iconOnly
              ripple
              icon={<MagnifyingGlassIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="light" size="lg" rounded='md' ripple icon={<AtSymbolIcon className="w-5" aria-hidden="true" />}>
              Contain LG
            </Button>
            <Button 
              color="light" 
              size="lg" 
              rounded='md' 
              iconOnly
              ripple
              icon={<AtSymbolIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 mt-2 py-2 gap-5">
          <div className="flex gap-2">
            <Button variant='outlined' color="primary" size="2xs" rounded='md' icon={<FunnelIcon className="w-3.5" aria-hidden="true" />}  ripple>
              Outline 2XS
            </Button>
            <Button
              variant='outlined'
              color="primary" 
              size="2xs" 
              rounded='md' 
              iconOnly 
              icon={<FunnelIcon className="w-3.5" aria-hidden="true" />}
            />
          </div>
          <div className="flex gap-2">
            <Button variant='outlined' color="secondary" size="xs" rounded='md' ripple icon={<EnvelopeIcon className="w-4" aria-hidden="true" />} >
            Outline XS
            </Button>
            <Button
              variant='outlined' 
              color="secondary" 
              size="xs" 
              rounded='md' 
              iconOnly 
              icon={<EnvelopeIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button variant='outlined' color="tertiary" size="sm" rounded='md' ripple icon={<PhoneIcon className="w-4" aria-hidden="true" />}>
            Outline SM
            </Button>
            <Button
              variant='outlined'
              color="tertiary" 
              size="sm" 
              rounded='md' 
              iconOnly 
              icon={<PhoneIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button variant='outlined' color="dark" size="md" rounded='md' ripple icon={<MagnifyingGlassIcon className="w-5" aria-hidden="true" />}>
            Outline MD
            </Button>
            <Button 
              variant='outlined'
              color="dark" 
              size="md" 
              rounded='md' 
              iconOnly
              ripple
              icon={<MagnifyingGlassIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button variant='outlined' color="light" size="lg" rounded='md' ripple icon={<AtSymbolIcon className="w-5" aria-hidden="true" />}>
            Outline LG
            </Button>
            <Button
              variant='outlined'
              color="light" 
              size="lg" 
              rounded='md' 
              iconOnly
              ripple
              icon={<AtSymbolIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
        </div>

        <div className="flex py-3 mt-4 gap-5">
        <div className="flex gap-2">
        <Button color="white" size="xl" rounded='lg' ripple icon={<AcademicCapIcon className="w-6" aria-hidden="true" />}>
        Contain XL
        </Button>
        <Button 
          color="white" 
          size="xl" 
          rounded='lg' 
          iconOnly 
          icon={<AcademicCapIcon className="w-6" aria-hidden="true" />} 
        />
      </div>
      <div className="flex gap-2">
        <Button color="dark" size="2xl" rounded='lg' ripple icon={<PlusIcon className="w-6" aria-hidden="true" />}>
          Contain 2XL
        </Button>
        <Button 
          color="dark" 
          size="2xl" 
          rounded='lg' 
          iconOnly 
          icon={<PlusIcon className="w-7" aria-hidden="true" />} 
        />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 py-4 gap-5">
          <div className="flex gap-1">
            <Button color="primary" size="2xs" rounded='md' ripple>
              Lorem 2XS
            </Button>
            <Button 
              color="primary" 
              size="2xs" 
              rounded='md' 
              iconOnly 
              icon={<FunnelIcon className="w-3" aria-hidden="true" />}
            />
          </div>
          <div className="flex gap-2">
            <Button color="secondary" size="xs" rounded='md' ripple>
              Ipsum XS
            </Button>
            <Button 
              color="secondary" 
              size="xs" 
              rounded='md' 
              iconOnly 
              icon={<EnvelopeIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="tertiary" size="sm" rounded='md' ripple>
              Dolor sit SM
            </Button>
            <Button 
              color="tertiary" 
              size="sm" 
              rounded='md' 
              iconOnly 
              icon={<PhoneIcon className="w-4" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="dark" size="md" rounded='md' ripple>
              Button MD
            </Button>
            <Button 
              color="dark" 
              size="md" 
              rounded='md' 
              iconOnly
              ripple
              icon={<MagnifyingGlassIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
          <div className="flex gap-2">
            <Button color="light" size="lg" rounded='md' ripple>
              Button LG
            </Button>
            <Button 
              color="light" 
              size="lg" 
              rounded='md' 
              iconOnly
              ripple
              icon={<AtSymbolIcon className="w-5" aria-hidden="true" />} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 py-3 gap-5">
        <div className="flex gap-2">
        <Button color="white" size="xl" rounded='lg' ripple>
          Button XL
        </Button>
        <Button 
          color="white" 
          size="xl" 
          rounded='lg' 
          iconOnly 
          icon={<AcademicCapIcon className="h-6 w-6" aria-hidden="true" />} 
        />
      </div>
      <div className="flex gap-2">
        <Button color="dark" size="2xl" rounded='lg' ripple>
          Button 2XL
        </Button>
        <Button 
          color="dark" 
          size="2xl" 
          rounded='lg' 
          iconOnly 
          icon={<PlusIcon className="h-7 w-7" aria-hidden="true" />} 
        />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 py-4 gap-6">
        <Button variant='contained' color="primary">Button</Button>
        <Button variant='outlined' color="primary">Button</Button>
        <Button variant='text' color="primary">Button</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 py-4 gap-6">
        <Button color="info">Button</Button>
        <Button color="success">Button</Button>
        <Button color="danger">Button</Button>
        <Button color="warning">Button</Button>
        <Button disabled>Button</Button>
      </div>


      </div>

      

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-gray-200 dark:border-slate-500 bg-white py-4 dark:bg-slate-600">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-400">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-slate-400 dark:group-hover:text-slate-300"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={cn(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <Popover key={section.name} className="relative inline-block px-4 text-left">
                      <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        <span>{section.name}</span>
                        {sectionIdx === 0 ? (
                          <span className="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">
                            1
                          </span>
                        ) : null}
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <form className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className="site-foreground-accent-1 shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
          <div className="mx-auto max-w-screen-2xl p-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <div className="text-sm font-medium text-gray-500 dark:text-slate-400">
              Filters
              <span className="sr-only">, active</span>
            </div>

            <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 dark:bg-slate-500 sm:ml-4 sm:block" />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters.map((activeFilter) => (
                  <span
                    key={activeFilter.value}
                    className="m-1 inline-flex items-center rounded-full border dark:text-slate-400 border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-900 py-1.5 pl-3 pr-2 text-xs font-medium text-gray-900"
                  >
                    <span>{activeFilter.label}</span>
                    <button
                      type="button"
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove filter for {activeFilter.label}</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
        

        <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
          <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-slate-600 pt-6 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900"></h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={cn(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block mr-2">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="transition-all space-y-2 border-b pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}  className={cn(
            category.current ? 'site-foreground-accent-1 text-color' : 'text-color-accent-1 hover:site-foreground-accent-1',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors motion-reduce:transition-none duration-200'
          )}>
                      <span className="truncate">{category.name}</span>
                        {category.count ? (
                          <span
                            className={cn(
                              category.current ? 'site-background text-color' : 'group-hover:text-color site-foreground-accent-1 text-gray-600 group-hover:site-background dark:text-slate-300',
                              'ml-auto inline-block py-0.5 px-3 text-xxs rounded-full'
                            )}
                          >
                            {category.count}
                          </span>
                        ) : null}
                        </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 dark:border-slate-700 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500 dark:text-white">
                            <span className="font-medium text-gray-900 dark:text-white">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 dark:text-slate-400"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                


    <div className="relative pt-16 pb-20 lg:pt-12 lg:pb-28">

      <div className="relative mx-auto">
        <Gridlist variant='cards' layout='horizontal' data={posts} />
      </div>
      

      


      
    </div>

    <Pagination />

              </div>

            </div>
          </section>
        </main>
<div className="max-w-screen-2xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12 lg:px-28 mb-12">
  <div className="">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-color">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-color-accent-1">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-color-accent-2">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-color-accent-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="site-background-accent-1">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-slate-700">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-600">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-slate-600">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-slate-600/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="site-background-accent-2">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-color text-slate-700/90">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-600/90">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-slate-600/90">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-slate-600/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="site-background-accent-3">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-slate-600">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-600/90">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-slate-600/90">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="site-background-accent-4">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-slate-300">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-300/80">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-slate-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-light-palette-900">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-slate-300">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-300/80">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-slate-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

</div>



<div className="max-w-screen-2xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-12 lg:px-28 mb-12">
  <div className="bg-primary-500">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-white">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-100">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-primary-100">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-primary-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-primary-50">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-primary-600">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-500">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-primary-500">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-primary-100">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-primary-600">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-500">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-primary-500">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-primary-200">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-500">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-400">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-400">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-300">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-600">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-500">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-500">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-400">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-700">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-600">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-600">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-600">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-100">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-200">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-200">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-700">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-800">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-primary-900">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-primary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-primary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-primary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-primary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

</div>

<div className="max-w-screen-2xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-12 lg:px-28 mb-12">
  <div className="bg-secondary-500">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-white">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-100">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-100">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-secondary-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-secondary-50">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-secondary-600">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-500">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-500">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-secondary-100">
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-3 text-secondary-600">Lorem ipsum.</h1>
    <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-500">Dolor sit amet.</h2>
    <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-500">Consectetur adipiscing.</h3>
    <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    </div>
  </div>

  <div className="bg-secondary-200">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-500">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-400">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-400">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-300">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-600">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-500">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-500">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-400">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-700">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-600">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-600">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-600">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-100">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-200">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-200">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-700">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-800">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

  <div className="bg-secondary-900">
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-secondary-200">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-secondary-300">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-secondary-300">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-secondary-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>

</div>

  <div className="max-w-screen-2xl mx-auto grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-12 lg:px-28 mb-12">

  <div className="flex">
    <div className="bg-info-600">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-info-100">Info.</h1>
        <h2 className="text-xl font-semibold mb-1 max-w-screen-lg text-info-100">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-info-100">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-info-200">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-5 border-t-2 border-inherit">
        <h1 className="text-2xl font-bold mb-1 text-info-400">Info.</h1>
        <h2 className="text-xl font-semibold mb-1 text-info-400">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-info-400">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-info-400">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>

    <div className="bg-info-200">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-info-600">Reverse.</h1>
        <h2 className="text-xl font-semibold mb-1 max-w-screen-lg text-info-500">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-info-500">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-info-500">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-5 border-t-2 border-inherit">
        <h1 className="text-2xl font-bold mb-1 text-info-900">Info.</h1>
        <h2 className="text-xl font-semibold mb-1 text-info-800">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-info-800">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-info-800">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>

  <div className="flex">
    <div className="bg-success-400">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-success-100">Success.</h1>
        <h2 className="text-xl font-semibold mb-1 text-success-100">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-success-100">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-success-100">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-5 border-t-2 border-inherit">
        <h1 className="text-2xl font-bold mb-1 text-success-700">Success.</h1>
        <h2 className="text-xl font-semibold mb-1 text-success-600">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-success-600">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-success-600">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>

    <div className="bg-success-200">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-success-600">Reverse.</h1>
        <h2 className="text-xl font-semibold mb-1 max-w-screen-lg text-success-500">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-success-500">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-success-500">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>



  <div className="flex">
    <div className="bg-warning-400">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-warning-100">Success.</h1>
        <h2 className="text-xl font-semibold mb-1 text-warning-100">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-warning-100">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-warning-100">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-warning-700">Success.</h1>
        <h2 className="text-xl font-semibold mb-1 text-warning-600">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-warning-600">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-warning-600">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>

    <div className="bg-warning-200">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-1 text-warning-600">Reverse.</h1>
        <h2 className="text-xl font-semibold mb-1 max-w-screen-lg text-warning-500">Dolor sit amet.</h2>
        <h3 className="text-lg mb-1 max-w-screen-lg text-warning-500">Consectetur adipiscing.</h3>
        <p className="max-w-screen-lg text-warning-500">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  </div>
  

</div>

      </div>
    </div>
          
       
        </Container>
    );
};

export default Home;
