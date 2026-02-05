import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 font-sans">
            <div className="flex flex-1">
                <aside className="hidden md:block fixed inset-y-0 left-0 z-10 w-64 border-r bg-background">
                    <DashboardSidebar />
                </aside>
                <main className="flex-1 md:ml-64 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
