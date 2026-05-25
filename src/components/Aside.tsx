import { cn } from "../lib/utils";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

import { google } from 'calendar-link'

import { $event } from "../model/event";

import { useUnit } from "effector-react";

type TCalendarEvent = {
    title: string,
    start: string,
    uid?: string,
    description?: string,
    end?: string,
    location?: string,
}

type TAsideProps = {
    className: string
}

export const Aside = ({ className }: TAsideProps) => {

    const event = useUnit($event);

    // set event data to calendar link 
    const calendarEvent = {
        uid: event?.eventId,
        title: event?.namePub,
        description: event?.description,
        start: event?.dateFrom,
        end: event?.dateTo,
        location: event?.place,
    } as TCalendarEvent

    const googleUrl = google(calendarEvent)

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

    return (
        <aside className={cn("w-full max-w-sm [@media(max-width:768px)]:max-w-full bg-gray-100 rounded-md shadow-sm p-3 flex flex-col gap-2", className)}>

            <div className="bg-zinc-100 rounded-md h-50" >
                <img src={event?.headerImageUrl} alt={event?.namePub} className="w-full h-full object-cover" />
            </div>

            <h1 className="text-xl text-zinc-900 font-semibold">{event?.namePub}</h1>

            <p className="text-sm text-zinc-500">{event?.description}</p>

            <p className="text-sm text-zinc-500">
                {event?.dateFrom ? new Date(event.dateFrom).toLocaleString('cs-CZ') : ''} - {event?.dateTo ? new Date(event.dateTo).toLocaleString('cs-CZ') : ''}
            </p>

            <Button variant="default" className="mt-2 relative">
                <a className="w-full h-full flex items-center justify-center" href={googleUrl} target="_blank" rel="noopener noreferrer">Add to calendar</a>
            </Button>
        </aside>
    )
}