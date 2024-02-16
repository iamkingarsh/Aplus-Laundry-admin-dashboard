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
import Heading from "../ui/heading"
import { set } from "date-fns"
import { postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"



interface NewCustomerFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    fullName: z.string().min(2,
        { message: "Name must be atleast 2 characters long" }
    ).max(50,
        { message: "Name must be less than 50 characters long" }
    ),
    email: z.string().email(),
    mobileNumber: z.string().min(10).max(10),
    address: z.string().min(10).max(100),
    city: z.string().min(2).max(50),
    customerType: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    pincode: z.string().min(6).max(6),
    country: z.string().min(2).max(50),

})

const formSchemaOtp = z.object({
    otp: z.string().min(6).max(6,
        { message: " OTP must be 6 characters long" }
    ),

})

export function NewCustomerForm({ className, gap, ...props }: NewCustomerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)



    const subscription = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('subscription') === "false" ? false : true

    const router = useRouter()





    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: "India",
            state: "Andhra Pradesh",
            city: "Ongole",
            customerType: subscription === false ? "nonsubscriber" : "subscriber",
        },

    })






    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here
        try {

              // Convert values to lowercase
            const lowercaseValues = Object.keys(values).reduce((acc: any, key: string) => {
                acc[key] = typeof values[key as keyof typeof values] === 'string' ? values[key as keyof typeof values].toLowerCase() : values[key as keyof typeof values];
                return acc;
            }, {});

            const data = {
                ...lowercaseValues,
                role: 'customer'
            };

            const response = await postData('/auth/register', data);
            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('Item created successfully');
            router.push('/customers')
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
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="fullName"
                                            placeholder="eg. John Doe"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="fullName"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.fullName?.message}
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
                            name="mobileNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="mobileNumber">Mobile No.</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="mobileNumber"
                                            placeholder="eg. +91 9876543210"
                                            type="number"
                                            autoCapitalize="none"
                                            autoComplete="mobileNumber"
                                            autoCorrect="off"

                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.mobileNumber?.message}
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