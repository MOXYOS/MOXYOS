"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 left-4 z-20 rounded-full h-10 w-10 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md border border-white/10 shadow-lg transition-all"
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
        </Button>
    );
}
