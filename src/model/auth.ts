// Effector
import { createStore, createEvent } from 'effector';

// Type
import { TUser } from '../api/postLogin';

// Login effect api
import { loginFx } from '../api/postLogin';

// Events
export const openAuth = createEvent();
export const closeAuth = createEvent();
export const logout = createEvent();

// Stores
export const $user = createStore<TUser | null>(null)
    .on(loginFx.doneData, (_, data) => data.user)
    .on(logout, () => null)

export const $loginError = createStore<string | null>(null)
    .on(loginFx.failData, (_, error) => error.message)
    .reset(loginFx, closeAuth)

export const $isAuthOpen = createStore(false) 

export const $isLoggedIn = $user.map(user => user !== null)

$isAuthOpen
    .on(openAuth, () => true) // when open - true 
    .on(closeAuth, () => false) // when close - false
    .on(loginFx.done, () => false) // when logined - false (close)