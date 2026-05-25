import { createEffect } from "effector"

// Types
export type TUser = {
    firstName: 'string';
    lastName: 'string',
    email: 'string',
}

type TLoginResponse = {
    message: 'string',
    user: TUser;
}

type TLoginInput = {
    email: string,
    password: string,
}

// Post login data
export const loginFx = createEffect<TLoginInput, TLoginResponse>((data) =>
    fetch('https://nfctron-frontend-seating-case-study-2024.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
)