import { createStore, sample } from "effector";

// Effects
import { fetchTicketsFx } from "../api/fetchTickets";
import { fetchEventFx } from "../api/fetchEvent";

// Types
import type { TTicketsResponse } from "../api/fetchTickets";

// Stores
export const $tickets = createStore<TTicketsResponse | null>(null)
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

// when event received -> fetch tickets with his event id
sample({
    clock: fetchEventFx.doneData,
    fn: (event) => event.eventId,
    target: fetchTicketsFx
})