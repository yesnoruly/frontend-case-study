import { createEvent, createStore } from 'effector';

// Types
export type TCartItem = {
    seatId: string,
    ticketTypeId: string,
    place: number,
    row: number,
    price: number,
    isVip: boolean,
}

export type TCart = {
    inCart: TCartItem[],
    totalPrice: number,
    quantity: number,
}

// Stores
export const $cart = createStore<TCart>({
    inCart: [],
    totalPrice: 0,
    quantity: 0,
})

// Events
export const addToCart = createEvent<TCartItem>();
export const removeFromCart = createEvent<TCartItem>();

$cart
    .on(addToCart, (cart, newItem) => ({
        inCart: [...cart.inCart, newItem], // add a new ticket
        totalPrice: cart.totalPrice + newItem.price, // total ticket price
        quantity: cart.quantity + 1 // increase quantity
    }))
    .on(removeFromCart, (cart, itemToRemove) => ({
        inCart: cart.inCart.filter(item => item.seatId !== itemToRemove.seatId), // remove selected item
        totalPrice: cart.totalPrice - itemToRemove.price, // remove price of that ticket
        quantity: cart.quantity - 1 // decrease quantity
    }))