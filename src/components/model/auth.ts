import { createEffect, createStore, createEvent } from 'effector';

type TLoginInput = {
    email: string,
    password: string,
}

type TUser = {
    firstName: 'string';
    lastName: 'string',
    email: 'string',
}

type TLoginResponse = {
    message: 'string',
    user: TUser;
}

export const loginFx = createEffect<TLoginInput, TLoginResponse>((data) => 
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json())
)

export const logout = createEvent();

export const $user = createStore<TUser | null>(null)
    .on(loginFx.doneData, (_, data) => data.user)
    .on(logout, () => null)   

export const $isLoggedIn = $user.map(user => user !== null)

export const $isAuthOpen = createStore(false)

export const openAuth = createEvent();
export const closeAuth = createEvent();

$isAuthOpen 
    .on(openAuth, () => true)
    .on(closeAuth, () => false)
    .on(loginFx.done, () => false)