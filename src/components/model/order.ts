import { createStore } from 'effector'

// Types
import type {TOrderResponse } from '../api/postOrder';

// Post order data 
import { createOrderFx } from '../api/postOrder';

// Event
import { closeCheckout } from './checkout';

// Stores
export const $orderResult = createStore<TOrderResponse | null>(null)

export const $orderError = createStore<string | null>(null)

// Stores processing
$orderResult
    .on(createOrderFx.doneData, (_, data) => data)
    .reset(createOrderFx)

$orderError
    .on(createOrderFx.failData, (_, error) => error.message)
    .reset(createOrderFx, closeCheckout)