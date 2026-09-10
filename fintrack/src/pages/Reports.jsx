import { useState } from "react";
import Topbar from "../components/Layout/Topbar";
import Card from "../components/UI/Card";
import StatCard from "../components/UI/StatCard";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import { getMonthKey } from "../utils/format";

export default function Reports({ transactions }) {
  // Every month that actually has data, most recent first
  const availableMonths = Array.from(
    new Set(transactions.map((t) => getMonthKey(t.date)))
  )
    .sort()
    .reverse();

  const [selectedMonth, setSelectedMonth] = useState(
    availableMonths[0] || getMonthKey(new Date().toISOString())
  );

  const monthTransactions = transactions.filter(
    (t) => getMonthKey(t.date) === selectedMonth
  );

  const income = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const monthTotals = { income, expense, net: income - expense };

  function formatMonthLabel(monthKey) {
    const [year, month] = monthKey.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  }

  return (
    <>
      <Topbar eyebrow="Monthly summary" title="Reports" />
      <div className="page">
        <Card
          title="Select month"
          action={
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {availableMonths.length === 0 ? (
                <option value={selectedMonth}>{formatMonthLabel(selectedMonth)}</option>
              ) : (
                availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {formatMonthLabel(m)}
                  </option>
                ))
              )}
            </select>
          }
        >
          <div className="stat-grid" style={{ marginBottom: 0 }}>
            <StatCard label="Income" amount={monthTotals.income} tone="income" />
            <StatCard label="Expenses" amount={monthTotals.expense} tone="expense" />
            <StatCard label="Net" amount={monthTotals.net} tone="neutral" />
          </div>
        </Card>

        <div style={{ height: 20 }} />

        <Card title={`Category breakdown — ${formatMonthLabel(selectedMonth)}`}>
          <CategoryBarChart transactions={monthTransactions} />
        </Card>
      </div>
    </>
  );
}
