import { createEffect, createStore } from 'effector';

export type EventType = {
    eventId: string,
    namePub: string,
    description: string,
    headerImageUrl: string,
    dateFrom: string,
    dateTo: string
};

export const fetchEventFx = createEffect<void, EventType>(() => {
    return fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/event').then(res => res.json());
})

export const $event = createStore<EventType | null>(null)
    .on(fetchEventFx.doneData, (_, data) => data)

fetchEventFx();