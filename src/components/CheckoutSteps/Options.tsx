import { Button } from '../ui/button'

type TOptionsProps = {
    quantity: number,
    totalPrice: number,
    onLogin: () => void,
    onGuest: () => void
}

export const Options = ({ onLogin, onGuest, quantity, totalPrice }: TOptionsProps) => {
    return (
        <section className='flex flex-col gap-3'>
            <p className="text-sm text-white">You have {quantity} tickets for {totalPrice} Kč.</p>
            <Button onClick={onLogin}>Log In</Button>
            <Button onClick={onGuest} variant='outline' className='text-black'>Continue as guest</Button>
        </section>

    )
}