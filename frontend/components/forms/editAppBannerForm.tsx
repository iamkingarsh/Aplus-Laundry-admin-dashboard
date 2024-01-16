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
import { Card } from "../ui/card"
import Image from "next/image"
import { postData } from "@/axiosUtility/api"


interface EditAppBannerFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
    bannerdata: any
    bannerid: string
}

const formSchema = z.object({
    banner_title: z.string().min(2, { message: "Banner title is required" }),
    banner_description: z.string().min(2, { message: "Banner description is required" }),
    banner_image: z.string().min(2, { message: "Banner image is required" }),
})

export function EditAppBannerForm({ className, gap, bannerdata, bannerid, ...props }: EditAppBannerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    console.log('bannerdata bannerdata bannerdata',bannerdata)

  

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    
    React.useEffect(() => {
        form.reset({
            banner_title: bannerdata?.banner_title || '',
            banner_description: bannerdata?.banner_description || '',
            banner_image: bannerdata?.banner_image || '',
        });
    }, [bannerdata]);


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here

        setIsLoading(true)
        const editData = async() =>{
            try {
                const lowercaseValues = Object.fromEntries(
                  Object.entries(values).map(([key, value]) => [key, typeof value === 'string' ? value.toLowerCase() : value])
                );
              
            
                const payload = {
                    ...lowercaseValues,
                    id: bannerdata?._id,
                  };
                  
                console.log('payload',payload)
                const response =  await postData('/appBanner/addorupdate', payload);
                console.log('API Response:', response);
              
                setIsLoading(false);
                toast.success('Category updated successfully');
                // router.push('/products');
              } catch (error) {
                console.error('Error creating/updating category:', error);
                setIsLoading(false);
                toast.error(`Error creating/updating category: ${error.message}`);
              }
        }
       
          
        // editData()

        setTimeout(() => {
            setIsLoading(false)
            toast.success('Customer created successfully')
        }, 3000) // remove this timeout and add submit logic

    }

    const [bannerImage, setBannerImage] = React.useState(bannerdata?.banner_image) // @ mujahed Replace this by creating a cloudinary image upload component

console.log(bannerImage)
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as any;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Use the field.onChange from useForm
            form.setValue("banner_image", file);
        } else {
            setBannerImage(null);
        }
    };

    return (
        <div className={cn("grid gap-6 ", className)} {...props}>


            <Form {...form} >

                <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 gap-3">
                    <div className={`grid grid-cols-${gap} gap-3`}>
                        {/* <div className={`grid grid-cols-2 gap-3`}> */}
                        <FormField
                            name="banner_image"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="banner_image">Upload Image</FormLabel>
                                    <FormControl>

                                        <Input
                                            id="banner_image"
                                            type="file"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                onImageChange(e);
                                            }}
                                            disabled={isLoading}
                                        />
                                        {/* @ mujahed Replace this by creating a cloudinary image upload component */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="banner_title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="banner_title">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="banner_title"
                                            placeholder="eg.  Get 10% off on your first order"
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
                            name="banner_description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="banner_description">Description</FormLabel>
                                    <FormControl>

                                        <Textarea
                                            id="banner_description"
                                            placeholder="eg. sign up and get 10% off on your first order"
                                            autoCapitalize="none"
                                            autoComplete="email"
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
                    <div className='' >
                        {form.watch("banner_title") === bannerdata?.banner_title && form.watch("banner_description") === bannerdata?.banner_description && form.watch("banner_image") === bannerdata?.banner_image ?
                            <Button type="submit" className="w-fit" disabled>

                                Update
                            </Button>
                            :
                            <Button type="submit" className="w-fit" disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                                )}
                                Update
                            </Button>
                        }
                    </div>

                </form>
            </Form>

            <div className="">
                {bannerImage ?
                    <Card className="w-[400px] relative m-auto h-48 overflow-hidden flex border-2  items-center">

                        <Image src={bannerImage} width={400} height={192} alt="banner image" objectFit="contain" className=" absolute" />

                    </Card>
                    :
                    <Card className="w-[400px] flex-col relative m-auto h-48 overflow-hidden flex  border-2 items-center justify-center">
                        <h1 className="text-2xl font-bold">Preview</h1>

                        <p className="text-xs">Select an image to see preview</p>
                    </Card>
                }
            </div>


        </div >
    )
}