import { Button } from "./ui/button";

import { Checkout } from "./Checkout";
import { openCheckout } from "./model/checkout";

type TNavProps = {
    totalTickets?: number,
    totalPrice?: number
}

export const Nav = (props: TNavProps) => {
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

            <Checkout />
        </nav>
    )
}