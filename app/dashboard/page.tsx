import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MousePointerClick, Star, Eye } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-heading font-bold tracking-tight text-primary">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's how your business is performing.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Clicks</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">345</div>
                        <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">+4 new this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reach</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5.2k</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">New Review</p>
                                <p className="text-sm text-muted-foreground">Sarah J. gave you 5 stars!</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">Milestone Reached</p>
                                <p className="text-sm text-muted-foreground">You hit 1,000 profile views.</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">System Update</p>
                                <p className="text-sm text-muted-foreground">Your profile was verified.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
