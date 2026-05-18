import { createStore, createEvent } from 'effector';

import type { TUser } from '../api/postLogin';

import { loginFx } from '../api/postLogin';

export const openAuth = createEvent();
export const closeAuth = createEvent();
export const logout = createEvent();

export const $user = createStore<TUser | null>(null)
    .on(loginFx.doneData, (_, data) => data.user)
    .on(logout, () => null)

export const $isAuthOpen = createStore(false)

export const $isLoggedIn = $user.map(user => user !== null)


$isAuthOpen
    .on(openAuth, () => true)
    .on(closeAuth, () => false)
    .on(loginFx.done, () => false)