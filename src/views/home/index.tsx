import { Fragment, useState, FC } from "react";
import cn from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { Menu, Transition, Dialog, Disclosure, Popover } from '@headlessui/react'
import {
    AdjustmentsHorizontalIcon,
    AdjustmentsVerticalIcon,
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    ChevronUpDownIcon,
    AtSymbolIcon, 
    AcademicCapIcon, 
    ChevronDownIcon, 
    PhoneIcon, 
    EnvelopeIcon,
    MagnifyingGlassIcon, 
    FunnelIcon, 
    MinusIcon, 
    PlusIcon, 
    Squares2X2Icon,
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    UserCircleIcon,
    TagIcon,
    ChatBubbleLeftEllipsisIcon,
    CalendarIcon
} from '@heroicons/react/20/solid'

import { XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'
import { fetchData } from '../../mock-api/fake-posts'
import axios from "axios";
import { Container, Button, Listing, Table, Calendar, Tag, Label, Contain, NewCard } from "@components";
import { Profile, LogIn, SignIn } from "@views";

const activeFilters = [{ value: 'objects', label: 'Objects' }]

const positions = [
    {
      id: 1,
      title: 'Back End Developer',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
      applicants: [
        {
          name: 'Dries Vincent',
          email: 'dries.vincent@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Lindsay Walton',
          email: 'lindsay.walton@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Courtney Henry',
          email: 'courtney.henry@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Tom Cook',
          email: 'tom.cook@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ],
    },
    {
      id: 2,
      title: 'Front End Developer',
      department: 'Engineering',
      closeDate: '2020-01-07',
      closeDateFull: 'January 7, 2020',
      applicants: [
        {
          name: 'Whitney Francis',
          email: 'whitney.francis@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Leonard Krasner',
          email: 'leonard.krasner@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Floyd Miles',
          email: 'floy.dmiles@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ],
    },
    {
      id: 3,
      title: 'User Interface Designer',
      department: 'Design',
      closeDate: '2020-01-14',
      closeDateFull: 'January 14, 2020',
      applicants: [
        {
          name: 'Emily Selman',
          email: 'emily.selman@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Kristin Watson',
          email: 'kristin.watson@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
          name: 'Emma Dorsey',
          email: 'emma.dorsey@example.com',
          imageUrl:
            'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      ],
    },
  ]

const activity = [
    {
      id: 1,
      type: 'comment',
      person: { name: 'Eduardo Benz', href: '#' },
      imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
      date: '6d ago',
    },
    {
      id: 2,
      type: 'assignment',
      person: { name: 'Hilary Mahy', href: '#' },
      assigned: { name: 'Kristin Watson', href: '#' },
      date: '2d ago',
    },
    {
      id: 3,
      type: 'tags',
      person: { name: 'Hilary Mahy', href: '#' },
      tags: [
        { name: 'Bug', href: '#', color: 'bg-rose-500' },
        { name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
      ],
      date: '6h ago',
    },
    {
      id: 4,
      type: 'comment',
      person: { name: 'Jason Meyers', href: '#' },
      imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
      date: '2h ago',
    },
  ]
  

const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
      { rating: 5, count: 1019 },
      { rating: 4, count: 162 },
      { rating: 3, count: 97 },
      { rating: 2, count: 199 },
      { rating: 1, count: 147 },
    ],
    featured: [
      {
        id: 1,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Emily Selman',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
      // More reviews...
    ],
  }

  
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

const fetchDataOptions = {
  pageIndex: 2,
  pageSize: 8,
}


const HomeView: FC = ( { data, isMounted } ) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleBtnclick = () => {
    setIsLoading(isLoading ? false : true)
    console.log('POOOOOI', isLoading)
  }

   {/* const dataQuery = useQuery(
      ['data', fetchDataOptions],
      () => fetchData(fetchDataOptions),
      { keepPreviousData: true }
   )*/}
  
    //console.log('CLIENT SIDE HOME DATA', dataQuery)

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [open, setOpen] = useState(false)
  
      return (
          <Container>
             {/*<img src="https://tailwindui.com/img/beams-basic.png" alt="" class="absolute top-0 left-1/2 -ml-[39rem] w-[113.125rem] max-w-none"></img>*/}
  
      {/*<div className="flex flex-col justify-center relative overflow-hidden sm:py-12">
    <div className="max-w-screen-xl mx-auto">
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
      </div>*/}

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
  
        <div className="mx-auto max-w-screen-xl py-16 px-4 sm:px-6 lg:px-8 rounded-lg mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-slate-100">Workspace sale</h1>
          <p className="mt-4 max-w-2xl text-xl font-bold text-gray-700 dark:text-slate-300">
            Our thoughtfully designed workspace objects are crafted in limited runs.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-slate-400">
            Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
            organization with these sale items before we run out, workspace objects are crafted in limited runs.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 py-4">
            <Button className="primary contained xs rounded shadow">
              <ChatBubbleLeftEllipsisIcon
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Button XS
            </Button>
            <Button 
              className="primary contained xs rounded shadow" 
              color="primary"
              type="button"
            >
              <ChatBubbleLeftEllipsisIcon
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </Button>
            <Button className="primary contained sm rounded shadow">
              <StarIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
                Button SM
            </Button>
            <Button className="primary contained sm rounded shadow">
              <StarIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
            </Button>
            <Button className="primary contained md rounded shadow">
            <FunnelIcon
                className="h-4.5 w-4.5"
                aria-hidden="true"
              />
              Button MD
            </Button>
            <Button 
              className="primary contained lg rounded shadow"
              onPress={() => handleBtnclick()}
              //onKeyDown={() => handleBtnclick()}
              >
              <AdjustmentsHorizontalIcon
                className="h-4.5 w-4.5"
                aria-hidden="true"
              />
              Button LG CTL
            </Button>
            <Button className="primary contained lg rounded shadow">
              <AdjustmentsHorizontalIcon
                className="h-4.5 w-4.5"
                aria-hidden="true"
              />
            </Button>
            <Button
                className="primary contained xl rounded-lg shadow" 
                //type="submit"
                loading={isLoading}
                loadingMessage='Sending..'
                asChild        
                //toggle
              >
            
                <Link href={'/demo'}>
                  <ChatBubbleLeftEllipsisIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  />
                  Div Button
                </Link>
                
              </Button>
            <Button className="primary contained xl rounded-lg shadow">
              <ChatBubbleLeftEllipsisIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Button>
 
            <Button loading={isLoading} className="primary contained md rounded shadow">
            <FunnelIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
              Button FILL
            </Button>
          </div>


          <div className="flex flex-wrap items-center gap-4 py-3">
            <Button 
              className="primary contained md rounded shadow"
              type="button"
            >
              Primary
            </Button>
            <Button 
              className="secondary contained md rounded shadow"
              type="button"
            >
              Secondary
            </Button>
            <Button 
              className="tertiary contained md rounded shadow"
              type="button"
            >
              Tertiary
            </Button>
            <Button 
              className="info contained md rounded shadow"
              type="button"
            >
              Info
            </Button>
            <Button 
              className="success contained md rounded shadow"
              type="button"
            >
              Success
            </Button>
            <Button 
              className="warning contained md rounded shadow"
              type="button"
            >
              Warning
            </Button>
            <Button 
              className="danger contained md rounded shadow" 
              type="button"
            >
              Danger
            </Button>

          </div>

          <div className="flex flex-wrap items-center gap-4 py-3">
            <Button 
              className="primary-light contained md rounded shadow-sm"
              type="button"
            >
              Primary
            </Button>
            <Button 
              className="secondary-light contained md rounded shadow-sm"
              type="button"
            >
              Secondary
            </Button>
            <Button 
              className="tertiary-light contained md rounded shadow-sm"
              type="button"
            >
              Tertiary
            </Button>
            <Button 
              className="info-light contained md rounded shadow-sm"
              type="button"
            >
              Info
            </Button>
            <Button 
              className="success-light contained md rounded shadow-sm"
              type="button"
            >
              Success
            </Button>
            <Button 
              className="warning-light contained md rounded shadow-sm"
              type="button"
            >
              Warning
            </Button>
            <Button 
              className="danger-light contained md rounded shadow-sm" 
              type="button"
            >
              Danger
            </Button>

          </div>

        
          <div className="flex flex-wrap items-center gap-4 py-3">
            <Button 
              className="primary outlined md rounded shadow"
              type="button"
            >
              Primary
            </Button>
            <Button 
              className="secondary outlined md rounded shadow"
              type="button"
            >
              Secondary
            </Button>
            <Button 
              className="tertiary outlined md rounded shadow"
              type="button"
            >
              Tertiary
            </Button>
            <Button 
              className="info outlined md rounded shadow"
              type="button"
            >
              Info
            </Button>
            <Button 
              className="success outlined md rounded shadow"
              type="button"
            >
              Success
            </Button>
            <Button 
              className="warning outlined md rounded shadow"
              type="button"
            >
              Warning
            </Button>
            <Button 
              className="danger outlined md rounded shadow" 
              type="button"
            >
              Danger
            </Button>

          </div>

          <div className="flex flex-wrap items-center gap-4 py-3">
            <Button 
              className="primary-light outlined md rounded shadow-sm"
              type="button"
            >
              Primary
            </Button>
            <Button 
              className="secondary-light outlined md rounded shadow-sm"
              type="button"
            >
              Secondary
            </Button>
            <Button 
              className="tertiary-light outlined md rounded shadow-sm"
              type="button"
            >
              Tertiary
            </Button>
            <Button 
              className="info-light outlined md rounded shadow-sm"
              type="button"
            >
              Info
            </Button>
            <Button 
              className="success-light outlined md rounded shadow-sm"
              type="button"
            >
              Success
            </Button>
            <Button 
              className="warning-light outlined md rounded shadow-sm"
              type="button"
            >
              Warning
            </Button>
            <Button 
              className="danger-light outlined md rounded shadow-sm" 
              type="button"
            >
              Danger
            </Button>

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 py-4">
            <Button 
              className="tot contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s1 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s2 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s3 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s4 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s5 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s6 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s7 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s8 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s9 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>
            <Button 
              className="tot-s10 contained md rounded shadow" 
              color="primary"
              type="button"
              scale
            >
              Button
            </Button>

          </div>
       
        </div>
  
        
  
        {/* Filters */}
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
  
          <div className="border-b border-gray-200 dark:border-slate-500 bg-white py-4 dark:bg-slate-600">
            <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
            <div className="mx-auto max-w-screen-xl p-4 sm:flex sm:items-center sm:px-6 lg:px-8">
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
          
  
          <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
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
                <form className="bg-white border-light-palette-100 dark:bg-dark-palette-700 dark:border-dark-palette-700 dark:highlight-white/10 hidden lg:block mr-5 md:mr-7 rounded-md shadow p-4">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="transition-all space-y-2 border-b pb-6 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}  className={cn(
              category.current ? 'bg-light-palette-100 dark:bg-dark-palette-800 text-light-palette-500 dark:text-dark-palette-300' : 'dark:text-dark-palette-400 text-light-palette-500 hover:bg-light-palette-100 hover:dark:bg-dark-palette-800',
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors motion-reduce:transition-none duration-200'
            )}>
                        <span className="truncate">{category.name}</span>
                          {category.count ? (
                            <span
                              className={cn(
                                category.current ? 'bg-white dark:bg-dark-palette-700 text-light-palette-500 border border-light-palette-100 dark:text-dark-palette-300 dark:border-dark-palette-800/30' : 'text-gray-500 group-hover:text-color site-foreground-accent-1 group-hover:bg-white dark:text-dark-palette-400',
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
                  
      <div className="relative pb-20 lg:pb-28 divide-y">
  
        {/*<div className="relative mx-auto">
          <Listing variant='cards' layout='horizontal' data={dataQuery} />
        </div>*/}
        
        <div className="relative mx-auto">
          <Listing variant='cards' layout='horizontal' data={data} />
        </div>

        <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <div>
            <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
            
            </span>
          </div>
          <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
          </p>
        </div>

        <div className="mt-20">
          <div className="flex flex-wrap items-center gap-4 py-4">

            {isMounted && 
              <Label
                as={'div'}
                className="rounded"
                //onClick={() => console.log(isMounted)}
                //visible={true} 
                //mounted={true}
              >
                <Label.Prefix className={'bg-primary-300 rounded'}>
                  <FunnelIcon className={'icon h-5 w-5'} />
                </Label.Prefix >
                <Label.Title>Label SM</Label.Title >
                <Label.Suffix>
                  <FunnelIcon className={'icon h-5 w-5'} />
                </Label.Suffix >
                <Label.Close className={isMounted ? "bg-red-400" : ""}>
                  <XMarkIcon className={'icon h-5 w-5'} />
                </Label.Close>
              </Label>
            }

            <div className="card rounded-none bg-rete my-theme:font-bold"></div>

            <NewCard className={''}>
             
              <NewCard.Image className={'bg-red relative'} />
              {/*<NewCard.Body>
                Card Body
              </NewCard.Body>
              <NewCard.Footer>
                Card Footer
          </NewCard.Footer>*/}
            </NewCard>
            
          </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary' rounded={'rounded-full'} size={'xs'} icon={<FunnelIcon className={'icon'} />}>
                XS Primary
                </Tag>
                <Tag className='secondary' rounded={'rounded-full'} size={'sm'} icon={<AdjustmentsHorizontalIcon className={'icon'} />}>
                SM Secondary
                </Tag>
                <Tag className='tertiary' rounded={'rounded-full'} size={'md'} icon={<AdjustmentsVerticalIcon className={'icon'} />}>
                MD Tertiary
                </Tag>
                <Tag className='default' rounded={'rounded-full'} size={'lg'} icon={<ChevronUpDownIcon className={'icon'} />}>
                LG
                </Tag>
                <Tag className='success' rounded={'rounded-full'} size={'xl'} icon={<FunnelIcon className={'icon h-5 w-5'} />}>
                XL
                </Tag>
                <Tag className='danger' rounded={'rounded-full'} icon={<BarsArrowUpIcon className={'icon h-5 w-5'} />}>
                    MD
                </Tag>
                <Tag className='warning border-1.5 border-green-500' rounded={'rounded-full'} icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='info' rounded={'rounded-full'} icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>

            </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary' rounded={'rounded-full'} size={'xs'} closable icon={<FunnelIcon className={'icon'} />}>
                    XS Primary
                </Tag>
                   
                <Tag className='secondary' rounded={'rounded-full'} size={'sm'} closable icon={<AdjustmentsHorizontalIcon className={'icon'} />}>
                  SM Secondary
                </Tag>
                <Tag className='tertiary' rounded={'rounded-full'} size={'md'} closable icon={<AdjustmentsVerticalIcon className={'icon'} />}>
                  MD Tertiary
                </Tag>
                <Tag className='default' rounded={'rounded-full'} size={'lg'} closable icon={<ChevronUpDownIcon className={'icon'} />}>
                   LG
                </Tag>
            
                <Tag className='success' rounded={'rounded-full'} size={'xl'} closable icon={<BarsArrowDownIcon className={'icon'} />}>
                  XL
                </Tag>
                <Tag className='danger' rounded={'rounded-full'} closable icon={<BarsArrowUpIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='warning' rounded={'rounded-full'} closable icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='info' rounded={'rounded-full'} closable icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>

            </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary' rounded={true} size={'xs'} closable icon={<FunnelIcon className={'icon'} />} />
                   
                <Tag className='secondary' rounded size={'sm'} closable icon={<AdjustmentsHorizontalIcon className={'icon'} />}>
                  Sort by: Date (High to Low)
                </Tag>
                <Tag className='tertiary' rounded size={'md'} closable icon={<AdjustmentsVerticalIcon className={'icon'} />}>
                  
                </Tag>
                <Tag className='default' rounded size={'lg'} closable icon={<ChevronUpDownIcon className={'icon'} />}>
                Sort by: Date (High to Low)
                </Tag>
            
                <Tag className='success' rounded size={'xl'} closable icon={<BarsArrowDownIcon className={'icon'} />}>
                  
                </Tag>
                <Tag className='danger' rounded icon={<BarsArrowUpIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='warning' rounded icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='info' rounded icon={<FunnelIcon className={'icon'} />} />

            </div>


            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary' rounded={'rounded-full'} variant='outlined' size={'xs'} closable>
                    XS
                </Tag>
                <Tag className='secondary' rounded={'rounded-full'} variant='outlined' size={'sm'} closable>
                    SM
                </Tag>
                <Tag className='tertiary' rounded={'rounded-full'} variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='default' rounded={'rounded-full'} variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='success' rounded={'rounded-full'} variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='danger' rounded={'rounded-full'} variant='outlined'  icon={<FunnelIcon className={'icon'} />}>
                    MD
                </Tag>
                <Tag className='warning' rounded={'rounded-full'} variant='outlined'  icon={<FunnelIcon className={'icon'} />}>
                MD
                </Tag>
                <Tag className='info' rounded={'rounded-full'} variant='outlined'>
                    MD
                </Tag>

            </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary-light' size={'xs'} rounded closable>
                    XS
                </Tag>
                <Tag className='secondary-light' size={'sm'} rounded closable>
                    SM
                </Tag>
                <Tag className='tertiary-light' rounded closable>
                    MD
                </Tag>
                <Tag className='default-light' rounded closable>
                    MD
                </Tag>
            
                <Tag className='success-light' rounded closable>
                    MD
                </Tag>
                <Tag className='danger-light' rounded>
                    MD
                </Tag>
                <Tag className='warning-light' rounded>
                MD
                </Tag>
                <Tag className='info-light' rounded>
                    MD
                </Tag>
            </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='primary-light' rounded variant='outlined' size={'xs'} closable icon={<FunnelIcon className={'icon'} />}>
                    XS
                </Tag>
                <Tag className='secondary-light' rounded variant='outlined' size={'sm'} closable icon={<FunnelIcon className={'icon'} />}>
                    SM
                </Tag>
                <Tag className='tertiary-light' rounded variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='default-light' rounded variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='success-light' rounded variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='danger-light' rounded variant='outlined' closable>
                    MD
                </Tag>
                <Tag className='warning-light' rounded variant='outlined' closable>
                MD
                </Tag>
                <Tag className='info-light' rounded variant='outlined' closable>
                    MD
                </Tag>

                </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='tot' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s1' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s2' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s3' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s4' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s5' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s6' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s7' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s8' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s9' rounded size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s10' rounded size={'md'} closable>
                    MD
                </Tag>

            </div>

            <div className="flex flex-wrap items-center gap-4 py-4">

                <Tag className='tot' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s1' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s2' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s3' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s4' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s5' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s6' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s7' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s8' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s9' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>
                <Tag className='tot-s10' rounded variant='outlined' size={'md'} closable>
                    MD
                </Tag>

            </div>

        </div>
        <div className="flex mt-20 gap-4 py-8 w-96">
            <Tag className='primary' rounded size={'md'} fill closable icon={<FunnelIcon className={'icon'} />}>
                FILL PARENT
            </Tag>
        </div>

        { /*    
        <input type="datetime-local" id="meeting-time" step='2'
            name="meeting-time" value="2018-06-12T19:00"
            min="2018-06-07T00:00" max="2018-06-14T00:00">
        </input>
  
        <input type="color"></input>
        <progress id="file" max="100" value="70"> 70% </progress>
        */}

    <div className="mt-20 py-10">
        <div className="flex">

        <span className="isolate inline-flex rounded-md shadow-sm">
            <button
                type="button"
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                Years
            </button>
            <button
                type="button"
                className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                Months
            </button>
            <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                Days
            </button>
        </span>

        </div>
        <div className="flex">
        <span className="isolate inline-flex rounded-md shadow-sm">
            <button
                type="button"
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            </span>
            </div>
        </div>


        <div className="mt-20 py-10">
        <div className="grid grid-cols-2 gap-6">
        <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activity.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                {activityItem.type === 'comment' ? (
                  <>
                    <div className="relative">
                      <img
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        src={activityItem.imageUrl}
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Commented {activityItem.date}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activityItem.comment}</p>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'assignment' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={activityItem.person.href} className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </a>{' '}
                        assigned{' '}
                        <a href={activityItem.assigned.href} className="font-medium text-gray-900">
                          {activityItem.assigned.name}
                        </a>{' '}
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === 'tags' ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <TagIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>{' '}
                          added tags
                        </span>{' '}
                        <span className="mr-0.5">
                          {activityItem.tags.map((tag) => (
                            <Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                              >
                                <span className="absolute flex flex-shrink-0 items-center justify-center">
                                  <span
                                    className={cn(tag.color, 'h-1.5 w-1.5 rounded-full')}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="ml-3.5 font-medium text-gray-900">{tag.name}</span>
                              </a>{' '}
                            </Fragment>
                          ))}
                        </span>
                        <span className="whitespace-nowrap">{activityItem.date}</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>



    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {positions.map((position) => (
          <li key={position.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="truncate font-medium text-indigo-600">{position.title}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">in {position.department}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>
                          Closing on <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex -space-x-1 overflow-hidden">
                      {position.applicants.map((applicant) => (
                        <img
                          key={applicant.email}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={applicant.imageUrl}
                          alt={applicant.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <a
          href="#"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          View all
        </a>
      </div>
    </div>


    </div>

        </div>




        <div className="bg-indigo-700">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          The world's most innovative companies use our app
        </h2>
        <div className="mt-8 flow-root lg:mt-10">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img className="h-12" src="https://tailwindui.com/img/logos/tuple-logo-indigo-300.svg" alt="Tuple" />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img className="h-12" src="https://tailwindui.com/img/logos/mirage-logo-indigo-300.svg" alt="Mirage" />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/statickit-logo-indigo-300.svg"
                alt="StaticKit"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/transistor-logo-indigo-300.svg"
                alt="Transistor"
              />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img
                className="h-12"
                src="https://tailwindui.com/img/logos/workcation-logo-indigo-300.svg"
                alt="Workcation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>





    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Used by the world's most average companies
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a
              scelerisque amet ullamcorper eu enim et fermentum, augue.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
                >
                  Create Account
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img
                className="max-h-12"
                src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                alt="Workcation"
              />
            </div>
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img className="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
            </div>
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img className="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
            </div>
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img
                className="max-h-12"
                src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg"
                alt="Laravel"
              />
            </div>
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img
                className="max-h-12"
                src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                alt="StaticKit"
              />
            </div>
            <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
              <img
                className="max-h-12"
                src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg"
                alt="Statamic"
              />
            </div>
          </div>
        </div>
      </div>
    </div>



        <div className="mt-20">
            <Calendar />
        </div>

        {/*true && isMounted ?
            <div className="w-full max-w-screen-xl mx-auto mt-20">
                <Table />
            </div> : 'LOADING TABLE'
        */}
        
      

        <div className="mt-20 flex">
            <LogIn />
            <SignIn />
        </div>

      <div className="mt-20">
            <Profile />
        </div>
  


        <div className="bg-white mt-12 shadow rounded-lg">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-10 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={cn(
                      reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                      'flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={cn(
                          count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                            style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other customers
            </p>

            <a
              href="#"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </a>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.featured.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={cn(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
  
                </div>
  
              </div>
            </section>
          </main>
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-12 lg:px-28 mb-12">
    <div className="">
      <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-color">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-color-accent-1">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-color-accent-2">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-color-accent-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      </div>
    </div>
  
    <div className="site-background-accent-3">
      <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-slate-700">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-600">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-slate-600">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-slate-600/80">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      </div>
    </div>
  
    <div className="site-background-accent-3">
      <div className="p-6">
      <h1 className="text-3xl font-bold mb-3 text-color text-slate-700/90">Lorem ipsum.</h1>
      <h2 className="text-2xl font-semibold mb-3 max-w-screen-lg text-slate-600/90">Dolor sit amet.</h2>
      <h3 className="text-xl mb-4 max-w-screen-lg text-slate-600/90">Consectetur adipiscing.</h3>
      <p className="max-w-screen-lg text-slate-600/70">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      </div>
    </div>
  
    <div className="site-background-accent-4">
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
  
  
  
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-12 lg:px-28 mb-12">
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
  
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-12 lg:px-28 mb-12">
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
  
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-12 lg:px-28 mb-12">
  
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

  export default HomeView