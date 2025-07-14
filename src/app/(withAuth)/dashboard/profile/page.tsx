import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountSettings from "../../../../components/views/dashboard/profile/account-settings";
import PersonalInformation from "../../../../components/views/dashboard/profile/personal-information";

// Fetcher function for SWR

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login?callbackUrl=/profile");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <PersonalInformation />
        <AccountSettings session={session} />
      </div>
    </div>
  );
}
