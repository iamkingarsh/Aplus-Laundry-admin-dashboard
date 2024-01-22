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

interface EditCouponsFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
    couponid: string
    CouponCodeData: any
}



const formSchema = z.object({
    discount_type: z.enum(["percentage", "fixed"]),
    discount_value: z.string().min(2, { message: "Discount value is required" }),
    discount_code: z.string().toUpperCase().min(2, { message: "Discount code is required" }),
    discount_expiry_date: z.date(),
    discount_usage_limit: z.string(),
    discount_minimum_purchase_amount: z.string().optional()
})



export function EditCouponsForm({ className, gap, couponid, CouponCodeData, ...props }: EditCouponsFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [couponCode, setCouponCode] = React.useState<string>("")

    console.log('CouponCodeData CouponCodeData CouponCodeData', CouponCodeData?.discount_type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    React.useEffect(() => {
        form.reset({
            discount_type: CouponCodeData?.discount_type,
            discount_value: CouponCodeData?.discount_value,

            // discount_expiry_date: new Date('2023-10-10'),
            discount_expiry_date: CouponCodeData?.discount_expiry_date,
            discount_usage_limit: CouponCodeData?.discount_usage_limit,
            discount_minimum_purchase_amount: CouponCodeData?.discount_minimum_purchase_amount,
            discount_code: CouponCodeData?.discount_code,
        });
    }, [CouponCodeData]);




    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)


        setTimeout(() => {
            setIsLoading(false)

            toast.success('Coupon Updated successfully')
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
                                            disabled
                                            // {...field || couponCode}
                                            value={CouponCodeData?.discount_code}
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
                                            defaultValue={field.value?.toString()}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem disabled value="percentage" />
                                                </FormControl>
                                                <FormLabel className="font-normal opacity-50">
                                                    Percentage discount
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem disabled value="fixed" />
                                                </FormControl>
                                                <FormLabel className="font-normal opacity-50">
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
                                                disabled
                                                value={CouponCodeData?.discount_value}
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
                                                            // format(field.value, "PPP")
                                                            format(new Date(field.value), "PP")
                                                            // field.value
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
                                                    selected={new Date(field.value)}
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
                            Update
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
                                        {form.watch("discount_expiry_date") && <li className='text-sm opacity-70 '>Expires on {new Date(form.watch("discount_expiry_date")).toDateString().toString()}</li>}
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


