// Renders a client's stage as a badge. Always shows the Uzbek text label —
// never relies on color alone to convey the stage.
import { Badge } from "@/components/ui/badge";
import { stageLabel, type ClientStage } from "@/features/clients/constants";

// Emphasis follows the funnel: quiet while a lead is still moving, loud once
// it is decided. `won` gets the brand fill, `lost` the destructive tint.
const STAGE_VARIANTS: Record<
  ClientStage,
  "secondary" | "default" | "outline" | "destructive"
> = {
  new: "outline",
  in_progress: "secondary",
  won: "default",
  lost: "destructive",
};

export function StageBadge({ stage }: { stage: ClientStage }) {
  return <Badge variant={STAGE_VARIANTS[stage]}>{stageLabel(stage)}</Badge>;
}
