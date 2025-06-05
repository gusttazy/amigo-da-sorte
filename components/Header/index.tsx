import { Clover, UsersRound } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link
                    href="/"
                    className="text-2xl font-bold flex items-center gap-2"
                >
                    <Clover className="h-6 w-6 text-green-700" />
                    <span className="font-semibold">
                        Amigo da Sorte
                    </span>
                </Link>

                <nav className="flex items-center space-x-4">
                    <Link
                        href="/app/grupos"
                        className="text-foreground text-sm flex items-center gap-2"
                    >
                        <UsersRound className="h-4 w-4" />
                        Meus grupos
                    </Link>

                    <Button asChild variant="outline">
                        <Link href="/app/grupos/novo">
                            Novo grupo
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}