import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/10 bg-black/95 backdrop-blur-xl">
                            <SheetHeader className="mb-8 text-left">
                                <SheetTitle className="text-white flex items-center gap-2">
                                    <span className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
                                        <Image
                                            src="/icon.svg"
                                            alt="Logo"
                                            width={24}
                                            height={24}
                                            className="w-6 h-6"
                                        />
                                    </span>
                                    Menu
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    <Link href="/explore" className="text-lg font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                        Explore
                                    </Link>
                                    <Link href="/about" className="text-lg font-medium text-white/80 hover:text-white transition-colors flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                        About
                                    </Link>
                                </div>

                                <div className="h-px bg-white/10 my-2"></div>

                                <div className="flex flex-col gap-3">
                                    <Link href="/login" className="w-full">
                                        <Button variant="outline" className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/10 text-white font-heading">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="w-full">
                                        <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold shadow-lg shadow-primary/20">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
