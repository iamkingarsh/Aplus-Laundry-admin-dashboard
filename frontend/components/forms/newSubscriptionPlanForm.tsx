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
import { CheckIcon, Plus } from "lucide-react"
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



interface NewSubscriptionPlanFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    service: z.string().min(3, { message: "Service name must be at least 3 characters long" }),

    // plan_description: z.string().min(3, { message: "Plan description must be at least 3 characters long" }),
    period: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]),

    interval: z.string().min(1, { message: "Interval must be at least 1" }),
    item: z.object({
        name: z.string().min(3, { message: "Item name must be at least 3 characters long" }),
        amount: z.string().min(1, { message: "Item price must be at least 1" }),
        currency: z.string().min(3, { message: "Item currency must be at least 3 characters long" }),
        description: z.string().min(3, { message: "Item description must be at least 3 characters long" }),
    }),

})



export function NewSubscriptionPlanForm({ className, gap, ...props }: NewSubscriptionPlanFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [services, setServices] = React.useState([]) as any[]

    const period = [{ title: "daily" }, { title: "weekly" }, { title: "monthly" }, { title: "quarterly" }, { title: "yearly" }]


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



    React.useEffect(() => {
        getServices()
    }, [])



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            service: "",
            period: "monthly",
            interval: '1',
            item: {
                name: "",
                amount: '0',
                currency: "INR",
                description: "",
            },

        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form values:', values);

        setIsLoading(true);
        console.log('values', values)
        try {
            const data = {
                period: values.period,
                interval: values.interval,
                item: {
                    name: values.item.name,
                    amount: values.item.amount,
                    currency: values.item.currency,
                    description: values.item.description,
                },
                service_id: values.service

            }
            console.log('datadatadatadatadatadatadatadatadatadatadatadatadata', data)
            const response = await postData('/razorpaySubscription/createNewPlan', data);

            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Item created successfully');
            // Optionally, you can redirect the user or perform other actions upon successful submission.
            router.push('/services');
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
                                        <FormDescription>
                                            Please select a customer from the dropdown
                                        </FormDescription>
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
                                        <FormDescription>
                                            Please select a p from the dropdown
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="item.name"
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
                                        <FormDescription>
                                            This, combined with period, defines the frequency of the plan. If the billing cycle is 2 months, the value should be 2. For daily plans, the minimum value should be 7.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="interval"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="interval">Interval</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. 1"
                                                id="interval"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="item.amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="plan_name">Plan Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="eg. 599"
                                                id="plan_name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                        </div>

                        <FormField
                            name="item.description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="plan_name">Plan Description</FormLabel>
                                    <FormControl>
                                        <Textarea

                                            placeholder="eg. Basic Plan"
                                            id="plan_name"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-fit" disabled={isLoading} >
                            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </Button>



                    </div>


                </form>
            </Form>




        </div >
    )
}