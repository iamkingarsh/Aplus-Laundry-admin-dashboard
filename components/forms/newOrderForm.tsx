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
import { CheckIcon, Plus, ServerIcon } from "lucide-react"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { OrdersStatuses, Services } from "@/lib/constants"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { AllData } from "@/app/(routes)/customers/page"
import { useGlobalModal } from "@/hooks/GlobalModal"
import { NewCustomerForm } from "./newCustomerForm"


interface NewOrderFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    order_type: z.string()
    ,
    service: z.string(),
    products: z.string(),
    customer: z.string(),
    status: z.string(),
    payment: z.string(),
    delivery_agent: z.string(),

})

export function NewOrderForm({ className, gap, ...props }: NewOrderFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const GlobalModal = useGlobalModal()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            order_type: '',
            service: '',
            products: '',
            customer: '',
            status: 'onhold',
            payment: 'Via Store (Cash/Card/UPI)',
            delivery_agent: '',
        },

    })

    const OpenNewCustomerModal = () => {
        GlobalModal.title = "Create New Customer"
        GlobalModal.description = "Create a new Customer"
        GlobalModal.children = <NewCustomerForm gap={2} />
        GlobalModal.onOpen()
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)
        console.log(values)

        setTimeout(() => {
            setIsLoading(false)
            toast.success('Order created successfully')
        }, 3000) // remove this timeout and add submit logic

    }

    const paymentOptions = [
        {
            title: 'Via Store (Cash/Card)',
        }
    ]



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
                            name="service"
                            control={form.control}
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel htmlFor="fullname"> Select a Service</FormLabel>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Order Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>

                                            {Services.map((service, index) => (
                                                <SelectItem key={index} value={service.title}> <div className="flex flex-row items-center">{service.icon} {service.title}</div></SelectItem>
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
                                                            (data) => data.email === field.value
                                                        )?.email
                                                        : "Select Customer"}
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
                                                            value={data.email}
                                                            key={data.email}
                                                            onSelect={() => {
                                                                form.setValue("customer", data.email)
                                                            }}
                                                        >
                                                            {data.email}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    data.email === field.value
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
                                    <FormLabel> Select Status</FormLabel>
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
                                            <SelectItem value="Arsh">Arsh</SelectItem>
                                            <SelectItem value="Mujahed">Mujahed</SelectItem>
                                        </SelectContent>
                                    </Select>
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





        </div>
    )
}