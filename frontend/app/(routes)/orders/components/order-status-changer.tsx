"use client"
import instance, { postData } from '@/axiosUtility/api'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGlobalModal } from '@/hooks/GlobalModal'
import { OrdersStatuses } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
    data: any
}

export const OrderStatusChanger: React.FC<Props> = ({ data }) => {
    const [currentStatus, setCurrentStatus] = React.useState(data.status)
    const modal = useGlobalModal()

    const handleStatusChange = async (status: string) => {
        setCurrentStatus(status)
        const response = await instance.put(`/order/${data._id}/status`, { status: status }) as any
        toast.success("Order Status Changed")
        if (response) {
            console.log(response)
        }

    }

    return (
        <>
            <Popover>
                <PopoverTrigger defaultValue={currentStatus} asChild>

                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "gap-2 flex items-center justify-between",
                            !currentStatus && "text-muted-foreground"
                        )}
                    >
                        {currentStatus
                            ? (
                                <>
                                    <div
                                        className={`w-2 h-2 rounded-full ${currentStatus === "Scheduled Pickup" && "bg-yellow-500"
                                            } ${currentStatus === "Picked Up" && "bg-blue-500"
                                            } ${currentStatus === "picked" && "bg-green-500"
                                            } ${currentStatus === "Reached to the hub" && "bg-purple-500"
                                            } ${currentStatus === "Laundry in Process" && "bg-green-500"
                                            } ${currentStatus === "Out for Delivery" && "bg-red-500"
                                            } ${currentStatus === "Delivered" && "bg-blue-500"
                                            }`}
                                    >
                                    </div>
                                    {OrdersStatuses.find(
                                        (data) => data.title === currentStatus
                                    )?.title}
                                    {/* {currentStatus} */}
                                </>
                            )
                            : "Select Order Status"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command >
                        <CommandInput
                            placeholder="Search Order Status..."
                            className="h-9"
                        />
                        <CommandEmpty>No Order Status Found </CommandEmpty>
                        <CommandGroup>
                            {OrdersStatuses.map((data) => (
                                <CommandItem
                                    value={data.title}
                                    key={data.title}
                                    onSelect={() => {
                                        modal.title = "Are you sure you want to change the status?"
                                        modal.description = "This will change the status of the order"
                                        modal.children = <>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" onClick={() => modal.onClose()}>Cancel</Button>
                                                <Button onClick={() => {
                                                    handleStatusChange(data.title)
                                                    modal.onClose()
                                                }}>Change</Button>
                                            </div>
                                        </>
                                        modal.onOpen()

                                    }}
                                    className='flex items-center gap-2'
                                >
                                    {data.title}
                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${data.title === "Scheduled Pickup" && "bg-yellow-500"
                                            } ${data.title === "Picked Up" && "bg-blue-500"
                                            } ${data.title === "picked" && "bg-green-500"
                                            } ${data.title === "Reached to the hub" && "bg-purple-500"
                                            } ${data.title === "Laundry in Process" && "bg-green-500"
                                            } ${data.title === "Out for Delivery" && "bg-red-500"
                                            } ${data.title === "Delivered" && "bg-blue-500"
                                            }`}
                                    />
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            data.title === currentStatus
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}


