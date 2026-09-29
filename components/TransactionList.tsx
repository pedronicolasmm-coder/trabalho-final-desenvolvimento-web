import { ArrowDownRight, ArrowUpRight, Inbox } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { DeleteButton } from "./DeleteButton";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10">
      <h2 className="text-lg font-semibold">Histórico</h2>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center text-slate-500">
          <Inbox className="size-8" />
          <p>Nenhuma transação ainda.</p>
          <p className="text-sm">Adicione a primeira pelo formulário.</p>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
          {transactions.map((t) => {
            const income = t.type === "income";
            return (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full ${
                    income
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400"
                  }`}
                  aria-label={income ? "Receita" : "Despesa"}
                  role="img"
                >
                  {income ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.description}</p>
                  <p className="text-sm text-slate-500">{formatDate(t.occurredOn)}</p>
                </div>

                <span
                  className={`shrink-0 font-semibold tabular-nums ${
                    income ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {income ? "+" : "−"} {formatCurrency(t.amount)}
                </span>

                <DeleteButton id={t.id} description={t.description} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
