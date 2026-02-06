"use client"

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2, Star, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_BUSINESSES } from "@/lib/data/mock";

export function SmartSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();
    const router = useRouter();

    // Debounce Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                setIsOpen(true);

                // 1. Search Supabase
                const { data: dbData, error } = await supabase
                    .from('businesses')
                    .select('id, name, category, thumbnail_url, rating, location')
                    .or(`name.ilike.%${query}%,category.ilike.%${query}%`)
                    .limit(5);

                const dbResults = dbData || [];

                // 2. Search Mock Data (Client-side)
                const lowerQuery = query.toLowerCase();
                const mockResults = MOCK_BUSINESSES.filter(item =>
                    item.name.toLowerCase().includes(lowerQuery) ||
                    item.category.toLowerCase().includes(lowerQuery)
                ).slice(0, 5);

                // 3. Combine Results (Dedupe by ID if needed, though IDs usually differ)
                const combinedResults = [...dbResults, ...mockResults].slice(0, 7); // Limit total to 7

                setResults(combinedResults);
                setLoading(false);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        if (!query.trim()) return;
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleSelect = (id: string) => {
        setIsOpen(false);
        router.push(`/business/${id}`);
    };

    return (
        <div ref={searchRef} className="w-full max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative flex items-center glass p-2 rounded-full bg-background/50 backdrop-blur-xl border border-white/10">
                <MapPin className="ml-4 h-6 w-6 text-primary shrink-0" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Find coffee, yoga, barbers..."
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-lg py-6 placeholder:text-muted-foreground/70 flex-1 px-4"
                />
                <Button
                    size="lg"
                    onClick={handleSearch}
                    className="rounded-full px-8 h-12 text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
                </Button>
            </div>

            {/* Dropdown Results */}
            {isOpen && (query.length > 1) && (
                <div className="absolute top-full mt-4 left-0 w-full bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2">
                        {loading ? (
                            <div className="p-8 flex justify-center text-muted-foreground">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : results.length > 0 ? (
                            <div className="flex flex-col gap-1">
                                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Top Matches
                                </div>
                                {results.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelect(item.id)}
                                        className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl cursor-pointer transition-colors group/item"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-neutral-800 overflow-hidden relative shrink-0 border border-white/10">
                                            {item.thumbnail_url ? (
                                                <img src={item.thumbnail_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                    img
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-white text-base group-hover/item:text-primary transition-colors truncate">
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">{item.category}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1 text-yellow-400">
                                                    <Star className="w-3 h-3 fill-current" /> {item.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover/item:text-white transition-colors opacity-0 group-hover/item:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                <p>No results found for "{query}"</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    {results.length > 0 && (
                        <div className="border-t border-white/5 p-2 bg-white/5">
                            <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-white justify-between h-auto py-2">
                                <span>See all results for "{query}"</span>
                                <Search className="w-3 h-3" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
