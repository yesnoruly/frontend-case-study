import { createStore, sample } from "effector";

import { fetchTicketsFx } from "../api/fetchTickets";
import { fetchEventFx } from "../api/fetchEvent";

import type { TicketsResponse } from "../api/fetchTickets";

export const $tickets = createStore<TicketsResponse | null>(null)
    .on(fetchTicketsFx.doneData, (_, data) => data)

sample({
    clock: fetchEventFx.doneData,
    fn: (event) => event!.eventId,
    target: fetchTicketsFx
})

export const $vipTicketTypeId = $tickets.map(
    tickets => tickets?.ticketTypes[0]?.id ?? null
)

export const $ticketPrice = $tickets.map(
    tickets => ({
        vipPrice: tickets?.ticketTypes[0]?.price ?? null,
        regularPrice: tickets?.ticketTypes[1]?.price ?? null
    })
)