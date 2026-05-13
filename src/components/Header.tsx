import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

type HeaderProps = {
    userName?: string,
    userEmail?: string
}

export const Header = (props: HeaderProps) => {

    const isLoggedIn = true;

    return (
        <nav className="sticky bg-gray-100/95 top-0 left-0 right-0 flex justify-center">
            {/* inner content */}
            <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
                {/* application/author image/logo placeholder */}
                <div className="max-w-[250px] w-full flex">
                    <div className="bg-gray-300 rounded-md size-12" />
                </div>
                {/* app/author title/name placeholder */}
                <div className="bg-gray-300 rounded-md h-8 w-[200px]" />
                {/* user menu */}
                <div className="max-w-[250px] w-full flex justify-end">
                    {
                        isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <div className="flex items-center gap-2 z-999">
                                            <Avatar>
                                                <AvatarFallback>{props.userName?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-medium">{props.userName}</span>
                                                <span className="text-xs text-zinc-500">{props.userEmail}</span>
                                            </div>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[250px] bg-gray-200 rounded-md shadow-sm p-2">
                                    <DropdownMenuLabel>{props.userName}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Button variant='ghost'>Logout</Button>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button disabled variant="secondary">
                                Login or register
                            </Button>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}