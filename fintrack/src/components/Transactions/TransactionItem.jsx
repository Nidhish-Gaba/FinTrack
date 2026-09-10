import { getCategoryIcon } from "../../utils/categories";
import { formatDate, formatINR } from "../../utils/format";

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, category, amount, note, date } = transaction;
  const isIncome = type === "income";

  return (
    <li className="tx-row">
      <div className="tx-row__left">
        <div className="tx-row__icon">{getCategoryIcon(category)}</div>
        <div>
          <div className="tx-row__category">{category}</div>
          <div className="tx-row__meta">
            {note ? `${note} · ` : ""}
            {formatDate(date)}
          </div>
        </div>
      </div>
      <div className="tx-row__right">
        <span
          className={`tx-row__amount money ${isIncome ? "money--income" : "money--expense"}`}
        >
          {isIncome ? "+" : "-"}
          {formatINR(amount)}
        </span>
        {onDelete && (
          <button
            className="btn btn--danger"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${category} transaction`}
          >
            ✕
          </button>
        )}
      </div>
    </li>
  );
}
