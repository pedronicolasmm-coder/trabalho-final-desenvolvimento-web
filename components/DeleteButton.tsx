"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { deleteTransaction } from "@/app/actions";

export function DeleteButton({ id, description }: { id: string; description: string }) {
  return (
    <form action={deleteTransaction.bind(null, id)}>
      <Button description={description} />
    </form>
  );
}

function Button({ description }: { description: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={`Excluir ${description}`}
      title="Excluir"
      className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:animate-pulse dark:hover:bg-rose-500/10"
    >
      <Trash2 className="size-4" />
    </button>
  );
}
