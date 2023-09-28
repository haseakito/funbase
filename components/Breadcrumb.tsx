'use client'

import React, {
    useRef,
    useEffect
} from 'react'
import { useRouter } from 'next/navigation'
import {
    MdDarkMode,
    MdSunny,
    MdLogout,
} from 'react-icons/md'
import {
    FaSearch,
    FaBell,
    FaUser,
    FaHeart,
    FaShoppingBag,
} from 'react-icons/fa'
import Link from 'next/link'
import {
    InputGroup,
    InputRightElement,
    Input,
    Tooltip,
    Button,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
    AvatarBadge,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from '@chakra-ui/react'

export function Breadcrumb() {

    // Hooks handling the theme
    const { colorMode, toggleColorMode } = useColorMode()

    // Ref hooks handling button canceling alert modal
    const cancelRef = useRef(null)

    // Hooks handling the router
    const router = useRouter()

    // Side effects handling fetching user profile image and notifications
    useEffect(() => {

    }, [])

    return (
        <div>
            <nav className='flex justify-between px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
                <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                    <li className='inline-flex items-center'>
                        <Link href="/" className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'>
                            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className='flex items-center'>
                            <svg className='w-3 h-3 mx-1 text-gray-400' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </div>
                    </li>
                </ol>
                <InputGroup className='mx-10 lg:mx-40'>
                    <Input       
                        defaultValue=''
                        placeholder='Search Funbase...'
                        size='md'                        
                    />
                    <InputRightElement>
                        <Tooltip label='Search' size='md'>
                            <span><FaSearch /></span>
                        </Tooltip>
                    </InputRightElement>
                </InputGroup>
                <div className='flex gap-5'>
                    {/* Theme */}
                    <Button
                        mt={1}
                        onClick={toggleColorMode}
                    >
                        {colorMode === 'light' ? <MdSunny /> : <MdDarkMode />}
                    </Button>
                    {/* Notification */}
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                mt={1}
                            >
                                <FaBell />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton mt={1} />
                            <PopoverHeader className='font-semibold'>Notifications</PopoverHeader>
                            <PopoverBody>
                                No events found
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    {/* Account avater */}
                    <Menu>
                        <MenuButton>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'>
                                <AvatarBadge boxSize='0.85em' bg='green.500' />
                            </Avatar>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>
                                <Link
                                    href='/profile/'
                                    className='w-full flex gap-5 font-semibold rounded hover:bg-gray-100 p-2 duration-150'
                                >
                                    <FaUser size={20} /> Profile
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    href='/profile/likes'
                                    className='w-full flex gap-5 font-semibold rounded hover:bg-gray-100 p-2 duration-150'
                                >
                                    <FaHeart size={20} /> Likes
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    href='/profile/posts'
                                    className='w-full flex gap-5 font-semibold rounded hover:bg-gray-100 p-2 duration-150'
                                >
                                    <FaShoppingBag size={20} /> Create Post
                                </Link>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem mt={7}>
                                <Link
                                    href='/'
                                    className='w-full flex gap-5 font-semibold rounded hover:bg-gray-100 p-2 duration-150'                                    
                                >
                                    <MdLogout size={20} /> Logout                                
                                </Link>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </nav>            
        </div>
    )
}
