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
import api, { fetchData, postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"


interface NewAppBannerFormProps extends React.HTMLAttributes<HTMLDivElement> {
    gap: number
}

const formSchema = z.object({
    banner_title: z.string().min(2, { message: "Banner title is required" }),
    banner_description: z.string().min(2, { message: "Banner description is required" }),
    banner_image: z.string().min(2, { message: "Banner image is required" }),
})

export function NewAppBannerForm({ className, gap, ...props }: NewAppBannerFormProps) {
    const router = useRouter()

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
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.log('Error in uploadImageToFirebase:', error);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Add submit logic here
        setIsLoading(true);
        console.log('AppBanner values', values);

        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

            // Upload the image and get the download URL
            const downloadURL = await uploadImageToFirebase(bannerImageFile);

            // Convert values to lowercase
            const lowercaseValues = Object.keys(values).reduce((acc: any, key: any) => {
                acc[key] = typeof values[key] === 'string' ? values[key].toLowerCase() : values[key];
                return acc;
            }, {});

            // Combine form values with the uploaded banner image URL
            const data = {
                ...lowercaseValues,
                banner_image: downloadURL,
            };
            const response = await postData('/appBanner/addorupdate', data);
            console.log('API Response:', data);
            setIsLoading(false);
            toast.success('Item created successfully');
            router.push('/app-banners')
        } catch (error) {
            console.error('Error creating Item:', error);
            setIsLoading(false);
            toast.error('Error creating Item');
        }



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