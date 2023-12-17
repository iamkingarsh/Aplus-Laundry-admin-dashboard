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
    profilepic: "https://github.com/shadcn.png",
    FullName: "Arshad",
    email: "contact@mohammedarshad.com",
}

export function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })




    function onSubmit(data: ProfileFormValues) {


        toast.success("Profile updated.")
    }

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
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>{defaultValues.FullName?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        onClick={() => {
                                            document.getElementById('upload')?.click()
                                        }}
                                        className='flex gap-4' size='default' variant="ghost" type='button'>Change <Upload className='w-4' />
                                    </Button>
                                    <Input id="upload" className="hidden" hidden type="file" />

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
                                <Input placeholder="shadcn" {...field} />
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
                                <Input disabled placeholder="example@example.com " />
                            </FormControl>


                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}