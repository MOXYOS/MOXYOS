import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="fixed top-0 z-50 w-full transition-all duration-300">
            <div className="absolute inset-0 glass bg-background/60 dark:bg-background/40"></div>
            <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <Image
                        src="/icons/logo-long.svg"
                        alt="MOXYOS Logo"
                        width={140}
                        height={40}
                        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                        priority
                    />
                </Link>

                <div className="hidden md:flex items-center flex-1 max-w-md mx-12">
                    <div className="relative w-full group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search businesses..."
                            className="w-full pl-10 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/20 transition-all duration-300 rounded-full"
                        />
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline decoration-wavy underline-offset-4">
                        Explore
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline decoration-wavy underline-offset-4">
                        About
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="font-heading font-semibold hover:bg-secondary/80">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="font-heading font-bold rounded-full px-6 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu (Simplified for now) */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </Button>
                </div>
            </div>
        </header>
    );
}
