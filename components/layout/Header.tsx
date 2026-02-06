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
                            <Button variant="outline" size="icon" className="border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 rounded-full w-10 h-10 transition-all duration-300">
                                <Menu className="h-5 w-5 text-primary" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-white/20 bg-white/80 backdrop-blur-3xl shadow-2xl p-6">
                            <SheetHeader className="mb-8 text-left">
                                <SheetTitle className="flex items-center gap-3">
                                    <span className="bg-primary/10 p-2 rounded-xl border border-primary/10 shadow-sm">
                                        <Image
                                            src="/icons/logo-short.svg"
                                            alt="Logo"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8"
                                        />
                                    </span>
                                    <span className="font-heading font-bold text-2xl text-primary tracking-tight">MOXYOS</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <Link href="/explore" className="text-xl font-bold text-gray-800 hover:text-primary transition-colors flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 group">
                                        Explore
                                        <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
                                    </Link>
                                    <Link href="/about" className="text-xl font-bold text-gray-800 hover:text-primary transition-colors flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 group">
                                        About
                                        <span className="text-gray-300 group-hover:text-primary transition-colors">→</span>
                                    </Link>
                                </div>

                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>

                                <div className="flex flex-col gap-3">
                                    <Link href="/login" className="w-full">
                                        <Button variant="outline" className="w-full justify-center h-12 text-base border-gray-200 bg-white hover:bg-gray-50 text-gray-900 font-heading font-semibold rounded-xl shadow-sm">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="w-full">
                                        <Button className="w-full justify-center h-12 text-base bg-primary hover:bg-primary/90 text-white font-heading font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
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
