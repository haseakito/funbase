import {
    MdDashboard,
    MdGridOn,
    MdLogin,
    MdLogout,
    MdMenu
} from 'react-icons/md'
import {
    FaHeart,
    FaUser,
    FaBell,
    FaShoppingBag,
} from 'react-icons/fa'


export const HeaderData = [
    {
        title: 'Creator',
        link: '/users'
    },
    {
        title: 'Marketplace',
        link: '/market'
    },        
]

export const SidebarData = [
    {
        title: 'Dashboard',
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
        title: 'Notifications',
        icon: <FaBell size={30} />,
        link: '/profile/notifications'
    },
    {
        title: 'Subscriptions',
        icon: <FaShoppingBag size={30} />,
        link: '/profile/subscriptions'
    }
]

