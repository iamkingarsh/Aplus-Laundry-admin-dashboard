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
import { CalendarIcon, Clipboard, Copy, Dot, IndianRupee, Percent, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { Card, CardHeader } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Separator } from "../ui/separator"
import Heading from "../ui/heading"
import { postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"


interface NewCouponsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    discount_type: z.enum(["percentage", "fixed"]),
    discount_value: z.string().min(2, { message: "Discount value is required" }),
    discount_code: z.string().toUpperCase().min(2, { message: "Discount code is required" }),
    discount_expiry_date: z.date(),
    discount_usage_limit: z.string(),
    discount_minimum_purchase_amount: z.string().optional()
})

const CustomInput = (disabledKeys: any, field: any, ...props: any[]) => {
    const [value, setValue] = React.useState<string | number | readonly string[] | undefined>(field);

    const handleKeyDown = (event: any) => {
        // Check if the pressed key is in the disabledKeys array
        if (disabledKeys.includes(event.keyCode)) {
            // Prevent the default action for the disabled keys
            event.preventDefault();
        }
    };

    return (
        <Input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};

export function NewCouponsForm({ className, gap, ...props }: NewCouponsFormProps) {
    const router = useRouter()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [couponCode, setCouponCode] = React.useState<string>("")


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            discount_type: "percentage",
            discount_value: "0",
            discount_expiry_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            discount_usage_limit: "0",
            discount_minimum_purchase_amount: "0",
            discount_code: couponCode,
        },

    })




    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here
       console.log('values',values)
        setIsLoading(true)

        try {

                  // Convert values to lowercase
                //   const lowercaseValues = Object.keys(values).reduce((acc: any, key: string) => {
                //     acc[key] = typeof values[key as keyof typeof values] === 'string' ? values[key as keyof typeof values].toLowerCase() : values[key as keyof typeof values];
                //     return acc;
                // }, {});

            const data = {
                ...values,
                role: 'customer'
            };

            const response = await postData('/coupon/addorupdate', data);
            console.log('API Response:', response);

            setIsLoading(false);
            toast.success('coupons created successfully');
            router.push('/coupons')
        } catch (error) {
            console.error('Error creating Item:', error);
            setIsLoading(false);
            toast.error('Error creating Item');
        }

        setTimeout(() => {
            setIsLoading(false)

            toast.success('Coupon created successfully')
        }, 3000) // remove this timeout and add submit logic

    }





    return (
        <div className={cn("grid grid-cols-2 gap-3 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 place-content-start gap-3">
                    <FormField
                        name="discount_code"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="discount_code">Coupon Code</FormLabel>
                                <FormControl>
                                    <div className="w-full flex gap-2">

                                        <Input
                                            id="discount_code"
                                            type="text"
                                            placeholder="eg. Welcome50"
                                            autoCapitalize="none"
                                            defaultValue={couponCode}
                                            className="uppercase"

                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field || couponCode}
                                        />
                                        {/* <div>

                                            <span className="cursor-pointer" onClick={() => generateCouponCode}>Generate</span>
                                        </div> */}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={`grid grid-cols-${gap} gap-4 `}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="discount_type"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount_type">Coupon Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="percentage" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Percentage discount
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="fixed" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Fixed amount discount
                                                </FormLabel>
                                            </FormItem>

                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="discount_value"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount_value">Discount Value</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                id="discount_value"
                                                type="number"
                                                placeholder={form.watch("discount_type") === "percentage" ? "eg. 10" : "eg. 50"}
                                                autoCapitalize="none"

                                                className=""

                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                            {form.watch("discount_type") === "percentage" ? <Percent className="absolute right-4 top-3 h-4 w-4 opacity-50" /> : <IndianRupee className="absolute right-4 top-3 h-4 w-4 opacity-50" />}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="discount_expiry_date"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount_expiry_date">Expiry Date</FormLabel>
                                    <FormControl>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {/* @ mujahed Replace this by creating a cloudinary image upload component */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="discount_minimum_purchase_amount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount_minimum_purchase_amount">Min. Purchase Amount</FormLabel>
                                    <FormControl>
                                        <div className="relative">

                                            <Input
                                                id="discount_minimum_purchase_amount"
                                                type="text"
                                                placeholder="eg. 500"
                                                autoCapitalize="none"

                                                className=""
                                                defaultValue="0"
                                                datatype="number"

                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                            <IndianRupee className="absolute right-4 top-3 h-4 w-4 opacity-50" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="discount_usage_limit"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="discount_usage_limit">Usage Limit</FormLabel>
                                    <FormControl>
                                        <div className="relative">

                                            <Input
                                                id="discount_usage_limit"
                                                type="number"
                                                placeholder="eg. 1"
                                                autoCapitalize="none"

                                                className=""

                                                autoCorrect="off"
                                                disabled={isLoading}

                                                {...field}
                                            />
                                            {/* <IndianRupee className="absolute right-4 top-3 h-4 w-4 opacity-50" /> */}

                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Enter Number of times this coupon can be used, leave blank or enter 0 for unlimited usage
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className='' >
                        <Button type="submit" className="w-fit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </div>

                </form>
            </Form>

            <div className=' flex items-start gap-3'>
                <Separator orientation='vertical' />
                <div className='flex flex-col gap-3 w-full'>
                    <Heading className='leading-tight text-2xl' title='Summary' />
                    <Separator orientation='horizontal' />
                    <div>
                        <Card>
                            <CardHeader>
                                <Heading className='leading-tight text-xl' title='Discount Details' />
                                <Separator orientation='horizontal' />
                                {form.watch("discount_code") ? <div className='flex flex-col gap-3'>
                                    <div className="flex gap-3 items-center w-fit border-2 rounded-md bg-slate-100 dark:bg-slate-950 p-2 border-dashed">

                                        <p className='text-xl font-semibold'>{form.watch("discount_code").toUpperCase()}</p>
                                        <Clipboard className='h-4 w-4 cursor-pointer' onClick={() => { navigator.clipboard.writeText(form.watch("discount_code").toUpperCase()); toast.success("Copied to Clipboard") }} />
                                    </div>
                                    <div>
                                        <li className='text-sm opacity-70'>{form.watch("discount_type") == 'percentage' ? 'Percentage' : 'Fixed'} discount</li>
                                        {form.watch("discount_value") > "0" && <li className='text-sm opacity-70 '>{form.watch("discount_type") === 'fixed' && 'Rs. '}{form.watch("discount_value")}{form.watch("discount_type") === 'percentage' && '%'} will be off on the total cart</li>}
                                        {form.watch("discount_expiry_date") && <li className='text-sm opacity-70 '>Expires on {form.watch("discount_expiry_date").toDateString()}</li>}
                                        <li className='text-sm opacity-70 '>{form.watch("discount_minimum_purchase_amount") != "0" && 'Rs. '}{form.watch("discount_minimum_purchase_amount") != "0" && form.watch("discount_minimum_purchase_amount")} {form.watch("discount_minimum_purchase_amount") == "0" && "No "} Min purchase amount is required to avail this discount</li>
                                        <li className='text-sm opacity-70 '>{form.watch("discount_usage_limit") != "0" && form.watch("discount_usage_limit")} {form.watch("discount_usage_limit") != "0" && "Time(s)"} {form.watch("discount_usage_limit") == "0" && "Unlimited"} usage limit</li>


                                    </div>
                                </div> : <p className='text-base font-semibold'>No Summary Availabale</p>}
                            </CardHeader>
                        </Card>
                    </div>

                </div>

            </div>


        </div >
    )
}


