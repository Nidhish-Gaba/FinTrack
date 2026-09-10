import { formatINR } from "../../utils/format";
import EmptyState from "../UI/EmptyState";

// Renders a horizontal bar per category, sized relative to the
// category with the highest spend. No charting library needed.
export default function CategoryBarChart({ transactions }) {
  const totalsByCategory = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + Number(t.amount);
    });

  const rows = Object.entries(totalsByCategory)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  if (rows.length === 0) {
    return <EmptyState icon="📊" title="No expenses to chart yet" />;
  }

  const max = Math.max(...rows.map((r) => r.total));

  return (
    <div className="bar-chart">
      {rows.map((row) => (
        <div className="bar-chart__row" key={row.category}>
          <span>{row.category}</span>
          <div className="bar-chart__track">
            <div
              className="bar-chart__fill"
              style={{ width: `${(row.total / max) * 100}%` }}
            />
          </div>
          <span className="bar-chart__amount money">{formatINR(row.total)}</span>
        </div>
      ))}
    </div>
  );
}
