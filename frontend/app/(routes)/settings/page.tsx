import { ProfileForm } from '@/components/forms/profileForm'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function page() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Edit your profile  information. Your profile is never shown publicly.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
