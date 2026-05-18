import { useState } from 'react'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type TLoginProps = {
    onSubmit: (email: string, password: string) => void,
    onBack: () => void,
    loading?: boolean
}

export const Login = ({ onBack, onSubmit, loading }: TLoginProps) => {

    const [email, setEmail] = useState('frontend@nfctron.com');
    const [password, setPassword] = useState('Nfctron2025');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <Input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type='submit' disabled={loading}>
                {loading ? 'Loading' : 'Login'}
            </Button>
            <Button type='button' variant='ghost' onClick={onBack}>
                Back
            </Button>
        </form>
    )
}