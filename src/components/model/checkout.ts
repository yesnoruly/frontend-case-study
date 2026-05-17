import { createStore, createEvent, sample } from 'effector'
import { $isLoggedIn, loginFx } from './auth'

import { createOrderFx } from './order'

export type CheckoutStep = 'options' | 'guest' | 'login' | 'payment'  | 'success' | 'error'

export const $isCheckoutOpen = createStore(false)
export const $checkoutStep = createStore<CheckoutStep>('payment');

export const openCheckout = createEvent();
export const closeCheckout = createEvent();
export const setCheckoutStep = createEvent<CheckoutStep>();

$isCheckoutOpen
    .on(openCheckout, () => true)
    .on(closeCheckout, () => false)

$checkoutStep
  .on(setCheckoutStep, (_, step) => step)
  .reset(closeCheckout);


// if user already logged in -> payment step
sample({
    clock: openCheckout,
    source: $isLoggedIn,
    fn: ($isLoggedIn) => $isLoggedIn ? 'payment' : 'options',
    target: $checkoutStep,
})

// after checkout -> to payment step
sample({
    clock: loginFx.done,
    source: $isCheckoutOpen,
    filter: (isOpen) => isOpen,
    fn: () => 'payment' as CheckoutStep,
    target: $checkoutStep
})

// When data is successfully receive -> succes step
sample({
    clock: createOrderFx.done,
    fn: () => 'success' as CheckoutStep,
    target: $checkoutStep,
})

// when fail -> throw error
sample({
    clock: createOrderFx.fail,
    fn: () => 'error' as CheckoutStep,
    target: $checkoutStep,
})