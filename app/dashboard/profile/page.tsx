import { ProfileForm } from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-heading font-bold tracking-tight text-primary mb-6">Edit Profile</h1>
            <ProfileForm />
        </div>
    );
}
