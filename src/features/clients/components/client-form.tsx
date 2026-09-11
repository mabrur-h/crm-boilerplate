// Shared create/edit form for a client. `action` is either `createClient` or
// `updateClient` bound to an id — both share the same `ClientActionState`
// contract, so this component doesn't need to know which one it is.
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CLIENT_STAGES } from "@/features/clients/constants";
import type {
  ClientActionState,
  ClientFormValues,
} from "@/features/clients/actions";

const EMPTY_VALUES: ClientFormValues = {
  name: "",
  phone: "",
  company: "",
  stage: "new",
  note: "",
  nextContactDate: "",
};

// `useActionState`'s initial value. Kept here (a plain client component)
// rather than in `actions.ts`, since a `"use server"` file may only export
// async functions — see the note in `actions.ts`.
const INITIAL_ACTION_STATE: ClientActionState = { ok: false };

export function ClientForm({
  action,
  defaultValues,
}: {
  action: (
    state: ClientActionState,
    formData: FormData,
  ) => Promise<ClientActionState>;
  defaultValues?: ClientFormValues;
}) {
  const [state, formAction, isPending] = useActionState(
    action,
    INITIAL_ACTION_STATE,
  );

  const values = state.values ?? defaultValues ?? EMPTY_VALUES;
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(fieldErrors.name)}>
          <FieldLabel htmlFor="client-name">Ism</FieldLabel>
          <Input
            id="client-name"
            name="name"
            defaultValue={values.name}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          <FieldError errors={[{ message: fieldErrors.name }]} />
        </Field>

        <Field data-invalid={Boolean(fieldErrors.phone)}>
          <FieldLabel htmlFor="client-phone">Telefon</FieldLabel>
          <Input
            id="client-phone"
            name="phone"
            defaultValue={values.phone}
            aria-invalid={Boolean(fieldErrors.phone)}
          />
          <FieldError errors={[{ message: fieldErrors.phone }]} />
        </Field>

        <Field data-invalid={Boolean(fieldErrors.company)}>
          <FieldLabel htmlFor="client-company">Kompaniya</FieldLabel>
          <Input
            id="client-company"
            name="company"
            defaultValue={values.company}
            aria-invalid={Boolean(fieldErrors.company)}
          />
          <FieldError errors={[{ message: fieldErrors.company }]} />
        </Field>

        <Field data-invalid={Boolean(fieldErrors.stage)}>
          <FieldLabel htmlFor="client-stage">Bosqich</FieldLabel>
          <Select name="stage" defaultValue={values.stage}>
            <SelectTrigger
              id="client-stage"
              aria-invalid={Boolean(fieldErrors.stage)}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_STAGES.map((stage) => (
                <SelectItem key={stage.value} value={stage.value}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[{ message: fieldErrors.stage }]} />
        </Field>

        <Field data-invalid={Boolean(fieldErrors.nextContactDate)}>
          <FieldLabel htmlFor="client-next-contact-date">
            Keyingi aloqa
          </FieldLabel>
          <Input
            id="client-next-contact-date"
            name="nextContactDate"
            type="date"
            defaultValue={values.nextContactDate}
            aria-invalid={Boolean(fieldErrors.nextContactDate)}
          />
          <FieldError errors={[{ message: fieldErrors.nextContactDate }]} />
        </Field>

        <Field data-invalid={Boolean(fieldErrors.note)}>
          <FieldLabel htmlFor="client-note">Izoh</FieldLabel>
          <Textarea
            id="client-note"
            name="note"
            defaultValue={values.note}
            aria-invalid={Boolean(fieldErrors.note)}
          />
          <FieldError errors={[{ message: fieldErrors.note }]} />
        </Field>

        {state.formError && (
          <p role="alert" className="text-sm text-destructive">
            {state.formError}
          </p>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            Saqlash
          </Button>
          <Button type="button" variant="outline" disabled={isPending} asChild>
            <Link href="/clients">Bekor qilish</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
