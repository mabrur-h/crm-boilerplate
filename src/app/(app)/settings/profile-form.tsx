// Profile card on the settings page: lets the user rename themselves via
// Better Auth's client SDK. Follows the same useState + authClient pattern
// as `src/features/auth/components/login-form.tsx`.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";

export function ProfileForm({
  name: initialName,
  email,
}: {
  name: string;
  email: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Ismingizni kiriting");
      return;
    }
    setNameError(null);

    setIsPending(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setIsPending(false);

    if (error) {
      toast.error("Saqlab bo‘lmadi. Qaytadan urinib ko‘ring.");
      return;
    }

    toast.success("Saqlandi");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(nameError)}>
          <FieldLabel htmlFor="profile-name">Ism</FieldLabel>
          <Input
            id="profile-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(nameError)}
          />
          <FieldError errors={[{ message: nameError ?? undefined }]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="profile-email">Email</FieldLabel>
          <Input id="profile-email" value={email} readOnly disabled />
        </Field>
        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="h-10 w-fit px-4"
        >
          {isPending ? "Saqlanmoqda…" : "Saqlash"}
        </Button>
      </FieldGroup>
    </form>
  );
}
