import { FC } from 'react'
import Link from 'next/link'
//import { Container } from './container'

import { HomeIcon } from '@heroicons/react/24/outline'


const pages = [
    { name: 'Projects', href: '#', current: false },
    { name: 'Project Nero', href: '#', current: true },
  ]


interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Breadcrumb: FC<NavbarProps> = ({ links }) => (
  <>
  <div className="max-w-screen-2xl py-3 px-4 sm:px-6 lg:px-8 mx-auto w-full">
<nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500 dark:text-slate-400">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-slate-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className="ml-4 text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
    </div>
  </>
)

export default Breadcrumb