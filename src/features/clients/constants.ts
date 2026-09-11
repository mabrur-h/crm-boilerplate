// Client stage values, their Uzbek labels, and the "active" subset used to
// decide who still needs follow-up. Exact labels come from the project's
// global constraints — copy them verbatim when building new modules.

export const CLIENT_STAGES = [
  { value: "new", label: "Yangi" },
  { value: "in_progress", label: "Jarayonda" },
  { value: "won", label: "Mijoz" },
  { value: "lost", label: "Yo‘qotildi" },
] as const;

export type ClientStage = (typeof CLIENT_STAGES)[number]["value"];

export function stageLabel(value: ClientStage): string {
  return CLIENT_STAGES.find((stage) => stage.value === value)?.label ?? value;
}

// Stages that still count as "in play" for dashboard follow-up reminders.
// `won` and `lost` are done deals and never show up in "due today".
export const ACTIVE_STAGES: ClientStage[] = ["new", "in_progress"];
