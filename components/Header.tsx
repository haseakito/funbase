'use client'

import React, { useEffect } from 'react'
import Logo from '@/public/Funbase.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
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
    Button
} from './Chakra'
import { HeaderData, SidebarData } from '@/utils/Constant'

export function Header() {

    // Hooks handling getting the current url path name
    const path = usePathname()

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling the user session
    const { data: session, status } = useSession()

    // 
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Function handling logging user out
    const onLogout = async () => {
        // Close the drawer
        onClose()

        await signOut()
    }

    // Function handling redirecting the user to login page
    const onLogin = () => {
        // Close the drawer
        onClose()

        router.push('/auth/login')
    }

    console.log(session)

  return (
    <header>
        <nav className='flex justify-between bg-yellow-300 rounded-full px-10 md:mx-16 mt-5'>
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
                    session ?
                        <Button
                            onClick={() => signOut()}
                            className='flex relative group font-semibold gap-1 h-12 rounded-md p-3 hover:scale-95 duration-300'
                        >
                            Log out <MdLogout size={25} />
                            <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                            <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                        </Button>
                        :
                        <Link
                            href='/auth/login'
                            className={
                                `${ '/auth/login' === path ?
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
                onClick={ onOpen }
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
                {
                    session ?
                    <DrawerBody className='space-y-5'>                    
                        { SidebarData.map((value, key) => (
                            <Link
                                key={ key }
                                href={ value.link }
                                onClick={ onClose }
                                className='relative group grid grid-cols-1 text-center font-semibold rounded hover:bg-gray-200 px-4 py-5'
                            >
                                { value.title }
                                <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                                <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black dark:bg-white transition-all duration-500 group-hover:w-1/3'></span>
                            </Link>
                        ))}
                    </DrawerBody>
                    :
                    <DrawerBody>
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
                    </DrawerBody>
                }
                <DrawerFooter>
                {
                    session ?
                    <Button
                        onClick={() => onLogout()}
                        colorScheme='red'
                        variant='outline'
                        className='w-full p-4 rounded font-semibold hover:opacity-90 duration-300'
                    >
                        Logout
                    </Button>                     
                    :
                    <Button
                        onClick={() => onLogin()}
                        colorScheme='blue'
                        variant='outline'
                        className='w-full p-4 rounded font-semibold hover:opacity-90 duration-300'
                    >
                        Login
                    </Button>
                }
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </header>
  )
}
