import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEnv } from "@/lib/cloudflare";
import { LoginForm } from "@/features/auth/components/login-form";
import { getSession } from "@/lib/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  const signupAllowed = getEnv().ALLOW_SIGNUP === "true";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kirish</CardTitle>
        <CardDescription>Hisobingizga kiring</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <LoginForm />
        {signupAllowed && (
          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz yo‘qmi?{" "}
            <Link href="/signup" className="text-primary underline">
              Ro‘yxatdan o‘ting
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
