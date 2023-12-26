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


interface EditCustomerFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
    customerid: string
    customerData: any
}

const formSchema = z.object({
    fullname: z.string().min(2,
        { message: "Name must be atleast 2 characters long" }
    ).max(50,
        { message: "Name must be less than 50 characters long" }
    ),
    email: z.string().email(),
    phoneno: z.string().min(10).max(10),
    address: z.string().min(10).max(100),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    pincode: z.string().min(6).max(6),
    country: z.string().min(2).max(50),

})

export function EditCustomerForm({ className, gap, customerData, ...props }: EditCustomerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: customerData.fullname,
            email: customerData.email,
            phoneno: customerData.mobile,
            address: customerData.address,
            pincode: customerData.pincode,
            country: "India",
            state: customerData.state,
            city: customerData.city,
        },

    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add  update logic here

        setIsLoading(true)


        setTimeout(() => {
            setIsLoading(false)
            toast.success('Customer created successfully')
        }, 3000) // remove this timeout and add submit logic

    }


    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="fullname"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullname">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="fullname"
                                            placeholder="eg. John Doe"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="fullname"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.fullname?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="email"
                                            placeholder="eg. john@example.com "
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.email?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="phoneno"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="phoneno">Mobile No.</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="phoneno"
                                            placeholder="eg. +91 9876543210"
                                            type="tel"
                                            autoCapitalize="none"
                                            autoComplete="phoneno"
                                            autoCorrect="off"

                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.phoneno?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="address">Address</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="address"
                                            placeholder="eg. 1234 Main St"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="address"
                                            required={false}
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.address?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="city"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="city">City</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="city"
                                            placeholder="eg. Mumbai"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="city"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.city?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="state"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="state">State</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="state"
                                            placeholder="eg. Maharashtra"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="state"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.state?.message}
                                    </FormMessage>
                                </FormItem>
                            )} />
                        <FormField
                            name="pincode"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="pincode">Pincode</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="pincode"
                                            placeholder="eg. 400001"
                                            type="number"
                                            autoCapitalize="none"
                                            autoComplete="pincode"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors?.pincode?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="country"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="country">Country</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="country"
                                            placeholder="eg. India"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="country"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors?.country?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={`${gap === 2 ? 'w-full' : 'grid gap-3 grid-cols-3'}`} >
                        {
                            form.watch().fullname === customerData.fullname && form.watch().email === customerData.email && form.watch().phoneno === customerData.mobile && form.watch().address === customerData.address && form.watch().city === customerData.city && form.watch().state === customerData.state && form.watch().pincode === customerData.pincode && form.watch().country === 'India'
                                ? <Button type="submit" className="w-full" disabled>
                                    Update
                                </Button>
                                :

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                    )}
                                    Update
                                </Button>}
                    </div>

                </form>
            </Form>




        </div>
    )
}