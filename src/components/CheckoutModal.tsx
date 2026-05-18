// UI
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Steps
import { Options } from './CheckoutSteps/Options'
import { Guest, GuestDataTypes } from './CheckoutSteps/Guest'
import { Login } from './CheckoutSteps/Login'
import { Payment } from './CheckoutSteps/Payment'
import { Success } from './CheckoutSteps/Success'
import { Error } from './CheckoutSteps/Error'

// Stores and effects
import { $isCheckoutOpen, $checkoutStep, openCheckout, closeCheckout, setCheckoutStep } from './model/checkout';
import { $cartStore } from './model/cart'
import { createOrderFx } from './model/order'
import { $event } from './api/event'
import { $user, $isLoggedIn, loginFx } from './model/auth'

import { OrderUser as OrderUserTypes } from './model/order'

import { useUnit } from 'effector-react';
import { useState } from 'react';

export const CheckoutModal = () => {

    const isCheckoutOpen = useUnit($isCheckoutOpen);
    const checkoutStep = useUnit($checkoutStep);

    const user = useUnit($user)
    const isLoggedIn = useUnit($isLoggedIn)

    const cartStore = useUnit($cartStore);

    const event = useUnit($event)

    const loginLoading = useUnit(loginFx.pending)

    const [guestData, setGuestData] = useState<GuestDataTypes | null>(null)

    const handleLogin = (email: string, password: string) => {
        loginFx({ email, password })
    }

    const handleGuestContinue = (data: GuestDataTypes) => {
        setGuestData(data)
        setCheckoutStep('payment')
    }

    const handlePay = () => {
        if (!event) return

        const customer = isLoggedIn
            ? { firstName: user!.firstName, lastName: user!.lastName, email: user!.email }
            : guestData as OrderUserTypes;

        createOrderFx({
            eventId: event.eventId,
            tickets: cartStore.inCart.map(item => ({
                ticketTypeId: item.ticketTypeId,
                seatId: item.seatId,
            })),
            user: customer,
        })
    }

    return (

        <Dialog open={isCheckoutOpen} onOpenChange={open => open ? openCheckout() : closeCheckout()}>
            <DialogContent className='bg-black'>
                <DialogHeader>
                    <DialogTitle>
                        {checkoutStep === 'options' && 'Choose a login option'}
                        {checkoutStep === 'login' && 'Log In'}
                        {checkoutStep === 'guest' && 'Log In as guest'}
                        {checkoutStep === 'payment' && 'Payment information'}
                        {checkoutStep === 'success' && 'DONE!'}
                        {checkoutStep === 'error' && 'Oops...'}
                    </DialogTitle>
                </DialogHeader>

                {checkoutStep === 'options' && (
                    <Options
                        quantity={cartStore.quantity}
                        totalPrice={cartStore.totalPrice}
                        onLogin={() => setCheckoutStep('login')}
                        onGuest={() => setCheckoutStep('guest')}
                    />
                )}
                {checkoutStep === 'login' && (
                    <Login
                        onBack={() => setCheckoutStep('options')}
                        onSubmit={handleLogin}
                        loading={loginLoading}
                    />
                )}
                {checkoutStep === 'guest' && (
                    <Guest
                        onSubmit={handleGuestContinue}
                        onBack={() => setCheckoutStep('options')}
                    />
                )}
                {checkoutStep === 'payment' && (
                    <Payment
                        onPay={handlePay}
                        totalPrice={cartStore.totalPrice}
                    />
                )}
                {checkoutStep === 'success' && (
                    <Success
                        onClose={closeCheckout}
                    />
                )}
                {checkoutStep === 'error' && (
                    <Error
                        onBack={closeCheckout}
                        onRetry={() => setCheckoutStep('payment')}
                    />
                )}
            </DialogContent>
        </Dialog>

    )
}
