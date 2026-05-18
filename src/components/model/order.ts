import { createEffect, createStore } from 'effector'

type TOrderTicket = {
    ticketTypeId: string,
    seatId: string
}

export type TOrderUser = {
    email: string,
    firstName: string,
    lastName: string
}

type TOrderInput = {
    eventId: string,
    tickets: TOrderTicket[],
    user: TOrderUser
}

type TOrderResponse = {
    message: string,
    orderId: string,
    totalAmount: number
}

export const createOrderFx = createEffect<TOrderInput, TOrderResponse>(data => 
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
)

export const $orderResult = createStore<TOrderResponse | null>(null)

$orderResult
    .on(createOrderFx.doneData, (_, data) => data)
    .reset(createOrderFx)