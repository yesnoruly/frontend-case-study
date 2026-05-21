import { createEffect } from 'effector';

// Types
export type EventType = {
    eventId: string,
    namePub: string,
    description: string,
    headerImageUrl: string,
    dateFrom: string,
    dateTo: string,
    place?: string
};

// Fetch event
export const fetchEventFx = createEffect<void, EventType>(() => {
    return fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/event')
        .then(res => res.json());
})

// Call on the first render
fetchEventFx();