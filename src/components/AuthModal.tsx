import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'

import { useUnit } from 'effector-react';
import { useState } from 'react';

import { loginFx, $isAuthOpen, closeAuth, openAuth } from './model/auth'

export const AuthModal = () => {
    const isOpen = useUnit($isAuthOpen);
    const loading = useUnit(loginFx.pending)

    const [email, setEmail] = useState('frontend@nfctron.com')
    const [password, setPassword] = useState('Nfctron2025')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginFx({ email, password })
    }

    return (
        <Dialog open={isOpen} onOpenChange={open => open ? openAuth() : closeAuth()} >

            <DialogContent className='bg-black'>

                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>Enter please your email and password</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleLogin} className='flex flex-col gap-3 mt-4'>
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
                </form>

        </DialogContent>

        </Dialog >
    )
}

