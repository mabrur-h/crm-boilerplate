// Validation for the client create/edit form. Shared by the server actions
// (`actions.ts`) and, indirectly, by the shared `<ClientForm>` component,
// which relies on the field names matching the form's `name` attributes.
import { z } from "zod";
import { CLIENT_STAGES } from "@/features/clients/constants";

const STAGE_VALUES = CLIENT_STAGES.map((stage) => stage.value) as [
  (typeof CLIENT_STAGES)[number]["value"],
  ...(typeof CLIENT_STAGES)[number]["value"][],
];

// `FormData.get()` returns `null` for a missing/empty field, never
// `undefined` — this project always feeds that straight into the schema, so
// every optional field below only has to normalize a blank *string* to
// `null`; `null` itself already means "not provided".
function blankToNull(value: unknown) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  return value;
}

const PHONE_PATTERN = /^[0-9+\-() ]{7,20}$/;

function isRealCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export const clientFormSchema = z.object({
  name: z.preprocess(
    blankToNull,
    z
      .string({ error: "Mijoz ismini kiriting" })
      .min(1, "Mijoz ismini kiriting")
      .max(120, "Ism 120 belgidan oshmasin"),
  ),
  phone: z.preprocess(
    blankToNull,
    z.string().regex(PHONE_PATTERN, "Telefon raqami noto‘g‘ri").nullable(),
  ),
  company: z.preprocess(
    blankToNull,
    z.string().max(120, "Kompaniya nomi 120 belgidan oshmasin").nullable(),
  ),
  stage: z.enum(STAGE_VALUES, { message: "Bosqichni tanlang" }),
  note: z.preprocess(
    blankToNull,
    z.string().max(2000, "Izoh 2000 belgidan oshmasin").nullable(),
  ),
  nextContactDate: z.preprocess(
    blankToNull,
    z.string().refine(isRealCalendarDate, "Sana noto‘g‘ri").nullable(),
  ),
});

export type ClientFormInput = z.infer<typeof clientFormSchema>;
