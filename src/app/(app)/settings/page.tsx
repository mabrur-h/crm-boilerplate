// Settings page: profile card (rename) + appearance (theme) card.
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { requireUser } from "@/lib/session";
import { ProfileForm } from "@/app/(app)/settings/profile-form";
import { AppearanceCard } from "@/app/(app)/settings/appearance-card";

export const metadata: Metadata = { title: "Sozlamalar" };

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <>
      <PageHeader title="Sozlamalar" />

      <div className="grid max-w-4xl gap-4 md:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Ismingiz ilovada ko‘rinadi. Email o‘zgartirilmaydi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm name={user.name} email={user.email} />
          </CardContent>
        </Card>

        <Card className="h-fit shadow-none">
          <CardHeader>
            <CardTitle>Ko‘rinish</CardTitle>
            <CardDescription>
              «Tizim» qurilmangiz sozlamasiga moslashadi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppearanceCard />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
