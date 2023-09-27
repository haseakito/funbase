'use client'

import React from 'react'
import Logo from '@/public/Funbase.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthContext } from './AuthController'
import {
    MdLogin,
    MdLogout,
    MdMenu
} from 'react-icons/md'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,    
    DrawerCloseButton,
    useDisclosure,    
} from '@chakra-ui/react'
import { HeaderData, SidebarData } from '@/utils/Constant'

export function Header() {

    // Get the current url path name
    const path = usePathname()

    // Hooks handling user auth
    const useAuth = useAuthContext()

    // 
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <header>
        <nav className='flex justify-between bg-yellow-300 rounded-full px-10 md:mx-20 mt-5'>
            {/* Logo */}
            <Image
                src={ Logo }
                alt=''
                className='w-auto h-24'
            />
            {/* Header */}
            <div className='hidden md:flex mt-5 space-x-5'>
                { HeaderData.map((value, key) => (
                    <Link
                        key={ key }
                        href={ value.link }
                        className={
                            `${ value.link === path ?
                                'font-bold bg-blue-500 rounded-md p-3'
                                :
                                'hover:bg-blue-500 font-semibold'
                            } h-12 group relative inline-block rounded-md p-3 hover:scale-95 duration-300`
                        }                        
                    >
                        { value.title }
                        <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                        <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                    </Link> 
                ))}
                {
                    useAuth.token ?                            
                        <Link
                            href='/'
                            className='flex relative group font-semibold gap-1 h-12 rounded-md p-3 hover:scale-95 duration-300'
                        >
                            Log out <MdLogout size={25} />
                            <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                            <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                        </Link>
                        :
                        <Link
                            href='/login'
                            className={
                                `${ '/login' === path ?
                                    'font-bold bg-blue-500'
                                    :
                                    'font-semibold hover:bg-blue-500'
                                } relative group flex gap-1 h-12 rounded-md p-3 hover:scale-95 duration-300`
                            }                    
                        >                    
                                Log In <MdLogin size={25}  />
                                <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                                <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                        </Link>
                }
            </div>
            <button
                onClick={onOpen}
                className='block md:hidden hover:opacity-90'
            >
                <MdMenu size={ 50 }  />
            </button>
        </nav>
        <Drawer
            isOpen={ isOpen }
            placement='right'
            onClose={ onClose }            
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Image
                        src={ Logo }
                        alt=''
                        className='-mt-8 w-auto h-24'
                    />
                </DrawerHeader>
                <DrawerBody className='space-y-5'>
                    { SidebarData.map((value, key) => (
                        <Link
                            key={ key }
                            href={ value.link }
                            className='relative group grid grid-cols-1 text-center font-semibold rounded hover:bg-gray-200 px-4 py-5'
                        >
                            { value.title }
                            <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                            <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                        </Link>
                    ))}
                </DrawerBody>
                <DrawerFooter>
                    <button
                        className={
                            `${
                                useAuth ? 
                                'bg-blue-400' : 'bg-red-400'
                            } w-full p-4 rounded font-semibold hover:opacity-90 duration-300`
                        }
                    >
                        { useAuth.token ? 'Logout' : 'Login' }
                    </button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>     
    </header>
  )
}
