import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Info } from "lucide-react";

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
                        <Link href="/login" className="flex items-center space-x-2 group">
                            <Button variant="ghost" className="font-heading font-semibold hover:bg-white/10 hover:text-primary transition-all duration-300">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="font-heading font-bold rounded-full px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5">
                                <span className="drop-shadow-sm">Get Started</span>
                            </Button>
                        </Link>
                    </div>
                </nav>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="group hover:bg-primary/5 rounded-full w-10 h-10 transition-all duration-300 relative">
                                <div className="flex flex-col gap-1.5 items-end justify-center">
                                    <span className="w-6 h-0.5 bg-primary rounded-full group-hover:w-4 transition-all duration-300"></span>
                                    <span className="w-4 h-0.5 bg-primary rounded-full group-hover:w-6 transition-all duration-300"></span>
                                </div>
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] border-l border-gray-100 bg-white shadow-2xl p-0">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                {/* Header Overlay */}
                                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                    <Image
                                        src="/icons/logo-long.svg"
                                        alt="MOXYOS Logo"
                                        width={110}
                                        height={32}
                                        className="h-8 w-auto"
                                    />
                                </div>

                                {/* Navigation */}
                                <div className="flex-1 px-6 py-10 overflow-y-auto">
                                    <div className="space-y-4">
                                        <Link href="/explore" className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50/50 hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform text-primary">
                                                <Search className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900">Explore</span>
                                                <span className="text-xs text-gray-500 font-medium">Discover local vibes</span>
                                            </div>
                                        </Link>

                                        <Link href="/about" className="flex items-center gap-5 p-4 rounded-2xl bg-gray-50/50 hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform text-primary">
                                                <Info className="w-6 h-6" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900">About</span>
                                                <span className="text-xs text-gray-500 font-medium">Our mission & story</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-8 space-y-4 bg-white border-t border-gray-100">
                                    <Link href="/login" className="w-full block">
                                        <Button variant="outline" className="w-full h-14 text-base font-bold text-primary border-primary/20 hover:bg-primary/5 rounded-2xl transition-all active:scale-[0.98]">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="w-full block">
                                        <Button className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
                                            <span className="drop-shadow-sm font-heading">Get Started</span>
                                        </Button>
                                    </Link>
                                    <p className="text-center text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                                        © 2026 MOXYOS
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div >
        </header >
    );
}
