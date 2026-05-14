import { $tickets } from '../api/tickets.ts';

export const $vipTicketTypeId = $tickets.map(
    tickets => tickets?.ticketTypes[0]?.id ?? null
)

export const $ticketPrice = $tickets.map(
    tickets => ({
        vipPrice: tickets?.ticketTypes[0]?.price ?? null,
        regularPrice: tickets?.ticketTypes[1]?.price ?? null
    })
)