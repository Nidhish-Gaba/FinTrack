import { useState } from "react";
import Topbar from "../components/Layout/Topbar";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import EmptyState from "../components/UI/EmptyState";
import { EXPENSE_CATEGORIES } from "../utils/categories";
import { formatINR, getMonthKey } from "../utils/format";

export default function Budget({ transactions, budgets, onSetBudget }) {
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].name);
  const [limit, setLimit] = useState("");

  const currentMonth = getMonthKey(new Date().toISOString());

  // How much has been spent this month, grouped by category
  const spentByCategory = {};
  transactions
    .filter((t) => t.type === "expense" && getMonthKey(t.date) === currentMonth)
    .forEach((t) => {
      spentByCategory[t.category] = (spentByCategory[t.category] || 0) + Number(t.amount);
    });

  const budgetEntries = Object.entries(budgets);

  function handleSubmit(event) {
    event.preventDefault();
    if (!limit || Number(limit) <= 0) return;
    onSetBudget(category, Number(limit));
    setLimit("");
  }

  function progressTone(spent, cap) {
    const ratio = spent / cap;
    if (ratio >= 1) return "progress__fill--over";
    if (ratio >= 0.8) return "progress__fill--warn";
    return "progress__fill--ok";
  }

  return (
    <>
      <Topbar eyebrow="This month" title="Budgets" />
      <div className="page">
        <div className="dashboard-grid">
          <Card title="Set a monthly limit">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="budget-category">Category</label>
                <select
                  id="budget-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {EXPENSE_CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="budget-limit">Monthly limit (₹)</label>
                <input
                  id="budget-limit"
                  type="number"
                  min="1"
                  placeholder="e.g. 3000"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
              <Button type="submit">Save limit</Button>
            </form>
          </Card>

          <Card title="Budget progress">
            {budgetEntries.length === 0 ? (
              <EmptyState
                icon="🎯"
                title="No budgets set yet"
                subtitle="Set a limit for a category to track it here."
              />
            ) : (
              budgetEntries.map(([cat, cap]) => {
                const spent = spentByCategory[cat] || 0;
                const percent = Math.min((spent / cap) * 100, 100);
                return (
                  <div className="budget-row" key={cat}>
                    <div className="budget-row__top">
                      <span>{cat}</span>
                      <span className="money">
                        {formatINR(spent)} / {formatINR(cap)}
                      </span>
                    </div>
                    <div className="progress">
                      <div
                        className={`progress__fill ${progressTone(spent, cap)}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="budget-row__sub">
                      {spent > cap
                        ? `Over budget by ${formatINR(spent - cap)}`
                        : `${formatINR(cap - spent)} remaining`}
                    </div>
                  </div>
                );
              })
            )}
          </Card>
        </div>
      </div>
    </>
  );
}


