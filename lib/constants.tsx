"use client"
import { BoxIcon, CogIcon, FrameIcon, GroupIcon, IndianRupeeIcon, LayoutDashboardIcon, ServerIcon, ShoppingBagIcon, TagIcon, UserCog, Users } from "lucide-react"

const BrandName = "APlus Laundry"

const brandColors = {
    pending: 'bg-yellow-500 text-white',
    processing: 'bg-blue-500 text-white',
    delivered: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
    onway: 'bg-purple-500 text-white',
    default: 'bg-primary dark:bg-primary-dark  text-white dark:text-black',

}

const sidebarTabs = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <ShoppingBagIcon className="w-4 mr-2" />
    },
    {
        title: 'Revenue',
        path: '/revenue',
        icon: <IndianRupeeIcon className="w-4 mr-2" />
    },
    {
        title: 'Laundry Items',
        path: '/products',
        icon: <BoxIcon className="w-4 mr-2" />
    },
    {
        title: 'Categories',
        path: '/categories',
        icon: <GroupIcon className="w-4 mr-2" />
    },
    {
        title: 'Services',
        path: '/services',
        icon: <ServerIcon className="w-4 mr-2" />
    },
    {
        title: 'Customers',
        path: '/customers',
        icon: <Users className="w-4 mr-2" />
    },
    {
        title: 'Delivery Partners',
        path: '/delivery-partners',
        icon: <UserCog className="w-4 mr-2" />
    },
    {
        title: 'App Banners',
        path: '/app-banners',
        icon: <FrameIcon className="w-4 mr-2" />
    },
    {
        title: 'Coupons',
        path: '/coupons',
        icon: <TagIcon className="w-4 mr-2" />
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <CogIcon className="w-4 mr-2" />
    },
]


const Services = [
    {
        title: 'Dry Cleaning',
        path: '/services/wash-iron',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Premium Laundry',
        path: '/services/premium-Laundry',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Laundry',
        path: '/services/laundry',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Steam Ironing',
        path: '/services/iron',
        icon: <ServerIcon className="w-3 mr-2" />
    },


]

const OrdersStatuses = [
    {
        title: 'onhold',
    },
    {
        title: 'processing',
    },
    {
        title: 'picked',
    },
    {
        title: 'on way',
    },
    {
        title: 'delivered',
    },
    {
        title: 'cancelled',
    },
]

const LaundrtProducts = [
    {
        title: 'Shirts',
        value: 'shirts',
        path: '/products/shirts',
        price: 20,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'TShirts',
        value: 'tshirts',
        path: '/products/tshirts',
        price: 45,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Trousers',
        value: 'trousers',
        path: '/products/trousers',
        price: 23,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Jeans',
        value: 'jeans',
        path: '/products/jeans',
        price: 78,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Shorts',
        value: 'shorts',
        path: '/products/shorts',
        price: 10,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Kurtas',
        value: 'kurtas',
        path: '/products/kurtas',
        price: 20,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Kurtis',
        value: 'kurtis',
        path: '/products/kurtis',
        price: 20,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Sarees',
        value: 'sarees',
        path: '/products/sarees',
        price: 60,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Bedsheets',
        value: 'bedsheets',
        path: '/products/bedsheets',
        price: 50,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Blankets',
        value: 'blankets',
        path: '/products/blankets',
        price: 15,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Curtains',
        value: 'curtains',
        path: '/products/curtains',
        price: 85,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'CushionCovers',
        value: 'cushioncovers',
        path: '/products/cushion-covers',
        price: 20,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'PillowCovers',
        value: 'pillowcovers',
        price: 20,

        path: '/products/pillow-covers',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Towels',
        value: 'towels',
        path: '/products/towels',
        price: 55,

        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        title: 'Masks',
        value: 'masks',
        path: '/products/masks',
        price: 15,

        icon: <ServerIcon className="w-3 mr-2" />
    },
]

const categories = [
    {
        title: 'Men'
    },
    {
        title: 'Women'
    },
    {
        title: 'Kids'
    },
    {
        title: 'Household'
    },

    {
        title: 'Accessories'

    }
]

export default sidebarTabs;
export { BrandName, Services, OrdersStatuses, LaundrtProducts, brandColors, categories }