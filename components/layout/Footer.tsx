import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-10 gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Image
                        src="/icons/logo-long.svg"
                        alt="MOXYOS Logo"
                        width={120}
                        height={34}
                        className="h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                    <p className="text-sm text-muted-foreground">
                        Connecting Smiles across your community.
                    </p>
                </div>

                <div className="flex gap-8 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        Terms of Service
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        Contact Support
                    </Link>
                </div>

                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} MOXYOS. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
