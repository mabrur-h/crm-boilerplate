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
import { SignupForm } from "@/features/auth/components/signup-form";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Ro‘yxatdan o‘tish" };

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  const signupAllowed = getEnv().ALLOW_SIGNUP === "true";

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Ro‘yxatdan o‘tish</CardTitle>
        {signupAllowed && (
          <CardDescription>Yangi hisob yarating</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {signupAllowed ? (
          <>
            <SignupForm />
            <p className="text-center text-sm text-muted-foreground">
              Hisobingiz bormi?{" "}
              <Link
                href="/login"
                className="rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                Kiring
              </Link>
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ro‘yxatdan o‘tish yopilgan. Administrator bilan bog‘laning.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
