import {
    MdDashboard,
    MdGridOn,
} from 'react-icons/md'
import {
    FaHeart,
    FaUser,
    FaShoppingBag,
} from 'react-icons/fa'


export const HeaderData = [
    {
        title: 'Creators',
        link: '/users'
    },
    {
        title: 'Posts',
        link: '/posts'
    },
    {
        title: 'Blogs',
        link: '/blogs'
    }      
]

export const SidebarData = [
    {
        title: 'Profile',
        icon: <MdDashboard size={30} />,
        link: '/profile'
    },
    {
        title: 'Likes',
        icon: <FaHeart size={30} />,
        link: '/profile/likes'
    },
    {
        title: 'Posts',
        icon: <MdGridOn size={30} />,
        link: '/profile/posts'
    },
    {
        title: 'Fans',
        icon: <FaUser size={30} />,
        link: '/profile/follows'
    },
    {
        title: 'Purchases',
        icon: <FaShoppingBag size={30} />,
        link: '/profile/purchases'
    }
]

