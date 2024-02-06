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



interface NewSubscriptionFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    service: z.string().min(3, { message: "Service name must be at least 3 characters long" }),
    customer_id: z.string().min(3, { message: "Customer ID must be at least 3 characters long" }),
    interval: z.string().min(3, { message: "Interval must be at least 3 characters long" }),
    service_id: z.string().min(3, { message: "Service ID must be at least 3 characters long" }),
    kids_qty: z.string().min(1, { message: "Kids Quantity must be at least 1" }),
    adults_qty: z.string().min(1, { message: "Adults Quantity must be at least 1" }),
    period: z.enum(["monthly", "quarterly", "yearly"]),

    plan: z.string().min(3, { message: "Plan name must be at least 3 characters long" }),

    item: z.object({
        name: z.string().min(3, { message: "Item name must be at least 3 characters long" }),
        amount: z.string().min(1, { message: "Item amount must be at least 1" }),
        description: z.string().min(3, { message: "Item description must be at least 3 characters long" }),
    }),


    // planfor: z.enum(["below12", "above12"]),

})



export function NewSubscriptionForm({ className, gap, ...props }: NewSubscriptionFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [services, setServices] = React.useState([]) as any[]
    const [customers, setCustomers] = React.useState([]) as any[]
    const [plans, setPlans] = React.useState([]) as any[]
    const [actualPlan, setActualPlan] = React.useState([]) as any[]
    const period = [{ title: "monthly" }, { title: "quarterly" }, { title: "yearly" }]
    const planfor = [{ title: "below12" }, { title: "above12" }]

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
            console.log('response', response)
            setPlans(response.data)
            setActualPlan(response.data.filter((plan: any) => plan.service._id === form.watch("service") && plan.periodPlan === form.watch("period")).map((plan: any) => plan) || [])
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
            period: "monthly",
            item: {
                name: "",
                amount: "",
                description: "",
            },



        },

    })
    React.useEffect(() => {
        console.log('form service', form.watch("service"))
        console.log('form', form.watch("period"))
        const actualPlans = plans.filter((plan: any) => plan.service._id === form.watch("service_id") && plan.periodPlan === form.watch("period")).map((plan: any) => plan)
        setActualPlan(actualPlans)
        console.log('actualPlans', actualPlan)

    }, [form.watch("service_id"), form.watch("period")])


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form values:', values);

        setIsLoading(true);
        console.log('values', values)
        try {
            const data = {
                // name: values.name,
                // service: values.service,
                // periodPlan: values.period,
                // below12: values.below12,
                // above12: values.above12,
            }

            const response = await postData('/planPricing/add', data);

            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Plan Pricing created successfully');
            // Optionally, you can redirect the user or perform other actions upon successful submission.
            // router.push('/services');
        } catch (error) {
            console.error('Error creating Item:', error);
            console.log('error', error)
            setIsLoading(false);
            toast.error('Error creating Item');
        }
    }




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
                                name="plan"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Select a Plan</FormLabel>
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
                                                            ? plans.find(
                                                                (data: any) => data._id === field.value
                                                            ).name
                                                            : "Select a Plan"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command >
                                                    <CommandInput
                                                        placeholder="Search Plan..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No Plan Found </CommandEmpty>
                                                    <CommandGroup>
                                                        {plans.map((data: any) => (
                                                            <CommandItem
                                                                value={data._id}
                                                                key={data._id}

                                                                onSelect={() => {
                                                                    form.setValue("plan", data._id)

                                                                }
                                                                }
                                                            >
                                                                {data.name}
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
                            /> */}
                            <FormField
                                name="service_id"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Plan Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. Basic Plan"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
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
                            {/* <FormField
                                name="planfor"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <FormLabel>Plan For</FormLabel>
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
                                                            ? planfor.find(
                                                                (data: any) => data.title === field.value
                                                            )?.title === "below12" ? "Below 12" : "Above 12"
                                                            : "Select Plan for Age Group"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command >
                                                    <CommandInput
                                                        placeholder="Search Age Group..."
                                                        className="h-9"
                                                    />
                                                    <CommandEmpty>No Age Group Found </CommandEmpty>
                                                    <CommandGroup>
                                                        {planfor.map((data: any) => (
                                                            <CommandItem
                                                                value={data.title}
                                                                key={data.title}
                                                                onSelect={() => {
                                                                    form.setValue("planfor", data.title)
                                                                }}
                                                            >
                                                                {data.title === "below12" ? "Below 12" : "Above 12"}
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
                            /> */}
                            {/* {form.watch("planfor") === "below12" && <FormField
                                name="below12"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Plan Amount for Below 12</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. 599"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}
                            {form.watch("planfor") === "above12" &&
                                <FormField
                                    name="above12"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="plan_name">Plan Amount for Above 12</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="eg. 599"
                                                    id="plan_name"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />} */}

                            {/* <Button >
                                    <Minus className="w-4 h-4" />
                                </Button> */}
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
                            {/* <Button >
                                    <Plus className="w-4 h-4" />
                                </Button> */}


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
                        {/* <div className="flex gap-2 items-center">
                            <Badge className='text-sm'>Total Plans: </Badge>
                        </div> */}
                        {
                            actualPlan.length > 0 && <Badge className='text-sm'>Total Plans: {actualPlan.length}</Badge>
                        }
                    </div>
                </CardHeader>
            </Card>




        </div >
    )
}