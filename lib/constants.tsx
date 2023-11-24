"use client"
import { BoxIcon, CogIcon, IndianRupeeIcon, LayoutDashboardIcon, ServerIcon, ShoppingBagIcon, TagIcon, UserCog, Users } from "lucide-react"

const BrandName = "APlus Laundry"

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
        title: 'Products',
        path: '/products',
        icon: <BoxIcon className="w-4 mr-2" />
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
        title: 'On Way',
    },
    {
        title: 'delivered',
    },
    {
        title: 'cancelled',
    },
]

export default sidebarTabs;
export { BrandName, Services, OrdersStatuses }