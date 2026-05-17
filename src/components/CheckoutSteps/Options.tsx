import { Button } from '../ui/button'

type OptionsProps = {
    quantity: number,
    totalPrice: number,
    onLogin: () => void,
    onGuest: () => void
}

export const Options = ({ onLogin, onGuest, quantity, totalPrice }: OptionsProps) => {
    return (
        <section className='flex flex-col gap-3'>
            <p className="text-sm text-zinc-500">You have {quantity} tickets for {totalPrice} Kc.</p>
            <Button onClick={onLogin}></Button>
            <Button onClick={onGuest} variant='outline'>Continue as guest</Button>
        </section>

    )
}