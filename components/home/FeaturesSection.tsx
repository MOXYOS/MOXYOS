import { Search, MapPin, Video, Users, Zap, Heart } from "lucide-react";

export function FeaturesSection() {
    const features = [
        {
            icon: <Video className="w-6 h-6 text-primary-foreground" />,
            title: "Video-First Discovery",
            description: "Experience the vibe before you visit. Authentic stories from locals and businesses.",
            gradient: "from-primary to-purple-800"
        },
        {
            icon: <MapPin className="w-6 h-6 text-primary-foreground" />,
            title: "Hyper-Local Feed",
            description: "See what's trending right down the street. Your community, currated for you.",
            gradient: "from-purple-900 to-primary"
        },
        {
            icon: <Zap className="w-6 h-6 text-primary-foreground" />,
            title: "Instant Connection",
            description: "Book, call, or message directly from the feed. No friction, just action.",
            gradient: "from-primary to-secondary"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
                        Why <span className="text-primary">MOXYOS</span>?
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We're reimagining how you connect with your city. <br className="hidden md:block" />
                        Less searching, more experiencing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/5 p-8 rounded-3xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 font-heading">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
