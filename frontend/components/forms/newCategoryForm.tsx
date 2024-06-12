"use client"

import * as React from "react"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import  {postData} from '../../axiosUtility/api'
import { useRouter } from 'next/navigation';



interface NewCategoryFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number

}

const formSchema = z.object({
    title: z.string().min(3, { message: "Category title must be atleast 3 characters long" }),



})

export function NewCategoryForm({ className, gap, ...props }: NewCategoryFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router= useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',

        },

    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here
        setIsLoading(true); 
      try {
       
      // Convert values to lowercase
            const lowercaseValues = Object.keys(values).reduce((acc: any, key: string) => {
                acc[key] = typeof values[key as keyof typeof values] === 'string' ? values[key as keyof typeof values].toLowerCase() : values[key as keyof typeof values];
                return acc;
            }, {});
      
        const response = await postData('/category/createorupdate', lowercaseValues); 
        console.log('API Response:', response);
      
        setIsLoading(false);
        toast.success('Category created/updated successfully');
        router.push('/categories')
      } catch (error) {
        console.error('Error creating/updating category:', error);
        setIsLoading(false);
        toast.error('Error creating/updating category');
      }
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
                            Create
                        </Button>
                    </div>

                </form>
            </Form>




        </div>
    )
}