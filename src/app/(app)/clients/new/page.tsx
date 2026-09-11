// Create-client page: heading + the shared client form bound to createClient.
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { requireUser } from "@/lib/session";
import { createClient } from "@/features/clients/actions";
import { ClientForm } from "@/features/clients/components/client-form";

export const metadata: Metadata = { title: "Yangi mijoz" };

export default async function NewClientPage() {
  await requireUser();

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 h-8 w-fit text-muted-foreground"
        >
          <Link href="/clients">
            <ArrowLeft aria-hidden="true" />
            Mijozlar
          </Link>
        </Button>
        <PageHeader
          title="Yangi mijoz"
          description="Faqat ism majburiy — qolganini keyin ham to‘ldirsangiz bo‘ladi."
        />
      </div>

      <Card className="max-w-2xl shadow-none">
        <CardContent>
          <ClientForm action={createClient} />
        </CardContent>
      </Card>
    </>
  );
}
