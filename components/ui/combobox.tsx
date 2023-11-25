"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BrandName } from "@/lib/constants"

const stores = [
    {
        value: BrandName,
        label: BrandName,
    },

]

export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(BrandName)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <Store className="w-4" />
                    {value
                        ? stores.find((store) => store.value === value)?.label
                        : "Select Stores"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Stores..." />
                    <CommandEmpty>No Stores found.</CommandEmpty>
                    <CommandGroup>
                        {stores.map((store) => (
                            <CommandItem
                                key={store.value}
                                value={store.value}
                                onSelect={(currentValue: any) => {
                                    setValue(currentValue === value ? "" : store.value)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === store.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {store.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
