'use client'

import { HeaderData, SidebarData } from '@/utils/Constant'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

export function MobileSidebar() {
    
    const [menuOpen, setMenuOpen] = useState(false)

    // Hooks handling the user session
    const { data: session, status } = useSession()

    // Hooks handling getting the current url path name
    const path = usePathname()

    // Hooks handling the router
    const router = useRouter()

    const onLogin = () => {

        router.push('/auth/login')

        setMenuOpen(false)
    }

  return (
    <div>
        <div className='block lg:hidden'>
            <Button
                className='mt-2 hover:shadow-sm rounded focus:ring-2 ring-gray-200 opacity-90 hover:opacity-100'
                onClick={() => setMenuOpen(true)}
            >
                <MdMenu
                    size={35}
                />
            </Button>
        </div>        
        <div className={
            menuOpen ?
            'lg:hidden fixed z-50 inset-0 duration-700 bg-gray-100 px-4 py-5'
            :
            'lg:hidden fixed z-50 inset-0 translate-y-full duration-700 bg-gray-100 px-4 py-5'
        }>
            <div className='flex justify-start p-4'>
                <Button                    
                    className='hover:shadow-sm rounded focus:ring-2 ring-gray-200 opacity-90 hover:opacity-100'
                    onClick={() => setMenuOpen(false)}
                >
                    <MdClose
                        size={ 35 }                        
                    />
                </Button>
            </div>
            <div className='flex justify-center py-4'>
                {
                    session?.user ?
                    <ul>
                        { SidebarData.map((value, key) => (
                            <li
                                key={ key }
                            >
                                <Link
                                    href={ value.link }
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <div
                                        className='text-4xl font-bold py-10 px-20 rounded hover:bg-gray-50 opacity-90 hover:opacity-100 hover:scale-110 duration-300'
                                    >
                                        { value.title }
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    :
                    <ul className='flex flex-col'>
                        { HeaderData.map((value, key) => (
                            <li
                                key={key}
                            >
                                <Link
                                    href={value.link}
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >                                    
                                    <div
                                        className='text-4xl font-bold py-10 px-20 rounded hover:bg-gray-50 opacity-90 hover:opacity-100 hover:scale-110 duration-300'
                                    >
                                        { value.title }
                                    </div>
                                </Link>
                            </li>
                        ))}
                        <li className='absolute bottom-5'>
                            <Button
                                onClick={() => onLogin()}
                                variant='outline'
                                colorScheme='pink'
                                className=' text-4xl font-bold py-10 px-20 rounded hover:bg-gray-50 opacity-90 hover:opacity-100 hover:scale-110 duration-300'
                            >
                                Login
                            </Button>
                        </li>
                    </ul>
                }                
            </div>
        </div>                        
    </div>
  )
}
