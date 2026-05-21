import { createStore } from "effector"

// Fetch event effect
import { fetchEventFx } from "../api/fetchEvent";

// Types
import type { EventType } from '../api/fetchEvent'

// Event store
export const $event = createStore<EventType | null>(null)
    .on(fetchEventFx.doneData, (_, data) => data)