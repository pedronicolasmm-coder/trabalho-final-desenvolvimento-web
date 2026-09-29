"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Plus } from "lucide-react";
import { createTransaction, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle", submissionId: 0 };

export function TransactionForm({ today }: { today: string }) {
  const [state, formAction] = useActionState(createTransaction, initialState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <form
      // Remonta o formulário a cada envio: limpa após sucesso e preserva o que foi digitado após erro.
      key={state.submissionId}
      action={formAction}
      className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10"
    >
      <h2 className="text-lg font-semibold">Nova transação</h2>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Tipo</legend>
        <div className="grid grid-cols-2 gap-2">
          <TypeOption value="income" label="Receita" defaultChecked={(values.type ?? "income") === "income"} />
          <TypeOption value="expense" label="Despesa" defaultChecked={values.type === "expense"} />
        </div>
        <FieldError messages={errors.type} />
      </fieldset>

      <Field label="Descrição" htmlFor="description" errors={errors.description}>
        <input
          id="description"
          name="description"
          type="text"
          required
          maxLength={120}
          placeholder="Ex.: Salário, Mercado, Aluguel"
          defaultValue={values.description}
          aria-invalid={!!errors.description}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Valor (R$)" htmlFor="amount" errors={errors.amount}>
          <input
            id="amount"
            name="amount"
            type="text"
            inputMode="decimal"
            required
            placeholder="0,00"
            defaultValue={values.amount}
            aria-invalid={!!errors.amount}
            className={`${inputClass} tabular-nums`}
          />
        </Field>

        <Field label="Data" htmlFor="occurredOn" errors={errors.occurredOn}>
          <input
            id="occurredOn"
            name="occurredOn"
            type="date"
            required
            defaultValue={values.occurredOn ?? today}
            aria-invalid={!!errors.occurredOn}
            className={inputClass}
          />
        </Field>
      </div>

      <SubmitButton />

      {state.message && (
        <p
          role="status"
          className={`text-sm ${state.status === "error" ? "text-rose-600" : "text-emerald-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-400/30 aria-invalid:border-rose-500 dark:border-slate-700";

function Field({
  label,
  htmlFor,
  errors,
  children,
}: {
  label: string;
  htmlFor: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      <FieldError messages={errors} />
    </div>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-sm text-rose-600">{messages[0]}</p>;
}

function TypeOption({
  value,
  label,
  defaultChecked,
}: {
  value: "income" | "expense";
  label: string;
  defaultChecked: boolean;
}) {
  const checked =
    value === "income"
      ? "peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 dark:peer-checked:bg-emerald-500/10 dark:peer-checked:text-emerald-400"
      : "peer-checked:border-rose-500 peer-checked:bg-rose-50 peer-checked:text-rose-700 dark:peer-checked:bg-rose-500/10 dark:peer-checked:text-rose-400";

  return (
    <label className="cursor-pointer">
      <input type="radio" name="type" value={value} defaultChecked={defaultChecked} className="peer sr-only" />
      <span
        className={`block rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-medium transition peer-focus-visible:ring-2 peer-focus-visible:ring-slate-400 dark:border-slate-700 ${checked}`}
      >
        {label}
      </span>
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
    >
      <Plus className="size-4" />
      {pending ? "Salvando..." : "Adicionar"}
    </button>
  );
}
