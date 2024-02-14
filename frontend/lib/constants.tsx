"use client"
import { Badge, BadgeIndianRupee, BoxIcon, CogIcon, FrameIcon, GroupIcon, IndianRupeeIcon, LayoutDashboardIcon, ServerIcon, ShoppingBagIcon, TagIcon, UserCog, Users, Users2Icon, UsersIcon } from "lucide-react"
// import { LaundrtProducts as Items } from "@/app/(routes)/products/page"

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
    // {
    //     title: 'Team',
    //     path: '/team',
    //     icon: <UsersIcon className="w-4 mr-2" />
    // },
    {
        title: 'Subscriptions',
        path: '/subscription-plans',
        icon: <BadgeIndianRupee className="w-4 mr-2" />
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <CogIcon className="w-4 mr-2" />
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

const LaundryProducts = [
    {
        product_id: 'lp12359asd',
        product_name: 'Shirts',
        value: 'shirts',
        category: 'Women',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45678adb',
        product_name: 'TShirts',
        value: 'tshirts',
        category: 'Household',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45378asv',
        product_name: 'Trousers',
        value: 'trousers',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp45325sfe',
        product_name: 'Jeans',
        value: 'jeans',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp41478adr',
        product_name: 'Shorts',
        value: 'shorts',
        category: 'Men',
        priceperpair: 50,
        status: 'Active'
    },
    {
        product_id: 'lp4238dar',
        product_name: 'Kurtas',
        value: 'kurtas',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp4381ndr',
        product_name: 'Kurtis',
        value: 'kurtis',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2381nxr',
        product_name: 'Sarees',
        value: 'sarees',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2881xzr',
        product_name: 'Bedsheets',
        value: 'bedsheets',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2801xcr',
        product_name: 'Blankets',
        value: 'blankets',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2841xtr',
        product_name: 'Curtains',
        value: 'curtains',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2081xsr',
        product_name: 'CushionCovers',
        value: 'cushioncovers',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2981xzr',
        product_name: 'PillowCovers',
        value: 'pillowcovers',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2080srx',
        product_name: 'Towels',
        value: 'towels',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },
    {
        product_id: 'lp2880srq',
        product_name: 'Masks',
        value: 'masks',
        priceperpair: 50,
        category: 'Men',
        status: 'Active'
    },


] as any


//@mujahed this is dummy data for services
const Services = [
    {
        service_id: 'AL1469',
        title: 'Dry Cleaning',
        servicestatus: 'Active',
        laundry_items: {
            ...LaundryProducts,
        },
        laundrybykg: 'Active',
        laundrybykgprice: 50,
        laundryperpair: 'Deactive',
        icon: <ServerIcon className="w-3 mr-2" />

    },
    {
        service_id: 'AL1479',
        title: 'Premium Laundry',
        servicestatus: 'Active',
        laundry_items: [

            ...LaundryProducts,
        ]
        ,
        laundrybykg: 'Active',
        laundrybykgprice: 50,
        laundryperpair: 'Active',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        service_id: 'AL1489',
        title: 'Laundry',
        servicestatus: 'Active',
        laundry_items: [

            ...LaundryProducts,
        ]
        ,
        laundrybykg: 'Active',
        laundrybykgprice: 50,
        laundryperpair: 'Active',
        icon: <ServerIcon className="w-3 mr-2" />
    },
    {
        service_id: 'AL1499',
        title: 'Steam Ironing',
        servicestatus: 'Active',
        laundry_items: [
            ...LaundryProducts,
        ]
        ,
        laundrybykg: 'Active',
        laundrybykgprice: 50,
        laundryperpair: 'Active',
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
        title: 'pending',
    },
    {
        title: 'picked',
    },
    {
        title: 'onway',
    },
    {
        title: 'delivered',
    },
    {
        title: 'cancelled',
    },
]


// @mujahed this is dummy data for categories
const categories = [
    {
        category_id: '148652',
        title: 'Men'
    },
    {
        category_id: '456456',
        title: 'Women'
    },
    {
        category_id: '453785',
        title: 'Kids'
    },
    {
        category_id: '456872',
        title: 'Household'
    },
    {
        category_id: '463486',
        title: 'Accessories'

    }
]


export default sidebarTabs;
export { BrandName, Services, OrdersStatuses, LaundrtProducts, brandColors, categories }