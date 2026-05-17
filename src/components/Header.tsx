import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Dialog } from '@/components/ui/dialog'
import { Button } from "./ui/button";

import { useUnit } from 'effector-react'

import { $isLoggedIn, $user, logout, $isAuthOpen, openAuth, closeAuth } from "./model/auth";

import { LoginForm } from './LoginForm';

export const Header = () => {

    const isOpen = useUnit($isAuthOpen)
    const isLoggedIn = useUnit($isLoggedIn);
    const user = useUnit($user);
    
    const username = [user?.firstName, user?.lastName].filter(Boolean).join(' ');


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
                                                <AvatarFallback>{username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col text-left">
                                                <span className="text-sm font-medium">{username}</span>
                                                <span className="text-xs text-zinc-500">{user?.email}</span>
                                            </div>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[250px] bg-gray-200 rounded-md shadow-sm p-2">
                                    <DropdownMenuLabel>{username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Button onClick={() => logout()} variant='ghost'>Logout</Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="secondary" onClick={() => openAuth()}>
                                Login or register
                            </Button>
                        )
                    }
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={open => open ? openAuth() : closeAuth()} >

                <LoginForm />

            </Dialog >
        </nav>
    )
}