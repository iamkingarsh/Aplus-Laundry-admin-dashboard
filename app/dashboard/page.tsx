import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'


export default function page() {

    return (
        <div className='w-full h-full flex p-6 flex-row'>
            <div className="topbar w-full flex justify-between">
                <Heading title='Dashboard' />
                <Button variant='default'>Create New Order</Button>
            </div>

        </div>
    )
}
