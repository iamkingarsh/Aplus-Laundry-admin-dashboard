"use client"

import  React ,  { useEffect } from "react"
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
import { postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"


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


})

export function EditCustomerForm({ className, gap, customerData, ...props }: EditCustomerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()
   console.log('customerDatacustomerDatacustomerDatacustomerDatacustomerDatacustomerDatacustomerDatacustomerData',customerData)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: customerData?.fullName,
            email: customerData?.email,
            phoneno: customerData?.mobileNumber,
        },

    })

    useEffect(() => {
        form.reset({
            fullname: customerData?.fullName,
            email: customerData?.email,
            phoneno: customerData?.mobileNumber.toString(),
           
        });
    }, [customerData]);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add  update logic here

        setIsLoading(true)
        try {

            const { fullname, email, phoneno } = values;

            // Convert values to lowercase
            const lowercaseValues = {
                fullname: fullname?.toLowerCase(),
                phoneno: phoneno?.toLowerCase(),
            };
    
            const data = {
                ...lowercaseValues,
                id: customerData?._id
            };


            const response = await postData('/auth/updateUser', data);
            // const response2 = await postData(`/auth/editAddress`, data)
            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('User Updated successfully');
            router.push('/customers')
        } catch (error) {
            console.error('Error creating Item:', error);
            setIsLoading(false);
            toast.error('Error creating Item');
        }


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
                        <FormItem>
                     <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            id="email"
                                            placeholder="eg. john@example.com "
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={true}
                                            value={form.watch("email")}
                                        />
                               
                               </FormItem>

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
                                            type="text"
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
                        
                    </div>
                    <div className={`${gap === 2 ? 'w-full' : 'grid gap-3 grid-cols-3'}`} >
                        {
                            form.watch().fullname === customerData?.fullName && form.watch().email === customerData?.email && form.watch().phoneno === customerData?.mobileNumber 
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