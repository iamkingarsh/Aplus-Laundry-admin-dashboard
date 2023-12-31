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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/lib/firebase"


interface NewAppBannerFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    banner_title: z.string().min(2, { message: "Banner title is required" }),
    banner_description: z.string().min(2, { message: "Banner description is required" }),
    banner_image: z.string().min(2, { message: "Banner image is required" }),
})

export function NewAppBannerForm({ className, gap, ...props }: NewAppBannerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            banner_title: "",
            banner_description: "",
            banner_image: "",
        },

    })

    const [bannerImage, setBannerImage] = React.useState("" as any)
    const [bannerImageFile, setBannerImageFile] = React.useState("" as any)

    const uploadImageToFirebase = async (file: any) => {
        try {
            const storageRef = ref(storage, `app-banners/${file.name}`);
            // Upload file
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('File available at', downloadURL);
            toast.success('Profile Picture added successfully!');

        } catch (error) {
            console.log('Error in uploadImageToFirebase:', error);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here
        uploadImageToFirebase(bannerImageFile)
        setIsLoading(true)


        setTimeout(() => {
            setIsLoading(false)
            toast.success('Customer created successfully')
        }, 3000) // remove this timeout and add submit logic

    }


    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] as any;
        setBannerImageFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const imageUrl = event.target.result;
                form.setValue('banner_image', imageUrl);
                setBannerImage(imageUrl);

            };

            reader.readAsDataURL(file); // change the logic during backend integration, use cloudinary
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
                        <Button type="submit" className="w-fit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4  w-4 animate-spin" />
                            )}
                            Create
                        </Button>
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