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
import { Plus } from "lucide-react"
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



interface NewServiceFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const laundrybykg_itemsSchema = z.object({
    title: z.string().min(2, { message: "Service title is required" }),
    laundrybykg: z.string(),
    laundrybykgprice: z.string(),
    laundryperpair: z.string(),
    laundrybykg_items: z.array(z.string()),
})

const laundryperpair_itemsSchema = z.object({
    title: z.string().min(2, { message: "Service title is required" }),
    laundrybykg: z.string(),
    laundrybykgprice: z.string(),
    laundryperpair: z.string(),
    laundryperpair_items: z.array(z.string()),
})

const formSchema = z.object({
    serviceTitle: z.string().min(2, { message: "Service title is required" }),
    laundrybykg: z.string(),
    laundrybykgprice: z.string(),
    laundryperpair: z.string(),
    laundryitems: z.object({
        laundrybykg_items: z.array(z.string()),
        laundryperpair_items: z.array(z.string()),
    }).partial(),
    isSubscriptionService: z.boolean()
})



export function NewServiceForm({ className, gap, ...props }: NewServiceFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [LaundryProducts, setLaundryProducts] = React.useState([]) as any[]


    const subscription = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('subscription') === "false" ? false : true

    console.log('subscription', subscription)

    const getData = async () => {
        setIsLoading(true)
        try {
            const result = await fetchData('/product/getall'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            if (result && result.products) {
                const products = result.products;
                setLaundryProducts(products);
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



    React.useEffect(() => {
        getData()



    }, [])


    const productsByCategory = {} as any;

    LaundryProducts.forEach((product: any) => {
        if (!productsByCategory[product.category.title]) {
            productsByCategory[product.category.title] = [];
        }
        productsByCategory[product.category.title].push(product);
    });

    const getLaundryItemsCategoryData = Object.entries(productsByCategory).map(([key, value]) => {
        return {
            category: key,
            products: value,
        };
    });

    console.log('getLaundryItemsCategoryData', getLaundryItemsCategoryData)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serviceTitle: "",
            laundrybykg: "Deactivated",
            laundrybykgprice: "0",
            laundryperpair: "Deactivated",
            laundryitems: {
                laundrybykg_items: [],
                laundryperpair_items: [],
            },
            isSubscriptionService: subscription
        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const data = {
                serviceTitle: values.serviceTitle,
                laundryPerPair: {
                    active: values.laundryperpair === "Activated",
                    items: values.laundryitems.laundryperpair_items
                },
                laundryByKG: {
                    active: values.laundrybykg === "Activated",
                    price: values.laundrybykgprice ? parseFloat(values.laundrybykgprice) : 0,
                    items: values.laundryitems.laundrybykg_items
                },
                isSubscriptionService: subscription
            };

            const response = await postData('/service/addorupdate', data);
            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Item created successfully');
            // Optionally, you can redirect the user or perform other actions upon successful submission.
            router.push('/services');
        } catch (error) {
            console.error('Error creating Item:', error);
            setIsLoading(false);
            toast.error('Error creating Item');
        }
    }


    const [selectedItemsForLPK, setSelectedItemsForLPK] = React.useState<any>([]);
    const [selectedItemsForLPP, setSelectedItemsForLPP] = React.useState<any>([]);



    const isOptionSelected = (value: string, laundrytype: string): any => {
        return laundrytype === "laundrybykg" ? selectedItemsForLPK.includes(value) : selectedItemsForLPP.includes(value);
    };

    const handleSelectChange = (value: string, laundrytype: string): any => {
        if (laundrytype === "laundrybykg") {
            if (selectedItemsForLPK.includes(value)) {
                setSelectedItemsForLPK(selectedItemsForLPK.filter((item: any) => item !== value));
            } else {
                setSelectedItemsForLPK([...selectedItemsForLPK, value]);
            }
        } else {
            if (selectedItemsForLPP.includes(value)) {
                setSelectedItemsForLPP(selectedItemsForLPP.filter((item: any) => item !== value));
            } else {
                setSelectedItemsForLPP([...selectedItemsForLPP, value]);
            }
        }
    }

    React.useEffect(() => {
        console.log(form)
    }, [form])


    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="serviceTitle"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="serviceTitle">Service Title</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="serviceTitle"
                                            type="text"
                                            autoComplete="off"
                                            disabled={isLoading}
                                            {...field}
                                            placeholder="eg. Laundry"
                                        />
                                        {/* @ mujahed Replace this by creating a cloudinary image upload component */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="laundrybykg"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="laundrybykg">Laundry By KG</FormLabel>
                                    <FormControl>
                                        <Card className="flex h-9 rounded-md p-1 px-4 items-center justify-between">
                                            <span className="text-sm">Activate Service</span>
                                            <Switch
                                                className="data-[state=checked]:bg-green-500 data-[state=checked]:text-wj"
                                                checked={form.watch("laundrybykg") === "Activated" ? true : false}
                                                onCheckedChange={
                                                    form.watch("laundrybykg") === "Activated" ? () => form.setValue("laundrybykg", "Deactivated") : () => form.setValue("laundrybykg", "Activated")
                                                }
                                                id="laundryperpair"  {...field} />
                                        </Card>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="laundryperpair"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="laundryperpair">Laundry Per Pair</FormLabel>
                                    <FormControl>
                                        <Card className="flex h-9 rounded-md p-1 px-4 items-center justify-between">
                                            <span className="text-sm">Activate Service</span>
                                            <Switch
                                                className="data-[state=checked]:bg-green-500"
                                                checked={form.watch("laundryperpair") === "Activated" ? true : false}
                                                onCheckedChange={
                                                    form.watch("laundryperpair") === "Activated" ? () => form.setValue("laundryperpair", "Deactivated") : () => form.setValue("laundryperpair", "Activated")
                                                }
                                                id="laundryperpair"  {...field} />
                                        </Card>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("laundrybykg") === 'Activated' &&
                            <FormField
                                name="laundrybykgprice"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="laundrybykgprice">Laundry By KG Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="eg. 50"
                                                id="laundrybykgprice"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        {form.watch("laundrybykg") === 'Activated' && <FormField
                            name="laundryitems.laundrybykg_items"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="products"> Select Laundry By Kg Items</FormLabel>
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
                                            <DropdownMenuLabel>Select Products</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline">Open Items Catalogue</Button>
                                                </SheetTrigger>
                                                <SheetContent className="w-full">
                                                    <SheetHeader>
                                                        <SheetTitle>Select Laundry Items</SheetTitle>
                                                        <SheetDescription>
                                                            Please select the products
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[85%] my-2 px-2 rounded-md ">


                                                        <div className="grid gap-4 py-4">
                                                            <Card
                                                                onSelect={(e) => e.preventDefault()}

                                                                // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                className="flex gap-2 p-2 justify-between items-center"
                                                            >

                                                                <div>
                                                                    All
                                                                </div>
                                                                <div className="flex gap-2 items-center justify-end">

                                                                    <Switch className="data-[state=checked]:bg-green-500" checked={
                                                                        selectedItemsForLPK.length === LaundryProducts.length ? true : false

                                                                    } onCheckedChange={
                                                                        () => {
                                                                            if (selectedItemsForLPK.length === LaundryProducts.length) {
                                                                                setSelectedItemsForLPK([])
                                                                            } else {
                                                                                setSelectedItemsForLPK(LaundryProducts.map((item: any) => item._id))
                                                                            }
                                                                        }
                                                                    } id="laundrybykg" />

                                                                </div>

                                                            </Card>
                                                            {getLaundryItemsCategoryData.map((value: any, index: number) => {
                                                                return (

                                                                    <Card
                                                                        onSelect={(e) => e.preventDefault()}
                                                                        key={index}
                                                                        // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                        className="flex flex-col gap-2 p-2 "
                                                                    >
                                                                        <CardHeader className="flex gap-2 justify-between items-center">

                                                                            {value.category.charAt(0).toUpperCase() + value.category.slice(1)}

                                                                        </CardHeader>
                                                                        <CardContent className="flex flex-col gap-2 p-2 ">
                                                                            {value.products.map((product: any, index: number) => {
                                                                                return (<div key={index} className="flex gap-2 justify-between">

                                                                                    <div>
                                                                                        {product.product_name.charAt(0).toUpperCase() + product.product_name.slice(1)}

                                                                                    </div>
                                                                                    <div className="flex gap-2 items-center justify-end">

                                                                                        <Switch className="data-[state=checked]:bg-green-500" checked={isOptionSelected(product._id, "laundrybykg")} onCheckedChange={() => handleSelectChange(product._id, "laundrybykg")} id="laundrybykg" />
                                                                                    </div>
                                                                                </div>)
                                                                            }
                                                                            )}
                                                                        </CardContent>

                                                                    </Card>

                                                                )
                                                            })}




                                                        </div>
                                                    </ScrollArea>
                                                    <SheetFooter className="flex w-full items-center md:justify-between">

                                                        <SheetClose asChild>
                                                            {/* <Button onClick={() => { form.setValue("products", { ...selectedItems }); console.log(form.setValue("products", selectedItems), { ...selectedItems }) }} type="submit">Save changes</Button> */}

                                                            <Button onClick={() => {

                                                                form.setValue("laundryitems.laundrybykg_items", [...selectedItemsForLPK]);


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
                        />}
                        {form.watch("laundryperpair") === 'Activated' && <FormField
                            name="laundryitems.laundryperpair_items"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="products"> Select Laundry Per Pair Items</FormLabel>
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
                                                        <SheetTitle>Select Products</SheetTitle>
                                                        <SheetDescription>
                                                            Please select the products
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <ScrollArea className="h-[85%] my-2 px-2 rounded-md ">


                                                        <div className="grid gap-4 py-4">
                                                            <Card
                                                                onSelect={(e) => e.preventDefault()}

                                                                // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                className="flex gap-2 p-2 justify-between items-center"
                                                            >

                                                                <div>
                                                                    All
                                                                </div>
                                                                <div className="flex gap-2 items-center justify-end">

                                                                    <Switch className="data-[state=checked]:bg-green-500" checked={
                                                                        selectedItemsForLPP.length === LaundryProducts.length ? true : false

                                                                    } onCheckedChange={
                                                                        () => {
                                                                            if (selectedItemsForLPP.length === LaundryProducts.length) {
                                                                                setSelectedItemsForLPP([])
                                                                            } else {
                                                                                setSelectedItemsForLPP(LaundryProducts.map((item: any) => item._id))
                                                                            }
                                                                        }
                                                                    } id="laundrybykg" />

                                                                </div>



                                                            </Card>
                                                            {getLaundryItemsCategoryData.map((value: any, index: number) => {
                                                                return (

                                                                    <Card
                                                                        onSelect={(e) => e.preventDefault()}
                                                                        key={index}
                                                                        // checked={isOptionSelected == value.title && selectedItems[value.title] > 1 ? true : false}

                                                                        className="flex flex-col gap-2 p-2 "
                                                                    >
                                                                        <CardHeader className="flex gap-2 justify-between items-center">
                                                                            {value.category.charAt(0).toUpperCase() + value.category.slice(1)}


                                                                        </CardHeader>
                                                                        <CardContent className="flex flex-col gap-2 p-2 ">
                                                                            {value.products.map((product: any, index: number) => {
                                                                                return (<div key={index} className="flex gap-2 justify-between">

                                                                                    <div>
                                                                                        {product.product_name.charAt(0).toUpperCase() + product.product_name.slice(1)}

                                                                                    </div>
                                                                                    <div className="flex gap-2 items-center justify-end">

                                                                                        <Switch className="data-[state=checked]:bg-green-500" checked={isOptionSelected(product._id, "laundryperpair")} onCheckedChange={() => handleSelectChange(product._id, "laundryperpair")} id="laundryperpair" />
                                                                                    </div>
                                                                                </div>)
                                                                            }
                                                                            )}
                                                                        </CardContent>

                                                                    </Card>

                                                                )
                                                            })}





                                                        </div>
                                                    </ScrollArea>
                                                    <SheetFooter className="flex w-full items-center md:justify-between">

                                                        <SheetClose asChild>
                                                            {/* <Button onClick={() => { form.setValue("products", { ...selectedItems }); console.log(form.setValue("products", selectedItems), { ...selectedItems }) }} type="submit">Save changes</Button> */}

                                                            <Button onClick={() => {

                                                                form.setValue("laundryitems.laundryperpair_items", [...selectedItemsForLPP]);


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
                        />}

                    </div>
                    <div className='' >
                        {
                            form.watch("laundrybykg") === 'Activated' && form.watch("laundrybykgprice") !== '0' && (form.watch("laundryitems.laundrybykg_items") ?? []).length > 0 ||
                                form.watch("laundryperpair") === 'Activated' && (form.watch("laundryitems.laundryperpair_items") ?? []).length > 0
                                ?
                                <Button type="submit" className="w-fit" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                    )}
                                    Create
                                </Button>
                                :
                                <Button type="submit" className="w-fit" disabled>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                    )}
                                    Create
                                </Button>
                        }

                    </div>

                </form>
            </Form>




        </div >
    )
}