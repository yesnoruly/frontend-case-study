import { createEffect, createStore} from 'effector';

export type DataType = {
    eventId: number,
    namePub: string,
    description: string,
    headerImageUrl: string,
    dateFrom: string,
    dateTo: string
};

export const fetchEventFx = createEffect<void, DataType>(() => {
    return fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/event').then(res => res.json());
})

export const $event = createStore<DataType | null>(null)
    .on(fetchEventFx.doneData, (_, data) => data)