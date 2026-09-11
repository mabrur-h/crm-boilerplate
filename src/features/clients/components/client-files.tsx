// "Fayllar" card on the client detail page: upload form + file list with
// download/delete. Client-side `validateUpload` pre-checks the file before
// it ever hits the server action, so the user sees the same Uzbek error
// instantly instead of waiting on a round trip.
"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Download, Paperclip, Trash2, Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { formatUzDate, todayInTashkent } from "@/lib/dates";
import { formatFileSize, validateUpload } from "@/lib/files";
import {
  deleteClientFile,
  uploadClientFile,
  type FileActionState,
} from "@/features/clients/file-actions";
import type { ClientFile } from "@/features/clients/queries";

const INITIAL_STATE: FileActionState = { ok: false };

function UploadForm({ clientId }: { clientId: string }) {
  const uploadAction = uploadClientFile.bind(null, clientId);
  const [state, formAction, isPending] = useActionState(
    uploadAction,
    INITIAL_STATE,
  );
  const previousStateRef = useRef(state);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === previousStateRef.current) {
      return;
    }
    previousStateRef.current = state;

    if (state.ok) {
      toast.success("Fayl yuklandi");
      formRef.current?.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem(
      "file",
    ) as HTMLInputElement | null;
    const file = input?.files?.[0];

    if (!file) {
      event.preventDefault();
      toast.error("Fayl tanlanmagan");
      return;
    }

    const error = validateUpload({ size: file.size, type: file.type });
    if (error) {
      event.preventDefault();
      toast.error(error);
    }
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2"
    >
      <input
        type="file"
        name="file"
        aria-label="Fayl tanlash"
        disabled={isPending}
        className="min-w-0 flex-1 rounded-lg text-sm text-foreground file:mr-2 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground hover:file:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      />
      <Button type="submit" disabled={isPending} size="lg" className="h-10 px-4">
        <Upload aria-hidden="true" />
        {isPending ? "Yuklanmoqda…" : "Fayl yuklash"}
      </Button>
    </form>
  );
}

function DeleteFileButton({ file }: { file: ClientFile }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteClientFile(file.id);
      if (result.ok) {
        toast.success("Fayl o‘chirildi");
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={isPending}
          aria-label={`${file.name} faylini o‘chirish`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 aria-hidden="true" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Faylni o‘chirasizmi?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu amalni ortga qaytarib bo‘lmaydi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            O‘chirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ClientFiles({
  clientId,
  files,
}: {
  clientId: string;
  files: ClientFile[];
}) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Paperclip aria-hidden="true" className="size-4 text-muted-foreground" />
          Fayllar
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UploadForm clientId={clientId} />

        {files.length === 0 ? (
          <EmptyState
            icon={Paperclip}
            title="Hali fayl yuklanmagan."
            description="Shartnoma yoki hisob-fakturani shu yerga qo‘shing."
            className="py-8"
          />
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex flex-wrap items-center justify-between gap-2 py-2.5"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)} ·{" "}
                    {formatUzDate(todayInTashkent(file.createdAt))}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button
                    asChild
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <a
                      href={`/api/files/${file.id}`}
                      aria-label={`${file.name} faylini yuklab olish`}
                    >
                      <Download aria-hidden="true" />
                    </a>
                  </Button>
                  <DeleteFileButton file={file} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
