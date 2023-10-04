'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,    
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { HeaderData, SidebarData } from '@/utils/Constant'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Session } from 'next-auth'


type NavigationProps = {
    isOpen: boolean,
    logo: StaticImport,
    onClose: () => void,
    path: string,
    session: Session | null,
    onLogin: () => void,
    onLogout: () => void
}

export function Navigation(props: NavigationProps) {

    const { isOpen, logo, onClose, path, session, onLogin, onLogout } = props

  return (
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
                    src={ logo }
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
  )
}
