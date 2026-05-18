import { Button } from "./ui/button";
import { $event } from "./model/event";
import { useUnit } from "effector-react";

export const Aside = () => {

    const event = useUnit($event); 

    return (
        <aside className="w-full max-w-sm bg-gray-100 rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event header image placeholder */}
            <div className="bg-zinc-100 rounded-md h-32" >
                <img src={event?.headerImageUrl} alt={event?.namePub} className="w-full h-full object-cover" />
            </div>
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{event?.namePub}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">{event?.description}</p>
            {/* Date From - To */}
            <p className="text-sm text-zinc-500">
                {event?.dateFrom ? new Date(event.dateFrom).toLocaleString('cs-CZ') : ''} - {event?.dateTo ? new Date(event.dateTo).toLocaleString('cs-CZ') : ''}
            </p>
            {/* add to calendar button */}
            <Button variant="secondary">
                Add to calendar
            </Button>
        </aside>
    )
}