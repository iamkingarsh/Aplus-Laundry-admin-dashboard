
import { Icons } from '@/components/ui/icons';


export default function CustomerPage({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>Customer {params.slug}</h1>
            <Icons.spinner className="h-6 w-6 animate-spin" />


        </div>

    )
}



