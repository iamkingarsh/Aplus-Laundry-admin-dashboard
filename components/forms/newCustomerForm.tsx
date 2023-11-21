"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../ui/icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"

interface NewCustomerFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function NewCustomerForm({ className, ...props }: NewCustomerFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }
    const form = useForm()
    return (
        <div className={cn("grid gap-6 ", className)} {...props}>
            <form onSubmit={onSubmit} className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid  gap-2">
                        <Label htmlFor="text">
                            Full Name
                        </Label>
                        <Input
                            id="text"
                            placeholder="eg. John Doe"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="fullname"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="eg. john@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="Password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Password">
                            Password
                        </Label>
                        <Input
                            id="Password"
                            placeholder="*******"
                            type="Password"
                            autoCapitalize="none"
                            autoComplete="Password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Password">
                            Mobile No.
                        </Label>
                        <Input
                            id="phoneno"
                            placeholder="eg. +91 9876543210"
                            type="number"
                            autoCapitalize="none"
                            autoComplete="Password"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <Button disabled={isLoading}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Log In with Email
                </Button>
            </form>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}