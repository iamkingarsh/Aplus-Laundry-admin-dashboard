
import { useRouter } from 'next/navigation';

export default function CustomerPage({ params }: { params: { slug: string } }) {
    return <div>{params.slug}</div>
}



