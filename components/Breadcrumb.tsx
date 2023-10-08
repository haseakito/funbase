'use client'

import React, {
    useState,        
} from 'react'
import qs from 'query-string'
import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation'
import {
    MdSearch,
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
import { useSession, signOut } from 'next-auth/react'
import { MobileSidebar } from './MobileSidebar'
import { HeaderData } from '@/utils/Constant'
import { Popup } from './Popup'

export function Breadcrumb() {

    // String state handling storing the search input
    const [search, setSearch] = useState('')

    // Boolean state handling the modal
    const [modalOpen, setModalOpen] = useState(false)

    // Hooks handling the theme
    const { colorMode, toggleColorMode } = useColorMode()

    // Hooks handling the user session
    const { data: session, status } = useSession()

    // Hooks handling getting the current url path name
    const path = usePathname()

    // Hooks handling the router
    const router = useRouter()

    // Hooks handling getting the current url's query string
    const searchParams = useSearchParams()

    // CategoryId query
    const currentCategoryId = searchParams.get('categoryId')
    // Title query
    const currentTitle = searchParams.get('title')

    const bodyContent = (
        <div>
            <InputGroup>
                <Input
                    defaultValue={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size='lg'
                    placeholder='Search the Funbase'
                />
                <InputRightElement>
                    <Tooltip label='Search' size='lg'>
                        <span><FaSearch /></span>
                    </Tooltip>
                </InputRightElement>
            </InputGroup>
        </div>
    )

    // Funtion handling getting a new url based on search string
    const onSearch = () => {
        const url = qs.stringifyUrl({
            url: path,
            query: {
                categoryId: currentCategoryId,
                title: search
            }
        }, {
            skipNull: true,
            skipEmptyString: true
        })

        router.push(url)
    }

    return (
        <nav className='fixed inset-y-0 h-[80px] w-full z-50 flex justify-between px-5 py-3 shadow-sm border border-gray-200 rounded-lg'>
            <MobileSidebar />
            <div className='hidden lg:flex items-center'>
                { HeaderData.map((value, key) => (
                    <Link
                        key={ key }
                        href={ value.link }
                        className={
                            `${ value.link === path ?
                                'font-bold rounded-md p-3'
                                :
                                ''
                            } h-12 text-sm group relative flex rounded-md p-3 duration-300`
                        }                        
                    >
                        { value.title }
                        <svg aria-hidden="true" className="" height="7" viewBox="0 0 6 6" width="7">
                            <path d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z" fill="var(--accents-3)"></path>
                        </svg>
                        <span className='h-1 absolute -bottom-0 left-1/2 w-0 bg-black transition-all duration-500 group-hover:w-1/3'></span>
                        <span className='h-1 absolute -bottom-0 right-1/2 w-0 bg-black transition-all duration-500 group-hover:w-1/3'></span>
                    </Link> 
                ))}
            </div>            
            <InputGroup className='mx-10 lg:mx-40 hidden lg:block'>
                    <Input       
                        defaultValue={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search Funbase...'
                        size='md'
                    />
                    <InputRightElement>
                        <Button
                            onClick={onSearch}
                        >
                            <span><FaSearch /></span>
                        </Button>                    
                    </InputRightElement>                
            </InputGroup>            
            <div className='flex gap-5'>
                <div className='lg:hidden'>
                    <Button
                        mt={1}                    
                        onClick={() => setModalOpen(!modalOpen)}
                    >
                        <MdSearch />
                    </Button>
                </div>
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
                {/* Account avater. If user is logged in, then show their profile image and action bars*/}
                {
                    session?.user?.name ?                   
                    <Menu>
                        <MenuButton>
                            <Avatar name={session.user.name} src={ session.user?.image ? session.user.image : undefined }>
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
                                <Button
                                    onClick={() => signOut({ redirect: false }).then(() => router.push('/'))}
                                    className='w-full flex gap-5 font-semibold rounded hover:bg-gray-100 p-2 duration-150'                                    
                                >
                                    <MdLogout size={20} /> Logout                                
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    :
                    <Button
                        onClick={() => router.push('/auth/login')}
                        variant='outline'
                        colorScheme='pink'
                    >
                        Login
                    </Button>
                }
            </div>
            <Popup
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                bodyContent={bodyContent}
                action={() => onSearch()}
                actionLabel='Search'
            />
        </nav>
    )
}
