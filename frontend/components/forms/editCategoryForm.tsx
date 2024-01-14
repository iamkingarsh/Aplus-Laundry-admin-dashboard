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
import Data from "@/app/(routes)/categories/Data"


interface EditCategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
    categoryData: any
}

const formSchema = z.object({
    title: z.string().min(3, { message: "Category title must be atleast 3 characters long" }),



})

export function EditCategoryForm({ className, categoryData, gap, ...props }: EditCategoryFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [categories, setCategories] = React.useState<any>([])

    // Data().then((data) => {
    //     setIsLoading(true)
    //     setCategories(data)
    //     setIsLoading(false)
    // })




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: categories?.title || '',

        },

    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

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

                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Category Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder="eg.  Men"
                                            type="Category Title"
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
                    </div>
                    <div className={`${gap === 2 ? 'w-full' : 'grid gap-3 grid-cols-3'}`} >
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                            )}
                            Update
                        </Button>
                    </div>

                </form>
            </Form>




        </div>
    )
}