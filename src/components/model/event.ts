import { createStore } from "effector"
import { fetchEventFx } from "../api/fetchEvent";
import type { EventType } from '../api/fetchEvent'

export const $event = createStore<EventType | null>(null)
    .on(fetchEventFx.doneData, (_, data) => data)