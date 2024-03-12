import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGlobalModal } from '@/hooks/GlobalModal'
import { OrdersStatuses } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import React from 'react'

interface Props {
    data: any
}

export const OrderStatusChanger: React.FC<Props> = ({ data }) => {
    const [currentStatus, setCurrentStatus] = React.useState(data.status)
    const modal = useGlobalModal()
    return (
        <>
            <span
                {currentStatus === "captured" ? "Payment Successful" : "Payment Failed"}
        </>
    )
}


