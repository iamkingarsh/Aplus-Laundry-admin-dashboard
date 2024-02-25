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
    period: z.enum(["per month", "per 3 months", "per 6 months", "per 9 months", "per year"]),
    name: z.string().min(3, { message: "Item name must be at least 3 characters long" }),
    below12: z.string().min(1, { message: "Plan price must be at least 1" }),
    above12: z.string().min(1, { message: "Plan price must be at least 1" }),
    planfor: z.enum(["below12", "above12"]),

})



export function NewSubscriptionPlanForm({ className, gap, ...props }: NewSubscriptionPlanFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [services, setServices] = React.useState([]) as any[]

    const period = [{ title: "per month" }, { title: "per 3 months" }, { title: "per 6 months" }, { title: "per 9 months" }, { title: "per year" }]
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



    React.useEffect(() => {
        getServices()
    }, [])



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            service: "",
            period: "per month",
            name: "",
            planfor: "above12",
            below12: "0",
            above12: "0",



        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form values:', values);

        setIsLoading(true);
        console.log('values', values)
        try {
            const data = {
                name: values.name,
                service: values.service,
                periodPlan: values.period,
                below12: {
                    amount: values.below12
                }, above12: {
                    amount: values.above12
                }
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
                                                                value={data._id}
                                                                key={data._id}

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

                            <FormField
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
                            />

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