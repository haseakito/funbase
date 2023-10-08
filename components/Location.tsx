'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Location() {

    // Hooks handling getting the current url path name
    const path = usePathname()

    // Array value storing the nested url routes
    const currentLocation = path.split('/').filter(value => value !== '')

  return (
    <ol className='pl-8 inline-flex items-center space-x-1 md:space-x-3'>
        <li className='inline-flex items-center hover:underline'>
            <Link href="/" className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
            </Link>
        </li>
        {
            currentLocation.map((value, key) => (
                <Link
                    key={key}
                    href={`/${value}`}
                    className='flex items-center hover:underline'
                >
                    <svg className='w-3 h-3 mx-1 text-gray-400' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    { value }
                </Link>
            ))
        }        
    </ol>
  )
}
