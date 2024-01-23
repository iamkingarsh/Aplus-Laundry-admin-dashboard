"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import toast, { Toast } from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Upload } from "lucide-react"
import { storage } from "@/lib/firebase"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react"
import { postData } from "@/axiosUtility/api"
import { useRouter } from "next/navigation"
import { Icons } from "../ui/icons"


const profileFormSchema = z.object({
    profilepic: z.string(),
    FullName: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),


})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    profilepic: "",
    FullName: "",
    email: "",
}

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const [currentUserData, setCurrentUserData] = useState(null as any)
    const getCurrentData = async () => {

        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;

            const result = await postData('/auth/currentuser',
                {
                    token: token
                }
            ); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result.user)
            setCurrentUserData(result.user)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getCurrentData()
    }, [])

    const [profilepic, setProfilepic] = useState<string | null>(null)
    const [profilepicUrl, setProfilepicUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const uploadImageToFirebase = async (file: any) => {
        try {
            const storageRef = ref(storage, `profile-pics/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('File available at', downloadURL);
            setProfilepicUrl(downloadURL)
            form.setValue('profilepic', downloadURL);
            toast.success('Profile Picture added successfully!');
            return downloadURL;
        } catch (error) {
            console.log('Error in uploadImageToFirebase:', error);
        }
    };



    async function onSubmit(data: ProfileFormValues) {
        setLoading(true)
        if (profilepic !== form.watch('profilepic')) {
            uploadImageToFirebase(profilepic);
        }
        try {
            if (
                currentUserData?.profileImg !== profilepicUrl ||
                currentUserData?.fullName !== form.getValues('FullName') ||
                currentUserData?.email !== form.getValues('email')
            ) {
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)AplusToken\s*=\s*([^;]*).*$)|^.*$/, '$1') as string;

                const result = await postData('/auth/register',
                    {
                        token: token,
                        profileImg: profilepicUrl,
                        fullName: form.getValues('FullName'),
                        email: form.getValues('email')
                    }
                );
                router.refresh()
                toast.success("Profile updated.")

                console.log('result resukt', result);
                setCurrentUserData(result.user)
                setLoading(false)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }




    }

    useEffect(() => {
        form.reset({
            profilepic: currentUserData?.profileImg,
            FullName: currentUserData?.fullName,
            email: currentUserData?.email,
        })
    }, [currentUserData])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="profilepic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                {/* <Input type="file" {...field} /> */}
                                <div className="flex gap-4 items-center">
                                    <Avatar className='w-12 h-12'>
                                        <AvatarImage src={form.watch('profilepic')} alt="@shadcn" />
                                        <AvatarFallback>{form.watch('FullName')?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        onClick={() => {
                                            document.getElementById('upload')?.click();

                                        }}
                                        className='flex gap-4' size='default' variant="ghost" type='button'>Change <Upload className='w-4' />
                                    </Button>
                                    <Input
                                        onChange={(e: any) => {
                                            const file = e.target.files[0];
                                            console.log('env file', process.env.FIREBASE_STORAGE_BUCKET);
                                            setProfilepic(file);
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (event: any) => {
                                                    const imageUrl = event.target.result;
                                                    form.setValue('profilepic', imageUrl);
                                                    console.log(imageUrl);

                                                };

                                                reader.readAsDataURL(file); // change the logic during backend integration, use cloudinary
                                            }
                                        }}
                                        id="upload"
                                        className="hidden"
                                        disabled={loading}
                                        hidden
                                        type="file"
                                    />


                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="FullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="shadcn" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl >
                                <Input {...field} disabled placeholder="example@example.com " />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">
                    {loading &&
                        <Icons.spinner className='w-4 h-4 animate-spin' />
                    }
                    Update profile</Button>
            </form>
        </Form>
    )
}