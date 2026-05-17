import { Button } from "./ui/button";

import { CheckoutModal } from "./CheckoutModal";
import { openCheckout } from "./model/checkout";

type NavProps = {
    totalTickets?: number,
    totalPrice?: number
}

export const Nav = (props: NavProps) => {
    return (
        <nav className="bg-gray-100 text-black flex justify-center"> 
            {/* inner content */}
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <div className="flex flex-col">
                    <span>Total for {props.totalTickets} tickets</span>
                    <span className="text-2xl font-semibold">{props.totalPrice || 0} CZK</span>
                </div>

                {/* checkout button */}
                <Button variant="default" onClick={() => openCheckout()} disabled={props.totalTickets === 0}>
                    Checkout now
                </Button>
            </div>

            <CheckoutModal />
        </nav>
    )
}