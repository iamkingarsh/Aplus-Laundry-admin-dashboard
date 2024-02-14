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



interface NewKidsSubscriptionPlanFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    service: z.string().min(3, { message: "Service name must be at least 3 characters long" }),
    name: z.string().min(3, { message: "Item name must be at least 3 characters long" }),
    amount: z.string().min(1, { message: "Item price must be at least 1" }),
    currency: z.string().min(3, { message: "Item currency must be at least 3 characters long" }),


})



export function NewKidsSubscriptionPlanForm({ className, gap, ...props }: NewKidsSubscriptionPlanFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [services, setServices] = React.useState([]) as any[]



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
            name: "monthly",
            amount: '0',
            currency: "INR",


        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form values:', values);

        setIsLoading(true);

        try {

            console.log('data', values)
            const response = await postData('/below12/add', values);

            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Plan created successfully');
            // Optionally, you can redirect the user or perform other actions upon successful submission.
            router.push('/subscription-plans');
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
                                name="name"
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
                                name="amount"
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