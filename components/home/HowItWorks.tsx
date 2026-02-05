import { Search, Play, UserCheck, ArrowRight } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            id: 1,
            title: "Find Your Vibe",
            description: "Search for cafes, barbers, or yoga studios in your neighborhood.",
            icon: Search,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            id: 2,
            title: "Watch & Verify",
            description: "See authentic video stories. No fake reviews, just real vibes.",
            icon: Play,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            id: 3,
            title: "Connect Locally",
            description: "Book services or visit with confidence knowing what to expect.",
            icon: UserCheck,
            color: "text-green-500",
            bg: "bg-green-500/10"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                        How MOXYOS Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We're changing how you discover local businesses. Skip the text reviews and see the reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 rounded-3xl ${step.bg} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-${step.color}/20`}>
                                <step.icon className={`h-10 w-10 ${step.color}`} />
                            </div>
                            <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>

                            {/* Mobile Arrow */}
                            <div className="md:hidden mt-8 text-muted-foreground/30">
                                {step.id !== 3 && <ArrowRight className="h-6 w-6 rotate-90" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
