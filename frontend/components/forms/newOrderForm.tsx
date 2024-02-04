"use client"

import * as React from "react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Mail, MapPin, Phone, Plus, ServerIcon, Trash, User } from "lucide-react"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { BrandName, LaundrtProducts, OrdersStatuses, Services } from "@/lib/constants"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { useGlobalModal } from "@/hooks/GlobalModal"
import { NewCustomerForm } from "./newCustomerForm"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ScrollArea } from "../ui/scroll-area"
import Heading from "../ui/heading"
import { Separator } from "../ui/separator"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Checkbox } from "../ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { fetchData, postData } from "@/axiosUtility/api"
import useRazorpay from "react-razorpay";
import axios from "axios"

interface NewOrderFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}


const formSchema = z.object({
    order_type: z.string().min(1, { message: "Please select an order type" })
    ,
    serviceId: z.string().min(1, { message: "Please select a service" }),
    products: z.array(z.object({
        id: z.string().min(1, { message: "Please select a product" }),
        quantity: z.number().min(1, { message: "Please select a quantity" }),
    })).min(1, { message: "Please select a product" }),
    customer: z.string().min(1, { message: "Please select a customer" }),
    status: z.string().min(1, { message: "Please select a status" }),
    payment: z.string(),
    delivery_agent: z.string().optional(),
    cartTotal: z.number().optional(),
    cartWeight: z.number().optional(),
    cartWeightBy: z.string().optional(),
})
const priceperkg = 50;

export function NewOrderForm({ className, gap, ...props }: NewOrderFormProps) {
    const [Razorpay] = useRazorpay();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [cartTotal, setCartTotal] = React.useState<number>(0)
    const [selectedItems, setSelectedItems] = React.useState<{ [key: string]: { quantity: number, price: number, } }>({}) as any;
    const [productQuantity, setProductQuantity] = React.useState<number>(1);
    const [weight, setWeight] = React.useState<number>(0);
    const [weightBy, setWeightBy] = React.useState<string>('kg');

    const [AllData, setAllData] = React.useState<any[]>([])
    const [services, setServices] = React.useState<any[]>([])

    const [selectedId, setSelectedId] = React.useState<string | null>(null)
    const [DeliveryAgentsData, setDeliveryAgentsData] = React.useState([])




    const getCustomersData = async () => {
        try {
            const result = await fetchData('/auth/getallcustomers'); // Replace 'your-endpoint' with the actual API endpoint
            setAllData(result)
            const nonSubscribedUsers = result.filter((user: { customerType: string; }) => user.customerType === 'nonsubscriber');
            console.log('sdgaserrhwseth', result)
            const subscribedUsers = result.filter((user: { customerType: string; }) => user.customerType === 'subscriber');

            // setNonSubscribeddata(nonSubscribedUsers);
            // setSubscribeddata(subscribedUsers);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getServicesData = async () => {
        setIsLoading(true)
        try {
            const result = await fetchData('/service/allwithitems'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            if (result && result.services) {
                const products = result.services;
                setServices(products);
                setIsLoading(false)
                console.log('products', products)

                // Now you can work with the 'categories' array
            } else {
                console.error('Response format is not as expected');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getDeliveryAgentsData = async () => {
        try {
            const result = await fetchData('/auth/getalldeliveryagent'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            setDeliveryAgentsData(result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(() => {
        getCustomersData()
        getServicesData()
        getDeliveryAgentsData()
    }, [])

    const GlobalModal = useGlobalModal()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order_type: 'Laundry per pair',
            serviceId: '',
            customer: '',
            status: 'onhold',
            payment: 'Via Store (Cash/Card/UPI)',
            delivery_agent: '',
            cartTotal: 0,
            cartWeight: weight,
            cartWeightBy: 'kg',
        },

    })

    const OpenNewCustomerModal = () => {
        GlobalModal.title = "Create New Customer"
        GlobalModal.description = "Create a new Customer"
        GlobalModal.children = <NewCustomerForm gap={2} />
        GlobalModal.onOpen()
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)
        console.log('valuesvaluesvaluesvalues', values)

        const params = {
            order_type: values.order_type,
            service: values.serviceId,
            products: values.products,
            customer: values.customer,
            status: values.status,
            payment: values.payment,
            delivery_agent: values.delivery_agent,
            cartTotal: values.cartTotal,
            cartWeight: values.cartWeight,
            cartWeightBy: values.cartWeightBy,


        }
        const initialResponse = await postData('/order/addorupdate', params)

        console.log('response', initialResponse)

        const orderid = initialResponse?.order?._id

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: initialResponse?.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: BrandName,
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: initialResponse?.razorpayOrder?.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response: any) {
                console.log('rajooor pay', response);
                const newResponse = { ...response, orderid }
                console.log('newResponse', newResponse)
                const reply = postData('/order/save', newResponse)
                console.log(reply)
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                // instance.payments.fetch(paymentId)
            },
            prefill: {
                name: CustomerData?.fullName,
                email: CustomerData?.email,
                contact: CustomerData?.mobileNumber,
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#2E3190",
                // backdrop_color: "#2E3190"
            },
            modal: {
                ondismiss: function () {
                    alert("dismissed");
                },
                animation: "slide",
            },
            // callback_url: 'https://example.com/your_redirect_url',


        } as any;

        const rzp1 = typeof window !== 'undefined' ? new Razorpay(options) : null as any;
        rzp1.open();


        setTimeout(() => {
            setIsLoading(false)
            toast.success('Order created successfully')
        }, 3000) // remove this timeout and add submit logic

    }







    const AddProductQunatity = (value: string, e: React.MouseEvent<HTMLButtonElement>, price: any) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent checkbox
        setProductQuantity((prev) => prev + 1);
        setSelectedItems((prev: any) => ({
            ...prev, [value]: {
                quantity: (prev[value]?.quantity || 0) + 1,
                price: price || 0,
            }
        }));

    };

    const calculatePriceByWeight = () => {
        //logic to calculate price by weight
        if (weightBy === 'kg') {

            const priceperkg = 50;
            const price = (form.watch("cartWeight") ?? 0) * priceperkg;
            setCartTotal(price);
        } else {
            const priceperkg = 0.05;
            const price = (form.watch("cartWeight") ?? 0) * priceperkg;
            setCartTotal(price);
        }


    }

    const handleSelectChange = (value: string, rate: any) => {
        if (form.watch("order_type") === 'Laundry per pair') {
            //reset the cart to empty if the order type is changed



            if (!selectedItems[value]) {
                setSelectedItems((prev: any) => ({ ...prev, [value]: { quantity: 1, price: rate } }));
                form.setValue("products", [...Object.keys(selectedItems).map((key) => ({ id: key, quantity: selectedItems[key].quantity })) || []]);

            } else if (selectedItems[value]?.quantity === 1) {
                const updatedSelectedItems = { ...selectedItems };
                delete updatedSelectedItems[value];
                setSelectedItems(updatedSelectedItems);
                form.setValue("products", [...Object.keys(selectedItems).map((key) => ({ id: key, quantity: selectedItems[key].quantity })) || []]);

            }
        } else {

            if (!selectedItems[value]) {
                setSelectedItems((prev: any) => ({ ...prev, [value]: { quantity: 1, price: 0 || rate } }));
                form.setValue("products", [...Object.keys(selectedItems).map((key) => ({ id: key, quantity: selectedItems[key].quantity })) || []]);

            } else if (selectedItems[value]?.quantity === 1) {
                const updatedSelectedItems = { ...selectedItems };
                delete updatedSelectedItems[value];
                setSelectedItems(updatedSelectedItems);
                form.setValue("products", [...Object.keys(selectedItems).map((key) => ({ id: key, quantity: selectedItems[key].quantity })) || []]);


            }
        }
    };

    const isOptionSelected = (value: string): boolean => {
        return selectedItems[value] !== undefined;
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Number(e.target.value));
        form.setValue("cartWeight", Number(e.target.value));
    };


    const RemoveProductQunatity = (value: string, rate: any) => {
        if (form.watch("order_type") === 'Laundry per pair') {

            if (selectedItems[value]?.quantity === 1) {
                setProductQuantity(1);
                const updatedSelectedItems = { ...selectedItems };
                delete updatedSelectedItems[value];
                setSelectedItems(updatedSelectedItems);

            } else if (productQuantity > 1) {
                setProductQuantity((prev) => prev - 1);
                setSelectedItems((prev: any) => ({ ...prev, [value]: { quantity: (prev[value]?.quantity || 0) - 1, price: rate || 0 } }));

            } else {
                setProductQuantity(1);

            }

        } else {
            if (selectedItems[value]?.quantity === 1) {
                setProductQuantity(1);
                const updatedSelectedItems = { ...selectedItems };
                delete updatedSelectedItems[value];
                setSelectedItems(updatedSelectedItems);

            } else if (selectedItems[value]?.quantity > 1) {
                setProductQuantity((prev) => prev - 1);
                setSelectedItems((prev: any) => ({ ...prev, [value]: { quantity: (prev[value]?.quantity || 0) - 1, price: 0 || rate } }));

            } else {
                setProductQuantity(1);

            }
        }
    };

    const handleWeightByChange = (value: string) => {
        setWeightBy(value);
        form.setValue("cartWeightBy", value);
        if (value === 'kg') {
            setWeight(weight / 1000);
            form.setValue("cartWeight", weight / 1000);
        }
        else {
            setWeight(weight * 1000);
            form.setValue("cartWeight", weight * 1000);
        }
    };

    React.useEffect(() => {
        if (form.watch("order_type") === 'Laundry per pair') {

            const updateCartTotal = () => {

                let total = 0;
                for (const item in selectedItems) {
                    total += selectedItems[item].quantity * selectedItems[item].price;
                }
                setCartTotal(total);
            };


            updateCartTotal();
        } else {
            console.log("products", form.watch("products"))
            console.log("selectedItems", selectedItems)
            calculatePriceByWeight()
        }
    }, [selectedItems, cartTotal, weight, weightBy, form, calculatePriceByWeight])

    const CustomerData = AllData.find((data) => data._id === form.watch("customer"))

    const serviceId = form.watch("serviceId")

    const LaundryItems = services?.find((service) => service._id === serviceId)?.laundryPerPair?.items.map((value: any) => { return value })

    console.log("LaundryItems", LaundryItems)


    React.useEffect(() => {
        if (form.watch("order_type")) {
            setSelectedItems({});
            setWeight(0);
            setCartTotal(0);
            form.setValue("cartWeight", 0);




        }
    }, [form])




    return (
        <div className={cn("grid gap-6 ", className)} {...props}>
            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        <FormField
                            name="order_type"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullname"> Select Order Type</FormLabel>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Order Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Laundry by kg">Laundry by kg</SelectItem>
                                            <SelectItem value="Laundry per pair">Laundry per pair</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Please select the order type from the dropdown

                                    </FormDescription>
                                    <FormMessage />

                                </FormItem>

                            )}
                        />
                        <FormField
                            name="serviceId"
                            control={form.control}
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel htmlFor="fullname"> Select a Service</FormLabel>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Service" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>

                                            {services.map((service, index) => (
                                                <SelectItem

                                                    key={index} value={service._id}> <div className="flex flex-row items-center"> {service.serviceTitle}</div></SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Please select the order type from the dropdown

                                    </FormDescription>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            name="customer"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Select a Customer</FormLabel>
                                    <Popover>
                                        <PopoverTrigger {...field} defaultValue={field.value} asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? AllData.find(
                                                            (data) => data._id === field.value
                                                        )?.email
                                                        : "Select Customer"}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent side="right" className="w-full p-0">
                                            <Command >
                                                <CommandInput
                                                    placeholder="Search Customers..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>
                                                    <div>
                                                        No Customer found.
                                                    </div>
                                                    <div>
                                                        <Button onClick={OpenNewCustomerModal} variant="ghost" className="mt-2">
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Add Customer
                                                        </Button>
                                                    </div>

                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {AllData.map((data) => (
                                                        <CommandItem
                                                            value={data._id}
                                                            key={data.email}
                                                            onSelect={() => {
                                                                form.setValue("customer", data._id)
                                                            }}
                                                        >
                                                            {data.email}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    data._id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                    <CommandItem onSelect={OpenNewCustomerModal}> <div className="flex flex-row items-center"> <Plus className="h-4 w-4 mr-2" /> Add Customer</div></CommandItem>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Please select a customer from the dropdown
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="status"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Select Status</FormLabel>
                                    <Popover>
                                        <PopoverTrigger {...field} defaultValue={field.value} asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? OrdersStatuses.find(
                                                            (data) => data.title === field.value
                                                        )?.title
                                                        : "Select Order Status"}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command >
                                                <CommandInput
                                                    placeholder="Search Order Status..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No Order Status Found </CommandEmpty>
                                                <CommandGroup>
                                                    {OrdersStatuses.map((data) => (
                                                        <CommandItem
                                                            value={data.title}
                                                            key={data.title}
                                                            onSelect={() => {
                                                                form.setValue("status", data.title)
                                                            }}
                                                        >
                                                            {data.title}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    data.title === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Please select a customer from the dropdown
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="payment"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullname"> Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Payment Method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem disabled value="Via Store (Cash/Card/UPI)">Via Store (Cash/Card/UPI)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            name="delivery_agent"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="delivery_agent"> Delivery Agent</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Delivery Agent" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                DeliveryAgentsData.map((data: any, index) => (
                                                    <SelectItem key={index} value={data._id}>{data.email} {`(${data.fullName})`}</SelectItem>
                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            name="products"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="products"> Select Laundry Items</FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >

                                                Select Laundry Items
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full" onCloseAutoFocus={(e) => e.preventDefault()}>
                                            <DropdownMenuLabel>Select Laundry Items</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline">Open Items Catalogue</Button>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Select Laundry Items</SheetTitle>
                                                        <SheetDescription>
                                                            Please select laundry items from the list
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[85%] my-2  rounded-md ">


                                                        <div className="grid gap-4 py-4">
                                                            {form.watch("order_type") === 'Laundry per pair' && services?.find((service) => service._id === form.watch('serviceId'))?.laundryPerPair?.items.map((value: any, index: number) => {
                                                                return (
                                                                    <DropdownMenuCheckboxItem
                                                                        onSelect={(e) => e.preventDefault()}
                                                                        key={index}
                                                                        checked={isOptionSelected(value._id)}
                                                                        // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}
                                                                        onCheckedChange={() => handleSelectChange(value._id, value.priceperpair)}

                                                                        className="flex gap-2 mx-2 justify-between items-center"
                                                                    >

                                                                        <div>
                                                                            {value.product_name} {form.watch("order_type") === 'Laundry per pair' && `- ₹${value.priceperpair * selectedItems[value._id]?.quantity || value.priceperpair}`}
                                                                        </div>
                                                                        <div className="flex gap-2 items-center justify-end">
                                                                            <Button onClick={() => RemoveProductQunatity(value._id, value.priceperpair)} variant="outline">-</Button>
                                                                            <Input value={selectedItems[value._id]?.quantity || 0} onChange={(e) => { setProductQuantity(Number(e.target.value)); setSelectedItems((prev: any) => ({ ...prev, [value._id]: { quantity: Number(e.target.value), price: value.price } })) }} className="w-10" defaultValue={0} type="text" min={1} max={100} />
                                                                            {/* {selectedItems[value.title]?.quantity || 0} */}
                                                                            <Button onClick={(e) => AddProductQunatity(value._id, e, value.priceperpair)} variant="outline">+</Button>
                                                                        </div>

                                                                    </DropdownMenuCheckboxItem>
                                                                );
                                                            })}
                                                            {form.watch("order_type") !== 'Laundry per pair' &&
                                                                <div>
                                                                    <div className="flex flex-col gap-2 p-2 ">
                                                                        <div className="flex gap-2 items-center">
                                                                            <FormField
                                                                                name="cartWeight"
                                                                                control={form.control}
                                                                                render={({ field }) => (
                                                                                    <FormItem>

                                                                                        <FormLabel htmlFor="weightInput"> Total Calculated Weight</FormLabel>

                                                                                        <Input {...field} id="weightInput" value={field.value} onChange={(e) => { handleWeightChange(e); calculatePriceByWeight() }} placeholder="Enter Total Weight" type="number"

                                                                                            min={1} max={100} />
                                                                                        <Select defaultValue="kg" onValueChange={(value) => handleWeightByChange(value)}>
                                                                                            <FormControl>
                                                                                                <SelectTrigger>
                                                                                                    <SelectValue placeholder="Select Weight" />
                                                                                                </SelectTrigger>
                                                                                            </FormControl>
                                                                                            <SelectContent>
                                                                                                <SelectItem value="kg">kg</SelectItem>
                                                                                                <SelectItem value="grams">grams</SelectItem>
                                                                                            </SelectContent>
                                                                                        </Select>
                                                                                    </FormItem>)}
                                                                            />
                                                                        </div>


                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <Separator className="my-2" orientation="horizontal" />
                                                                        <div>
                                                                            <Heading className=" text-xl" title="Select Items" />
                                                                            {services?.find((service) => service._id === form.watch('serviceId'))?.laundryPerPair?.items.map((value: any, index: number) => {
                                                                                return (
                                                                                    <div className="flex my-2 justify-center flex-col " key={index}>

                                                                                        <div className="flex items-center  gap-2">
                                                                                            <Checkbox
                                                                                                checked={isOptionSelected(value._id)}
                                                                                                onCheckedChange={() => handleSelectChange(value._id, value.priceperpair)}
                                                                                            />
                                                                                            {value.product_name} {form.watch("order_type") === 'Laundry per pair' && `- ₹${value.priceperpair * selectedItems[value.title]?.quantity || value.priceperpair}`}
                                                                                        </div>


                                                                                    </div>

                                                                                );
                                                                            })}
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            }

                                                        </div>
                                                    </ScrollArea>
                                                    <SheetFooter className="flex w-full items-center md:justify-between">
                                                        <span> Cart Total: ₹{cartTotal}</span>
                                                        <SheetClose asChild>
                                                            {/* <Button onClick={() => { form.setValue("products", { ...selectedItems }); console.log(form.setValue("products", selectedItems), { ...selectedItems }) }} type="submit">Save changes</Button> */}

                                                            <Button onClick={() => {

                                                                form.setValue("products", [...Object.keys(selectedItems).map((key) => ({ id: key, quantity: selectedItems[key].quantity })) || []]);
                                                                form.setValue("cartTotal", cartTotal);


                                                            }} type="submit">Save changes</Button>

                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                        <FormField
                            name="cartTotal"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="delivery_agent"> Total Amount to be collected</FormLabel>
                                    <div>
                                        <Heading className='leading-tight' title={`₹${cartTotal}`} />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={`${gap === 2 ? 'w-full' : 'grid gap-3 grid-cols-3'}`} >
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </div>

                </form>
            </Form>
            <Separator orientation="horizontal" />
            <div>
                <div className={`grid grid-cols-${gap === 3 ? '2' : '1'}  gap-2`}>
                    {form.watch("order_type") === 'Laundry per pair' &&
                        Object.keys(selectedItems).length > 0 && <Card className="w-full">
                            <CardHeader>
                                Selected Items for Order
                            </CardHeader>
                            <CardContent>

                                <div className="flex flex-col w-full gap-2">
                                    {/* // <div className="flex flex-row justify-between items-center" key={index}>
                                        //     <div className="flex flex-row items-center gap-2">
                                        //         <div>{key}</div>
                                        //         <div className="flex flex-row items-center gap-2">
                                        //             <Button onClick={() => RemoveProductQunatity(key, selectedItems[key].price)} variant="outline">-</Button>

                                        //             {selectedItems[key].quantity}
                                        //             <Button onClick={(e) => AddProductQunatity(key, e, selectedItems[key].price)} variant="outline">+</Button>
                                        //         </div>
                                        //     </div>
                                        //     <div>₹{selectedItems[key].price * selectedItems[key].quantity}</div>
                                        // </div> */}
                                    <div>
                                        <Table className="w-full">

                                            <TableHeader>
                                                <TableRow>

                                                    <TableHead className="text-left">Item Name</TableHead>
                                                    <TableHead className="text-left">Price</TableHead>
                                                    <TableHead className="text-left">Quantity</TableHead>
                                                    <TableHead className="text-left">Total Amount</TableHead>
                                                    <TableHead className="text-left">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {Object.keys(selectedItems).map((key, index) => (
                                                    <TableRow key={index}>

                                                        <TableCell>{services?.find((service) => service._id === form.watch('serviceId'))?.laundryPerPair?.items.find((value: any) => value._id === key)?.product_name}</TableCell>

                                                        <TableCell className="text-left">₹{selectedItems[key].price}</TableCell>
                                                        <TableCell className="text-left">{selectedItems[key].quantity}</TableCell>
                                                        <TableCell className="text-left">₹{selectedItems[key].price * selectedItems[key].quantity}</TableCell>
                                                        <TableCell className="text-left"><Button onClick={() => RemoveProductQunatity(key, selectedItems[key].price)} variant="outline"><Trash className="h-4 w-4" /></Button></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Separator orientation="horizontal" />
                                        <div className="flex my-2 flex-row justify-between items-center">
                                            <div className="font-semibold">Total Amount</div>
                                            <div className="font-semibold">₹{cartTotal}</div>


                                        </div>
                                    </div>
                                </div>
                            </CardContent>


                        </Card>}
                    {form.watch("order_type") === 'Laundry by kg' &&
                        Object.keys(selectedItems).length > 0 && <Card className="w-full">
                            <CardHeader>
                                Selected Items for Order
                            </CardHeader>
                            <CardContent>

                                <div className="flex flex-col w-full gap-2">
                                    {/* // <div className="flex flex-row justify-between items-center" key={index}>
                                        //     <div className="flex flex-row items-center gap-2">
                                        //         <div>{key}</div>
                                        //         <div className="flex flex-row items-center gap-2">
                                        //             <Button onClick={() => RemoveProductQunatity(key, selectedItems[key].price)} variant="outline">-</Button>

                                        //             {selectedItems[key].quantity}
                                        //             <Button onClick={(e) => AddProductQunatity(key, e, selectedItems[key].price)} variant="outline">+</Button>
                                        //         </div>
                                        //     </div>
                                        //     <div>₹{selectedItems[key].price * selectedItems[key].quantity}</div>
                                        // </div> */}
                                    <div>
                                        <Table className="w-full">

                                            <TableHeader>
                                                <TableRow>

                                                    <TableHead className="text-left">Total Weight</TableHead>
                                                    <TableHead className="text-left">Price per kg</TableHead>
                                                    <TableHead className="text-left">Total</TableHead>
                                                    <TableHead className="text-left">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>

                                                <TableRow >

                                                    <TableCell>{form.watch("cartWeight")} {form.watch("cartWeightBy") === 'kg' ? 'kg' : 'grams'}</TableCell>

                                                    <TableCell className="text-left">₹{priceperkg}</TableCell>
                                                    <TableCell className="text-left">₹{cartTotal}</TableCell>

                                                    <TableCell className="text-left"><Button onClick={() => {
                                                        setSelectedItems({});
                                                        form.setValue("products", selectedItems);
                                                        setCartTotal(0);
                                                        form.setValue("cartTotal", 0);
                                                        setWeight(0);
                                                        form.setValue("cartWeight", 0);
                                                        setWeightBy('kg');
                                                        form.setValue("cartWeightBy", 'kg');
                                                        toast.success('Cart cleared successfully')


                                                    }} variant="outline"><Trash className="h-4 w-4" /></Button></TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                        <Separator orientation="horizontal" />
                                        <Heading className=" text-xl my-2" title="Items in Cart" />
                                        <Table className="w-full">

                                            <TableHeader>
                                                <TableRow>

                                                    <TableHead className="text-left">Item Name</TableHead>

                                                    <TableHead className="text-left">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {Object.keys(selectedItems).map((key, index) => (
                                                    <TableRow key={index}>



                                                        <TableCell className="text-left">{key}</TableCell>


                                                        <TableCell className="text-left"><Button onClick={() => {
                                                            const updatedSelectedItems = { ...selectedItems };
                                                            delete updatedSelectedItems[key];
                                                            setSelectedItems(updatedSelectedItems);
                                                            form.setValue("products", updatedSelectedItems);
                                                            toast.success('Item removed from cart successfully')


                                                        }} variant="ghost">Remove</Button></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <Separator orientation="horizontal" />
                                        <div className="flex my-2 flex-row justify-between items-center">
                                            <div className="font-semibold">Total Amount</div>
                                            <div className="font-semibold">₹{cartTotal}</div>


                                        </div>
                                    </div>
                                </div>
                            </CardContent>


                        </Card>}
                    {form.watch("customer") &&
                        <Card >
                            <CardHeader>
                                <Heading className='text-lg' title='Customer Information' />
                            </CardHeader>
                            <Separator className='mb-2' orientation='horizontal' />
                            <CardContent>



                                <div className="flex flex-col gap-3">
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            <User className='w-6 h-6 mr-3' />
                                            <div className="flex flex-col">
                                                <span className="text-muted-foreground  text-sm">Name</span>
                                                <span className="text-md">{CustomerData?.fullName}</span>
                                            </div>
                                        </div>
                                        <Avatar className='w-8  border-muted border-2 h-8 mr-2'>
                                            <AvatarImage src={CustomerData.profileImg} alt="@shadcn" />
                                            <AvatarFallback>{CustomerData?.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <Separator orientation='horizontal' />

                                    <div className='flex items-center'>
                                        <Mail className='w-6 h-6 mr-3' />
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground  text-sm">Email</span>
                                            <div className='flex gap-2'>

                                                <Link href={`mailto:${CustomerData.email}`} className="text-md">{CustomerData.email}</Link>
                                                {CustomerData.email === true ? <Badge className='ml-2' variant="default" >Verified</Badge> : <Badge className='ml-2' variant="secondary"  >Unverified</Badge>}
                                            </div>
                                        </div>
                                    </div>
                                    <Separator orientation='horizontal' />

                                    <div className='flex items-center'>
                                        <Phone className='w-6 h-6 mr-3' />
                                        <div className="flex flex-col">
                                            <span className=" text-muted-foreground  text-sm">Mobile</span>
                                            <div className='flex gap-2'>

                                                <Link href={`tel:${CustomerData.mobileNumber}`} className="text-md">{CustomerData.mobileNumber}</Link>
                                                {CustomerData.mobileNumber === true ? <Badge className='ml-2' variant="default" >Verified</Badge> : <Badge className='ml-2' variant="secondary"  >Unverified</Badge>}
                                            </div>
                                        </div>
                                    </div>
                                    <Separator orientation='horizontal' />

                                    <div className='flex items-start'>
                                        <MapPin className='w-6 h-6 mr-3' />
                                        <div className='flex flex-col gap-2'>
                                            <div className="flex flex-col">
                                                <span className=" text-muted-foreground  text-sm">Address</span>
                                                <Link href={``} className="text-md">{CustomerData?.address[0]?.location}</Link>

                                            </div>

                                        </div>
                                    </div>
                                </div>



                            </CardContent>

                        </Card>}

                </div>
            </div>




        </div >
    )
}