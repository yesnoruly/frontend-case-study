import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { google } from 'calendar-link'

import { $event } from "./model/event";

import { useUnit } from "effector-react";

type TCalendarEvent = {
    title: string,
    start: string,
    uid?: string,
    description?: string,
    end?: string,
    location?: string,
}

export const Aside = () => {

    const event = useUnit($event);

    // Skeleton
    if (!event) {
        return (
            <aside className="w-full max-w-sm bg-gray-100 rounded-md shadow-sm p-3 flex flex-col gap-2">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </aside>
        )
    }

    const calendarEvent = {
        uid: event?.eventId,
        title: event?.namePub,
        description: event?.description,
        start: event?.dateFrom,
        end: event?.dateTo,
        location: event?.place,
    } as TCalendarEvent

    const googleUrl = google(calendarEvent)

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
            <Button variant="default" className="mt-2">
                <a href={googleUrl} target="_blank" rel="noopener noreferrer">Add to calendar</a>
            </Button>
        </aside>
    )
}