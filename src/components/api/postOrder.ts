import { createEffect } from "effector"

// Types
export type TOrderTicket = {
    ticketTypeId: string,
    seatId: string
}

export type TOrderUser = {
    email: string,
    firstName: string,
    lastName: string
}

export type TOrderInput = {
    eventId: string,
    tickets: TOrderTicket[],
    user: TOrderUser
}

export type TOrderResponse = {
    message: string,
    orderId: string,
    totalAmount: number,
    tickets: TOrderTicket,
    user: TOrderUser
}

// Post order effect
export const createOrderFx = createEffect<TOrderInput, TOrderResponse>(data =>
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
)