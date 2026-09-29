import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Summary } from "@/lib/types";

export function SummaryCards({ summary }: { summary: Summary }) {
  const negative = summary.balance < 0;

  return (
    <section aria-label="Resumo" className="grid gap-4 sm:grid-cols-3">
      <Card
        title="Saldo atual"
        value={summary.balance}
        icon={<Wallet className="size-5" />}
        className={
          negative
            ? "bg-rose-600 text-white"
            : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        }
      />
      <Card
        title="Receitas"
        value={summary.totalIncome}
        icon={<ArrowUpCircle className="size-5 text-emerald-600" />}
        className="bg-white dark:bg-slate-900"
        valueClassName="text-emerald-600 dark:text-emerald-400"
      />
      <Card
        title="Despesas"
        value={summary.totalExpense}
        icon={<ArrowDownCircle className="size-5 text-rose-600" />}
        className="bg-white dark:bg-slate-900"
        valueClassName="text-rose-600 dark:text-rose-400"
      />
    </section>
  );
}

function Card({
  title,
  value,
  icon,
  className,
  valueClassName,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  className: string;
  valueClassName?: string;
}) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 ${className}`}>
      <div className="flex items-center justify-between text-sm font-medium opacity-80">
        <span>{title}</span>
        {icon}
      </div>
      <p className={`mt-3 text-2xl font-semibold tabular-nums sm:text-3xl ${valueClassName ?? ""}`}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}
