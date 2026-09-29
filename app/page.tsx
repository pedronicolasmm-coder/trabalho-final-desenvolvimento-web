import { connection } from "next/server";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { getSummary, getTransactions } from "@/lib/transactions";

export default async function Home() {
  // Os dados vêm do banco a cada requisição (renderização dinâmica).
  await connection();

  const [summary, transactions] = await Promise.all([getSummary(), getTransactions()]);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:py-12">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Finanças Pessoais</h1>
        <p className="text-slate-500">Acompanhe suas receitas e despesas.</p>
      </header>

      <SummaryCards summary={summary} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <TransactionForm today={today} />
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
