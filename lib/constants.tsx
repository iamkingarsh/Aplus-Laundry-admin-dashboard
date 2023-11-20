import { LayoutDashboardIcon } from "lucide-react"


const sidebarTabs = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Orders',
        path: '/dashboard/orders',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Revenue',
        path: '/dashboard/revenue',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Products',
        path: '/dashboard/products',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Services',
        path: '/dashboard/categories',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Customers',
        path: '/dashboard/customers',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
    {
        title: 'Delivery Partners',
        path: '/dashboard/delivery-partners',
        icon: <LayoutDashboardIcon className="w-4 mr-2" />
    },
]

export default sidebarTabs;