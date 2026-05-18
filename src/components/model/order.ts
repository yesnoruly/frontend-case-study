import { createStore } from 'effector'

import type {TOrderResponse } from '../api/postOrder';

import { createOrderFx } from '../api/postOrder';

export const $orderResult = createStore<TOrderResponse | null>(null)

$orderResult
    .on(createOrderFx.doneData, (_, data) => data)
    .reset(createOrderFx)