// Renders a client's stage as a badge. Always shows the Uzbek text label —
// never relies on color alone to convey the stage.
import { Badge } from "@/components/ui/badge";
import { stageLabel, type ClientStage } from "@/features/clients/constants";

const STAGE_VARIANTS: Record<
  ClientStage,
  "secondary" | "default" | "outline" | "destructive"
> = {
  new: "secondary",
  in_progress: "default",
  won: "outline",
  lost: "destructive",
};

export function StageBadge({ stage }: { stage: ClientStage }) {
  return <Badge variant={STAGE_VARIANTS[stage]}>{stageLabel(stage)}</Badge>;
}
