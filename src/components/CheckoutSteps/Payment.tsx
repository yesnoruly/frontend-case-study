import { Button } from '@/components/ui/button';

import { useState } from 'react'

type TPaymentProps = {
    onPay: () => void,
    totalPrice: number
}

export const Payment = ({ onPay, totalPrice }: TPaymentProps) => {

    const [loading, setLoading] = useState(false);

    const handaleClick = () => {
        setLoading(true)
        setTimeout(() => {
            onPay()
        }, 2000)
    }

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500">
                Total due <span className="font-bold">{totalPrice} Kč</span>
            </p>
            <Button onClick={handaleClick} disabled={loading}>
                {loading ? 'Loading' : 'Pay'}
            </Button>
        </div>
    )
}