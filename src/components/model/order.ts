import { createEffect, createStore } from 'effector'

type OrderTicket = {
    ticketTypeId: string,
    seatId: string
}

export type OrderUser = {
    email: string,
    firstName: string,
    lastName: string
}

type OrderInput = {
    eventId: string,
    tickets: OrderTicket[],
    user: OrderUser
}

type OrderResponse = {
    message: string,
    orderId: string,
    totalAmount: number
}

export const createOrderFx = createEffect<OrderInput, OrderResponse>(data => 
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
)

export const $orderResult = createStore<OrderResponse | null>(null)

$orderResult
    .on(createOrderFx.doneData, (_, data) => data)
    .reset(createOrderFx)