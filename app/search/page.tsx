import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MOCK_BUSINESSES } from "@/lib/data/mock";
import { Star, MapPin, Sparkles, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchGrid } from "@/components/search/SearchGrid";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "all";
    const supabase = await createClient();

    // 1. Fetch DB Results
    const { data: dbData } = await supabase
        .from('businesses')
        .select('*')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%`);

    const dbResults = dbData || [];

    // 2. Fetch Mock Results
    const lowerQuery = query.toLowerCase();
    const mockResults = MOCK_BUSINESSES.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        query === "all"
    );

    // 3. Combine
    const results = [...dbResults, ...mockResults];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* AI Header */}
                    <div className="mb-12 relative overflow-hidden rounded-[2.5rem] bg-black border border-white/10 shadow-2xl">
                        {/* Dynamic Background */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[128px] -mr-32 -mt-32 pointer-events-none opacity-60 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[128px] -ml-32 -mb-32 pointer-events-none opacity-40"></div>

                        <div className="relative z-10 p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shrink-0">
                                <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400/20" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-yellow-400/20">
                                        MOXYOS Match AI
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight leading-tight">
                                    Top picks for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">"{query}"</span>
                                </h1>
                                <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
                                    <strong className="text-white">MOXYOS Match</strong> curated {results.length} spots that match your vibe.
                                    {results.length > 0 && (
                                        <>
                                            <strong className="text-white font-medium"> {results[0].name} </strong>
                                            seems like the perfect match with a <span className="inline-flex items-center gap-1 bg-yellow-400/10 text-yellow-400 px-1.5 rounded text-sm font-bold"><Star className="w-3 h-3 fill-current" /> {results[0].rating}</span> rating.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Count */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-semibold text-foreground">
                            {results.length} Results
                        </h2>
                        <Button variant="outline" size="sm" className="gap-2 rounded-full">
                            <Filter className="w-4 h-4" /> Filters
                        </Button>
                    </div>

                    {/* Results Grid */}
                    {results.length > 0 ? (
                        <SearchGrid results={results} />
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
                            <p className="text-muted-foreground mb-4">No results found trying searching for something else.</p>
                            <Button variant="secondary" asChild>
                                <Link href="/">Back Home</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
