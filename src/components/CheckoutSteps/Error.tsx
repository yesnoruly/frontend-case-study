import { Button } from "../ui/button"

type TErrorProps = {
    onBack: () => void,
    onRetry: () => void,
    message?: string
}

export const Error = ({onBack, onRetry, message}: TErrorProps) => {
    return (
        <div className="flex flex-col gap-3">
            <p>Something went wrong, please try again later</p>
            <p>{message}</p>
            <Button type='button' onClick={() => onBack()}>Back</Button>
            <Button type='button' onClick={() => onRetry()}>Try again</Button>
        </div>
    )
}