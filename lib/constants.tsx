"use client"
import { BoxIcon, CogIcon, IndianRupeeIcon, LayoutDashboardIcon, ServerIcon, ShoppingBagIcon, TagIcon, UserCog, Users } from "lucide-react"


const sidebarTabs = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Orders',
        path: '/dashboard/orders',
        icon: <ShoppingBagIcon className="w-4 mr-2" />
    },
    {
        title: 'Revenue',
        path: '/dashboard/revenue',
        icon: <IndianRupeeIcon className="w-4 mr-2" />
    },
    {
        title: 'Products',
        path: '/dashboard/products',
        icon: <BoxIcon className="w-4 mr-2" />
    },
    {
        title: 'Services',
        path: '/dashboard/services',
        icon: <ServerIcon className="w-4 mr-2" />
    },
    {
        title: 'Customers',
        path: '/dashboard/customers',
        icon: <Users className="w-4 mr-2" />
    },
    {
        title: 'Delivery Partners',
        path: '/dashboard/delivery-partners',
        icon: <UserCog className="w-4 mr-2" />
    },
    {
        title: 'Coupons',
        path: '/dashboard/coupons',
        icon: <TagIcon className="w-4 mr-2" />
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <CogIcon className="w-4 mr-2" />
    },
]

export default sidebarTabs;