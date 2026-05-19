// UI
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Steps
import { Options } from './CheckoutSteps/Options'
import { Guest, TAsGuest } from './CheckoutSteps/Guest'
import { Login } from './CheckoutSteps/Login'
import { Payment } from './CheckoutSteps/Payment'
import { Success } from './CheckoutSteps/Success'
import { Error } from './CheckoutSteps/Error'

// Stores
import { $isCheckoutOpen, $checkoutStep, openCheckout, closeCheckout, setCheckoutStep } from './model/checkout';
import { $cart } from './model/cart'
import { $event } from './model/event'
import { $user, $isLoggedIn } from './model/auth'

// Effects
import { createOrderFx } from './api/postOrder'
import { loginFx } from './api/postLogin'

// Types
import { TOrderUser } from './api/postOrder'

// Utils
import { useUnit } from 'effector-react';
import { useState } from 'react';

export const Checkout = () => {

    const isCheckoutOpen = useUnit($isCheckoutOpen);
    const checkoutStep = useUnit($checkoutStep);

    const user = useUnit($user)
    const isLoggedIn = useUnit($isLoggedIn)

    const cart = useUnit($cart);

    const event = useUnit($event)

    const loginLoading = useUnit(loginFx.pending)

    const [asGuest, setAsGuest] = useState<TAsGuest | null>(null)

    const handleLogin = (email: string, password: string) => {
        loginFx({ email, password })
    }

    const handleGuestContinue = (data: TAsGuest) => {
        setAsGuest(data)
        setCheckoutStep('payment')
    }

    const handlePay = () => {
        if (!event) return

        const customer = isLoggedIn
            ? { firstName: user!.firstName, lastName: user!.lastName, email: user!.email }
            : asGuest as TOrderUser;

        createOrderFx({
            eventId: event.eventId,
            tickets: cart.inCart.map(item => ({
                ticketTypeId: item.ticketTypeId,
                seatId: item.seatId,
            })),
            user: customer,
        })
    }

    return (

        <Dialog open={isCheckoutOpen} onOpenChange={open => open ? openCheckout() : closeCheckout()}>
            <DialogContent className='bg-black'>
                <DialogHeader className='items-center'>
                    <DialogTitle>
                        {checkoutStep === 'options' && 'Choose a login option'}
                        {checkoutStep === 'login' && 'Log In'}
                        {checkoutStep === 'guest' && 'Log In as guest'}
                        {checkoutStep === 'payment' && 'Payment information'}
                        {checkoutStep === 'success' && 'The payment was successful!'}
                        {checkoutStep === 'error' && 'Oops...'}
                    </DialogTitle>
                </DialogHeader>

                {checkoutStep === 'options' && (
                    <Options
                        quantity={cart.quantity}
                        totalPrice={cart.totalPrice}
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
                        totalPrice={cart.totalPrice}
                    />
                )}
                {checkoutStep === 'success' && (
                    <Success
                        onClose={closeCheckout}
                        inCart={cart.inCart}
                        firstName={user?.firstName || asGuest?.firstName || ''}
                        lastName={user?.lastName || asGuest?.lastName || ''}
                        email={user?.email || asGuest?.email || ''}
                        totalPrice={cart.totalPrice}
                        quantity={cart.quantity}
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
