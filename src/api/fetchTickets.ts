import { createEffect } from 'effector';

// Types
export type TTicketTypeId = {
    id: string,
    name: string,
    price: number,
}

export type TSeat = {
    seatId: string,
    place: number,
    ticketTypeId: string
}

export type TSeatRow = {
    seatRow: number,
    seats: TSeat[]
}

export type TTicketsResponse = {
    ticketTypes: TTicketTypeId[],
    seatRows: TSeatRow[],
}

// Fetch tickets
export const fetchTicketsFx = createEffect<string, TTicketsResponse>((id: string) => {
    return fetch(`https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${id}`)
        .then(res => res.json())
})