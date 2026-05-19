import { Button } from "../ui/button"

type InCart = {
    place: number,
    row: number,
    price: number,
}

type TSuccessProps = {
    onClose: () => void,
    firstName: string,
    lastName: string,
    email: string,
    totalPrice: number,
    quantity: number,
    inCart: InCart[]
}

export const Success = ({ onClose, firstName, lastName, email, totalPrice, quantity, inCart }: TSuccessProps) => {
    return (
        <div className="text-center flex flex-col gap-3">
            <p className="text-sm pt-4">Full name: {firstName} {lastName}</p>
            <p className="text-sm">Email: {email}</p>
            <p className="text-sm">{inCart.length > 1 ? 'Your tickets' : 'Your ticket'}</p>
            <ul>
                {inCart.map(item => {
                    return (
                        <li key={`${item.row}-${item.place}`} className="text-sm">
                            row {item.row}, place {item.place} for {item.price} Kč
                        </li>
                    )
                })}
            </ul>
            <p className="text-sm">Total seats: {quantity}</p>
            <p className="text-sm">Total price: {totalPrice}</p>
            <Button onClick={onClose}>Close</Button>
        </div>
    )
}