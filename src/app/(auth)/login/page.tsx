import type { Metadata } from "next";
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

export const metadata: Metadata = { title: "Kirish" };

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  const signupAllowed = getEnv().ALLOW_SIGNUP === "true";

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Kirish</CardTitle>
        <CardDescription>Hisobingizga kiring</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <LoginForm />
        {signupAllowed && (
          <p className="text-center text-sm text-muted-foreground">
            Hisobingiz yo‘qmi?{" "}
            <Link
              href="/signup"
              className="rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Ro‘yxatdan o‘ting
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
