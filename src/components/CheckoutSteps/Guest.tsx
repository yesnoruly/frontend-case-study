import { useState } from 'react';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export type TGuestData = {
    firstName: string,
    lastName: string,
    email: string
}

type TGuestProps = {
    onSubmit: (data: TGuestData) => void,
    onBack: () => void
}

export const Guest = ({ onSubmit, onBack }: TGuestProps) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({firstName, lastName, email} )
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <Input
                placeholder='First name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            />
            <Input
                placeholder='Last name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
            />
            <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <Button type='submit'>Pay</Button>
            <Button type='button' variant='ghost' onClick={onBack}>Back</Button>
        </form>
    )
}