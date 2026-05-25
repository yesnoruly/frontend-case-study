import { createStore, createEvent, sample } from 'effector'

// Stores
import { $isLoggedIn } from './auth'

// Effects
import { loginFx } from '../api/postLogin'
import { createOrderFx } from '../api/postOrder'

// Types
export type TCheckoutStep = 'options' | 'guest' | 'login' | 'payment'  | 'success' | 'error' | 'loginError'

// Stores
export const $isCheckoutOpen = createStore(false)
export const $checkoutStep = createStore<TCheckoutStep>('payment');

// Events
export const openCheckout = createEvent();
export const closeCheckout = createEvent();
export const setCheckoutStep = createEvent<TCheckoutStep>();

// Open and close checkout modal
$isCheckoutOpen
    .on(openCheckout, () => true)
    .on(closeCheckout, () => false)

$checkoutStep
  .on(setCheckoutStep, (_, step) => step) // switching checkout steps
  .reset(closeCheckout); // if checkout close reset checkoutStep value


// if user already logged in -> payment step
sample({
    clock: openCheckout,
    source: $isLoggedIn,
    fn: ($isLoggedIn) => $isLoggedIn ? 'payment' : 'options',
    target: $checkoutStep,
})

// after successfull login -> to payment step
sample({
    clock: loginFx.done,
    source: $isCheckoutOpen,
    filter: (isOpen) => isOpen,
    fn: () => 'payment' as TCheckoutStep,
    target: $checkoutStep
})

// When data is successfully sent -> success step
sample({
    clock: createOrderFx.done,
    fn: () => 'success' as TCheckoutStep,
    target: $checkoutStep,
})

// when failed -> throw error step
sample({
    clock: createOrderFx.fail,
    fn: () => 'error' as TCheckoutStep,
    target: $checkoutStep,
})

// when login failed -> throw login error 
sample({
    clock: loginFx.fail,
    fn: () => 'loginError' as TCheckoutStep,
    target: $checkoutStep
})