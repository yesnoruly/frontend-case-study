import { Button } from "./ui/button";
import { useFetch } from "@/lib/useFetch.ts";

type DataType = {
    eventId: number,
    namePub: string,
    description: string,
    headerImageUrl: string,
    dateFrom: string,
    dateTo: string
};

export const Aside = () => {

    const { data } = useFetch<DataType>('https://nfctron-frontend-seating-case-study-2024.vercel.app/event');

    return (
        <aside className="w-full max-w-sm bg-gray-100 rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event header image placeholder */}
            <div className="bg-zinc-100 rounded-md h-32" >
                <img src={data?.headerImageUrl} alt={data?.namePub} className="w-full h-full object-cover" />
            </div>
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{data?.namePub}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">{data?.description}</p>
            {/* Date From - To */}
            <p className="text-sm text-zinc-500">
                {data?.dateFrom ? new Date(data.dateFrom).toLocaleString('cz-CZ') : ''} - {data?.dateTo ? new Date(data.dateTo).toLocaleString('cz-CZ') : ''}
            </p>
            {/* add to calendar button */}
            <Button variant="secondary">
                Add to calendar
            </Button>
        </aside>
    )
}