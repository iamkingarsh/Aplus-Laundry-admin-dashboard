"use client"

import * as React from "react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Badge, CheckIcon, Minus, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"
import { Switch } from "../ui/switch"
import { Select, SelectTrigger } from "../ui/select"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ScrollArea } from "../ui/scroll-area"
import { set } from "date-fns"
import { fetchData, postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import Heading from "../ui/heading"
import { BrandName } from "@/lib/constants"
import useRazorpay from "react-razorpay"



interface NewSubscriptionFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    service: z.string().min(3, { message: "Service name must be at least 3 characters long" }),
    customer_id: z.string().min(3, { message: "Customer ID must be at least 3 characters long" }),
    kids_qty: z.string(),
    adults_qty: z.string().min(1, { message: "Adults Quantity must be at least 1" }),
    period: z.enum(["per month", "per 3 months", "per 6 months", "per 9 months", "per year"]),
    // name: z.string().min(3, { message: "Item name must be at least 3 characters long" }),
    // amount: z.string().min(1, { message: "Item amount must be at least 1" }),





})



export function NewSubscriptionForm({ className, gap, ...props }: NewSubscriptionFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [services, setServices] = React.useState([]) as any[]
    const [customers, setCustomers] = React.useState([]) as any[]
    const [plans, setPlans] = React.useState([]) as any[]
    const [plan, setPlan] = React.useState([]) as any[]
    const [name, setName] = React.useState([]) as any[]
    const [amount, setAmount] = React.useState(0) as any[]

    const period = [{ title: "per month" }, { title: "per 3 months" }, { title: "per 6 months" }, { title: "per 9 months" }, { title: "per year" }]

    const getServices = async () => {
        setIsLoading(true)
        try {
            const response = await fetchData('/service/allwithitems')
            console.log('response', response)
            const filteredServices = response.services.filter((service: any) => service.isSubscriptionService === true).map((service: any) => { return service })
            console.log('filteredServices', filteredServices)
            setServices(filteredServices)
            setIsLoading(false)
        } catch (error) {
            console.log('error', error)
        }
    }

    const getCustomers = async () => {
        setIsLoading(true)
        try {
            const response = await fetchData('/auth/getallcustomers')
            console.log('response fdhdfh', response)
            setCustomers(response)
            setIsLoading(false)
        } catch (error) {
            console.log('error sdvsd', error)
        }
    }

    const getPlans = async () => {
        setIsLoading(true)
        try {
            const response = await fetchData('/planPricing/getall')
            console.log('response', response.data)
            setPlans(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log('error', error)
        }
    }



    React.useEffect(() => {
        getServices()
        getCustomers()
        getPlans()
    }, [])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            service: "",
            // period: "per month",
            kids_qty: "0",



        },

    })
    const [Razorpay] = useRazorpay();


    const fetchPlans = async (service: any, period: any) => {


        const filteredPlans = plans.filter((plan: { service: { _id: any }; periodPlan: any }) => {
            return plan.service._id === service && plan.periodPlan === period;
        });
        setPlan(filteredPlans[0])
        // form.setValue("name", filteredPlans[0]?.planName || "")
        setName(filteredPlans[0]?.name || "")
        console.log('filteredplan', filteredPlans);
    };

    React.useEffect(() => {
        fetchPlans(form.watch("service"), form.watch("period"))
        const setTotalAmount = () => {
            const above12Price = plan?.above12?.amount || 0;
            const below12Price = plan?.below12?.amount || 0;

            const adult_qty = form.watch("adults_qty") || 0 as any;
            const kids_qty = form.watch("kids_qty") || 0 as any;

            const totalAbove12Amount = above12Price * adult_qty;
            const totalBelow12Amount = below12Price * kids_qty;

            const totalAmount = totalAbove12Amount + totalBelow12Amount || 0 as any;
            console.log("amount", totalAmount);
            setAmount(parseInt(totalAmount))
            console.log('totalAmount sfbdfb', parseInt(totalAmount))
        }
        setTotalAmount()

    }, [form.watch("service"), form.watch("period") || 0, form.watch("adults_qty") || 0, form.watch("kids_qty") || 0]);




    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form values:', values);

        setIsLoading(true);

        if (plan) {


            const data = {
                period: "monthly",
                interval: values.period === "per month" ? 1 : values.period === "per 3 months" ? 3 : values.period === "per 6 months" ? 6 : values.period === "per 9 months" ? 9 : 12,
                item: {
                    name: name || "",
                    amount: amount * 100,

                },
                kids_qty: values.kids_qty,
                adult_qty: values.adults_qty,
                service_id: plan.service._id,
                user_id: values.customer_id,
            };

            try {
                const response1 = await postData('/razorpaySubscription/createNewPlan', data);
                console.log('response1', response1);
                const responseData = {
                    plan_id: response1?.plan?.id,
                    total_count: 12,
                    quantity: 1,
                    notes: response1?.plan.notes
                };

                const response2 = await postData('/razorpaySubscription/createSubscriptionCheckout', responseData);

                console.log('response2', response2);
                const data2 = {
                    plan_id: response1.id,
                    quantity: 1,
                    total_count: 1,

                }
                // const response = await postData('/razorpaySubscription/createSubscriptionCheckout', data) as any

                // console.log(response, 'teesr')
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                    amount: response2?.data?.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: BrandName,
                    description: "Test Transaction",
                    image: "https://example.com/your_logo",
                    subscription_id: response2?.data?.id,
                    redirect: true,
                    recurring: true,
                    handler: function (response: any) {
                        // console.log('rajooor pay', response);
                        const reply = postData('/order/save', response)
                        // console.log(reply)
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                        // instance.payments.fetch(paymentId)
                    },
                    // prefill: {
                    //     name: CustomerData?.fullName,
                    //     email: CustomerData?.email,
                    //     contact: CustomerData?.mobileNumber,
                    // },
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
                rzp1?.open()

                console.log('API Response:', response2);

                setIsLoading(false);
                toast.success('Plan Pricing created successfully');
                // Optionally, you can redirect the user or perform other actions upon successful submission.
                // router.push('/services');
            } catch (error) {
                console.error('Error creating Item:', error);
                setIsLoading(false);
                toast.error('Error creating Item');
            }
        }
    }


    // React.useEffect(() => {
    //     const customer_name = customers.find((data: any) => data._id === form.watch("customer_id"))?.fullName
    //     form.setValue("item.name", customer_name && customer_name.charAt(0).toUpperCase() + customer_name.slice(1) + `'s Plan` || "")
    // }, [form.watch("customer_id")])




    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-1 gap-3`}>
                        <div className={`grid grid-cols-${gap} gap-3`}>
                            <FormField
                                name="customer_id"
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
                                                            ? customers.find(
                                                                (data: any) => data._id === field.value
                                                            ).email
                                                            : "Select a Customer"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command >
                                                    <CommandInput
                                                        placeholder="Search Customers..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No Customers Found </CommandEmpty>
                                                    <CommandGroup>
                                                        {customers.map((data: any) => (
                                                            <CommandItem
                                                                value={data._id}
                                                                key={data._id}

                                                                onSelect={() => {
                                                                    form.setValue("customer_id", data._id)

                                                                }
                                                                }
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
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Plan Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                disabled={true}
                                                placeholder="eg. Basic Plan"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                name="service"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Select a Service</FormLabel>
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
                                                            ? services.find(
                                                                (data: any) => data._id === field.value
                                                            ).serviceTitle
                                                            : "Select a Service"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command >
                                                    <CommandInput
                                                        placeholder="Search Services..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No Services Found </CommandEmpty>
                                                    <CommandGroup>
                                                        {services.map((data: any) => (
                                                            <CommandItem
                                                                value={data.serviceTitle}
                                                                key={data.serviceTitle}

                                                                onSelect={() => {
                                                                    form.setValue("service", data._id)

                                                                }
                                                                }
                                                            >
                                                                {data.serviceTitle}
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="period"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Select a Period</FormLabel>
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
                                                            ? period.find(
                                                                (data: any) => data.title === field.value
                                                            )?.title
                                                            : "Select a Period"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command >
                                                    <CommandInput
                                                        placeholder="Search Period..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No Periods Found </CommandEmpty>
                                                    <CommandGroup>
                                                        {period.map((data: any) => (
                                                            <CommandItem
                                                                value={data.title}
                                                                key={data.title}
                                                                onSelect={() => {
                                                                    console.log("mujahednallaservice", form.watch("service"))
                                                                    form.setValue("period", data.title)
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="kids_qty"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Kids Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. 2"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="adults_qty"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Adults Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. 2"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <Button type="submit" className="w-fit" disabled={isLoading} >
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </Button>



                    </div>


                </form>
            </Form>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <Heading className='leading-tight' title='Available Plans' />
                        <div className="flex gap-2 items-center">
                            {/* <Badge className='text-sm'>Total Plans: </Badge> */}
                        </div>
                        {amount && <div className='text-sm'>Total Amount: {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0
                        }).format(amount)} / {form.watch("period") === "per month" ? "Month" : form.watch("period") === "per 3 months" ? "3 Months" : form.watch("period") === "per 6 months" ? "6 months" : form.watch("period") === "per 9 months" ? "9 Months" : "Year"}</div>}


                    </div>
                </CardHeader>
            </Card>




        </div >
    )
}