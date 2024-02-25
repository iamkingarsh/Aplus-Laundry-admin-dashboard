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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { categories } from "@/lib/constants"
import api, { fetchData, postData } from "@/axiosUtility/api"
import { set } from "date-fns"
import { useRouter } from "next/navigation"


interface NewLaundryItemFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    product_name: z.string().min(3, { message: "Product name must be atleast 3 characters long" }),
    category: z.string().min(3, { message: "Category must be atleast 3 characters long" }),
    priceperpair: z.string().min(1, { message: "Price per pair must be atleast Rs. 1" }),
    status: z.boolean().default(true)

})

export function NewLaundryItemForm({ className, gap, ...props }: NewLaundryItemFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [categories, setCategories] = React.useState([])
    const getData = async () => {
        setIsLoading(true)
        try {
            const result = await fetchData('/category/all'); // Replace 'your-endpoint' with the actual API endpoint

            if (result && result.categories) {
                let categories = result.categories;
                setCategories(categories)
                setIsLoading(false)
                // Now you can work with the 'categories' array
            } else {
                console.error('Response format is not as expected');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(() => {
        getData()
    }, [])


    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_name: "",
            priceperpair: "0",
            category: ""

        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)
        try {

               // Convert values to lowercase
const lowercaseValues = Object.keys(values).reduce((acc: any, key: string) => {
    const value = values[key as keyof typeof values];
    acc[key] = typeof value === 'string' ? value.toLowerCase() : value;
    return acc;
}, {});


            const response = await postData('/product/adorupdate', lowercaseValues);
            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Item created successfully');
            router.push('/products')
        } catch (error) {
            console.error('Error creating Item:', error);
            setIsLoading(false);
            toast.error('Error creating Item');
        }

    }


    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="product_name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="Item Name">Item Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="Item Name"
                                            placeholder="eg.  Shirt"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="fullname"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="category"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>Select a Category</FormLabel>
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
        ? (categories.find((data: any) => data._id === field.value) as any)?.title
        : "Select Category"}
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
                                                        No Categories Found
                                                    </div>
                                                    {/* <div>
                                                        <Button onClick={OpenNewCustomerModal} variant="ghost" className="mt-2">
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Add Customer
                                                        </Button>
                                                    </div> */}

                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {categories.map((data: any) => (
                                                        <CommandItem
                                                            value={data.title}
                                                            key={data.title}
                                                            onSelect={() => {
                                                                form.setValue("category", data._id)
                                                            }}
                                                        >
                                                            {data.title}
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
                                                    {/* {
                                                        categories.length > 0 && <CommandItem onSelect={() => {
                                                            router.push('/categories/new')
                                                        }}> <div className="flex flex-row items-center"> <Plus className="h-4 w-4 mr-2" /> Add Category</div></CommandItem>
                                                    } */}
                                                    {/* <CommandItem onSelect={OpenNewCustomerModal}> <div className="flex flex-row items-center"> <Plus className="h-4 w-4 mr-2" /> Add Customer</div></CommandItem> */}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Please select a  category from the list
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="priceperpair"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="Priceperpair">Price Per Pair</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="Priceperpair"
                                            placeholder="eg. 50"
                                            type="number"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}

                                        />
                                    </FormControl>
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