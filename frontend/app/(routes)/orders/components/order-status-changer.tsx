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
            <Popover>
                <PopoverTrigger defaultValue={currentStatus} asChild>

                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-[90%] gap-2 flex items-center justify-between",
                            !currentStatus && "text-muted-foreground"
                        )}
                    >
                        {currentStatus
                            ? (
                                <>
                                    {OrdersStatuses.find(
                                        (data) => data.title === currentStatus
                                    )?.title}

                                    <div
                                        className={`w-2 h-2 rounded-full mr-2 ${currentStatus === "onhold" && "bg-yellow-500"
                                            } ${currentStatus === "pending" && "bg-blue-500"
                                            } ${currentStatus === "picked" && "bg-green-500"
                                            } ${currentStatus === "onway" && "bg-purple-500"
                                            } ${currentStatus === "delivered" && "bg-green-500"
                                            } ${currentStatus === "cancelled" && "bg-red-500"
                                            }`}
                                    />
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
                                                    setCurrentStatus(data.title)
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
                                        className={`w-2 h-2 rounded-full mr-2 ${data.title === "onhold" && "bg-yellow-500"
                                            } ${data.title === "pending" && "bg-blue-500"
                                            } ${data.title === "picked" && "bg-green-500"
                                            } ${data.title === "onway" && "bg-purple-500"
                                            } ${data.title === "delivered" && "bg-green-500"
                                            } ${data.title === "cancelled" && "bg-red-500"
                                            } ${data.title === "processing" && "bg-blue-500"
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


