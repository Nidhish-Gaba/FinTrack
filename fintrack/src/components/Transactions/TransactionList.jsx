import TransactionItem from "./TransactionItem";
import EmptyState from "../UI/EmptyState";

export default function TransactionList({ transactions, onDelete }) {
  // Conditional rendering: show an empty state when there's nothing to list
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon="🧾"
        title="No transactions yet"
        subtitle="Add your first income or expense to see it here."
      />
    );
  }

  return (
    <ul className="tx-list">
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </ul>
  );
}
