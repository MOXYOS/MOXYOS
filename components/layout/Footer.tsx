import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="relative border-t bg-background/60 backdrop-blur-xl transition-all duration-300">
            {/* Subtle Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Brand Section */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icons/logo-long.svg"
                            alt="MOXYOS Inc Logo"
                            width={120}
                            height={34}
                            className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                        Connecting Smiles
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors hover:underline decoration-wavy underline-offset-4">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors hover:underline decoration-wavy underline-offset-4">
                        Terms
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors hover:underline decoration-wavy underline-offset-4">
                        Support
                    </Link>
                </nav>

                {/* Copyright */}
                <p className="text-xs text-muted-foreground/80">
                    © {new Date().getFullYear()} MOXYOS Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
