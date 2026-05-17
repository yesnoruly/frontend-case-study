import { Button } from "../ui/button"

type SuccessProps = {
    onClose: () => void
}

export const Success = ({onClose}: SuccessProps) => {
    return (
        <div className="text-center flex flex-col gap-3">
            <p className="text-lg">Your order is ready</p>
            <Button onClick={onClose}>Close</Button>
        </div>
    )
}