import { Button } from "./ui/button";

import { Checkout } from "./Checkout";
import { openCheckout } from "../model/checkout";

type TNavProps = {
    totalTickets?: number,
    totalPrice?: number
}

export const Nav = ({totalTickets, totalPrice}: TNavProps) => {
    return (
        <nav className="bg-gray-100 text-black flex justify-center">

            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">

                <div className="flex flex-col">
                    <span>Total for {totalTickets} tickets</span>
                    <span className="text-2xl font-semibold">{totalPrice || 0} CZK</span>
                </div>

                <Button variant="default" onClick={() => openCheckout()} disabled={totalTickets === 0}>
                    Checkout now
                </Button>
            </div>

            <Checkout />
        </nav>
    )
}