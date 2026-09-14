"use client";

import { AuthClient } from "@/auth/auth-client";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavProfile() {
    const router = useRouter();
    const { isPending, data } = AuthClient.useSession();
    return (
        <>
            {isPending ? (
                <div className="flex items-center gap-2 rounded-full p-2 border border-neutral-800">
                    <Skeleton className="size-8 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            ) : (
                <>
                    {data === null ? (
                        <Link href="/account/signup">
                            <Button>Get Started</Button>
                        </Link>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <NavigationMenuItem className="cursor-pointer">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    data?.user.image ||
                                                    undefined
                                                }
                                            />
                                            <AvatarFallback>
                                                {data?.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                            {!data?.user.emailVerified && (
                                                <AvatarBadge className="bg-red-600" />
                                            )}
                                        </Avatar>
                                        {data?.user.name}
                                    </NavigationMenuItem>
                                }
                                className="flex gap-2 justify-center items-center"
                            />
                            <DropdownMenuContent className="p-4 mt-2 z-300 flex flex-col justify-center items-center">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            router.push("/account/edit");
                                        }}
                                        className="flex justify-center items-center"
                                    >
                                        {data?.user.email}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            router.push("/account/dashboard");
                                        }}
                                        className="w-full"
                                    >
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="mt-2"
                                        onClick={() => {
                                            AuthClient.signOut();
                                        }}
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </>
            )}
        </>
    );
}
