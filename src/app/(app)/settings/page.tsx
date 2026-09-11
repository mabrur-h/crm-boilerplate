// Settings page: profile card (rename), currently the only setting.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/app/(app)/settings/profile-form";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Sozlamalar
      </h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm name={user.name} email={user.email} />
        </CardContent>
      </Card>
    </div>
  );
}
