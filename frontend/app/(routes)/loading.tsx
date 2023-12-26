import { Icons } from "@/components/ui/icons";



const Loading = () => {

    return (
        <>
            <div className="flex justify-center items-center w-full h-full">
                <Icons.spinner className="h-8 w-6 animate-spin" />
            </div>
        </>
    );
}

export default Loading;