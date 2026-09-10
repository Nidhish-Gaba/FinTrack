import { useState } from "react";
import Button from "../UI/Button";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../utils/categories";

const today = () => new Date().toISOString().slice(0, 10);

export default function TransactionForm({ onSubmit }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].name);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(today());
  const [error, setError] = useState("");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleTypeChange(nextType) {
    setType(nextType);
    const list = nextType === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    setCategory(list[0].name);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Enter an amount greater than ₹0.");
      return;
    }

    setError("");
    onSubmit({ type, amount: Number(amount), category, note, date });

    // Reset the form for the next entry
    setAmount("");
    setNote("");
    setDate(today());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="type-toggle">
        <button
          type="button"
          data-type="expense"
          className={`type-toggle__btn ${type === "expense" ? "active" : ""}`}
          onClick={() => handleTypeChange("expense")}
        >
          − Expense
        </button>
        <button
          type="button"
          data-type="income"
          className={`type-toggle__btn ${type === "income" ? "active" : ""}`}
          onClick={() => handleTypeChange("income")}
        >
          + Income
        </button>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <span className="field-error">{error}</span>}
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="note">Note (optional)</label>
          <input
            id="note"
            type="text"
            placeholder="e.g. Groceries at DMart"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit">Save transaction</Button>
    </form>
  );
}
