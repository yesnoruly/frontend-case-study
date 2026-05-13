import { createEffect, createStore, sample } from 'effector';
import { fetchEventFx } from './event.ts';

export type TicketType = {
    id: string,
    name: string,
    price: number,
}

export type Seat = {
    id: string,
    place: number,
    ticketTypeId: string
}

export type SeatRow = {
    seatRow: number,
    seats: Seat[]
}

export type TicketsResponse = {
    ticketTypes: TicketType[],
    seatRows: SeatRow[],
}

export const fetchTicketsFx = createEffect<string, TicketsResponse>((id: string) => {
    return fetch(`https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${id}`).then(res => res.json())
})

export const $tickets = createStore<TicketsResponse | null>(null)
    .on(fetchTicketsFx.doneData, (_, data) => data)

export const $vipTicketTypeId = $tickets.map(
    tickets => tickets?.ticketTypes[0]?.id ?? null
)

export const $ticketPrice = $tickets.map(
    tickets => ({
        vipPrice: tickets?.ticketTypes[0]?.price ?? null,
        regularPrice: tickets?.ticketTypes[1]?.price ?? null
    })
)

sample({
    clock: fetchEventFx.doneData,
    fn: (event) => event!.eventId,
    target: fetchTicketsFx
})