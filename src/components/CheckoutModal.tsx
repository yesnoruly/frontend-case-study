import { Dialog } from '@/components/ui/dialog'

import { Options } from './CheckoutSteps/Options'

import { $isCheckoutOpen, $checkoutStep, openCheckout, closeCheckout } from './model/checkout'

import { useUnit } from 'effector-react'

type CheckoutModalProps = {
    totalTickets?: number,
    totalPrice?: number,
}

export const CheckoutModal = (props: CheckoutModalProps) => {

    const isCheckoutOpen = useUnit($isCheckoutOpen);
    const checkoutStep = useUnit($checkoutStep);

    return (

        <Dialog open={isCheckoutOpen} onOpenChange={open => open ? openCheckout() : closeCheckout()}>

            {/* {checkoutStep === 'options' && <Options />} */}
            {/* {checkoutStep === 'guest' && <Guest />} */}
            {/* {checkoutStep === 'login' && <Login />} */}
            {/* {checkoutStep === 'Payment' && <Payment />} */}
            {/* {checkoutStep === 'Succes' && <Succes />} */}

        </Dialog>

    )
}
