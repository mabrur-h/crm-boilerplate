// Delete button with a confirmation dialog. Calling the `deleteClient`
// server action directly (not through a `<form>`) still lets its internal
// `redirect()` navigate the client — Next handles that across the RSC
// boundary regardless of how the action was invoked.
"use client";

import { useTransition } from "react";
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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClient } from "@/features/clients/actions";

export function DeleteClientButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteClient(id);
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          disabled={isPending}
          size="lg"
          className="h-10 px-4"
        >
          <Trash2 aria-hidden="true" />
          O‘chirish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mijozni o‘chirasizmi?</AlertDialogTitle>
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
