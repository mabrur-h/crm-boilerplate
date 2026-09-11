// "AI bilan xabar qoralamasi" card on the client detail page: one button
// calls Workers AI (via `draftFollowUpMessage`) and puts the result in an
// editable textarea the user is expected to review before sending anywhere.
"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { draftFollowUpMessage } from "@/features/clients/ai-actions";

export function AiDraft({ clientId }: { clientId: string }) {
  const [text, setText] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleGenerate() {
    startTransition(async () => {
      const result = await draftFollowUpMessage(clientId);
      if (result.ok) {
        setText(result.text);
        setHasDraft(true);
      } else {
        toast.error(result.error);
      }
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Nusxalandi");
    } catch {
      toast.error("Nusxalab bo‘lmadi");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI bilan xabar qoralamasi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          AI yozgan matnni yuborishdan oldin albatta tekshiring.
        </p>

        {hasDraft && (
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
          />
        )}

        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={handleGenerate} disabled={isPending}>
            {isPending
              ? "Yozilmoqda…"
              : hasDraft
                ? "Qayta yaratish"
                : "Qoralama yaratish"}
          </Button>
          {hasDraft && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              disabled={isPending}
            >
              Nusxalash
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
