import { createEvent, createStore } from 'effector';

export type TCartItem = {
    seatId: string,
    ticketTypeId: string,
    place: number,
    row: number,
    price: number,
    isVip: boolean,
}

export type TCartStoreType = {
    inCart: TCartItem[],
    totalPrice: number,
    quantity: number,
}

export const $cartStore = createStore<TCartStoreType>({
    inCart: [],
    totalPrice: 0,
    quantity: 0,
})

export const addToCart = createEvent<TCartItem>();
export const removeFromCart = createEvent<TCartItem>();

$cartStore
    .on(addToCart, (cart, newItem) => ({
        inCart: [...cart.inCart, newItem],
        totalPrice: cart.totalPrice + newItem.price,
        quantity: cart.quantity + 1
    }))
    .on(removeFromCart, (cart, itemToRemove) => ({
        inCart: cart.inCart.filter(item => item.seatId !== itemToRemove.seatId),
        totalPrice: cart.totalPrice - itemToRemove.price,
        quantity: cart.quantity - 1
    }))