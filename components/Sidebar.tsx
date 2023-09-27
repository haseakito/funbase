'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarData } from '@/utils/Constant'


export default function Sidebar() {

    const pathname = usePathname()

  return (
    <aside className='fixed left-0 z-auto w-24 lg:w-64 h-screen transition-transform -translate-x-full md:translate-x-0'>
        <div className='h-full px-3 py-10 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
            <ul className='space-y-2 font-medium'>
                {
                    SidebarData.map((value, key) => (
                        <li key={ key }>
                            <Link
                                href={ value.link }
                                className={
                                    `${
                                        pathname === value.link ?
                                        'bg-gray-100 dark:bg-gray-700'
                                        :
                                        'hover:bg-gray-100 dark:hover:bg-gray-700'
                                    } flex items-center gap-4 p-5 text-gray-900 rounded-lg dark:text-white  group`
                                }
                            >                                
                                { value.icon}                        
                                <div className='hidden lg:block'>{ value.title }</div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    </aside>
  )
}
