import { createEffect, createStore, sample } from 'effector';
import { fetchEventFx } from './event.ts';

export type TicketTypeId = {
    id: string,
    name: string,
    price: number,
}

export type Seat = {
    seatId: string,
    place: number,
    ticketTypeId: string
}

export type SeatRow = {
    seatRow: number,
    seats: Seat[]
}

export type TicketsResponse = {
    ticketTypes: TicketTypeId[],
    seatRows: SeatRow[],
}

export const fetchTicketsFx = createEffect<string, TicketsResponse>((id: string) => {
    return fetch(`https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${id}`).then(res => res.json())
})

export const $tickets = createStore<TicketsResponse | null>(null)
    .on(fetchTicketsFx.doneData, (_, data) => data)

sample({
    clock: fetchEventFx.doneData,
    fn: (event) => event!.eventId,
    target: fetchTicketsFx
})