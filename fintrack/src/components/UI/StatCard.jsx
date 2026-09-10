import { formatINR } from "../../utils/format";

export default function StatCard({ label, amount, tone }) {
  // tone is "income" | "expense" | "neutral" - controls the number color
  const toneClass =
    tone === "income" ? "money--income" : tone === "expense" ? "money--expense" : "";

  return (
    <div className="stat-card">
      <div className="stat-card__label">{label}</div>
      <div className={`stat-card__value money ${toneClass}`}>
        {formatINR(amount)}
      </div>
    </div>
  );
}
