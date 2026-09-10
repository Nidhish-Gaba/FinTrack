import { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/Layout/Topbar";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import TransactionList from "../components/Transactions/TransactionList";

export default function Transactions({ transactions, onDelete }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Plain filtering, recalculated on every render - simple and easy to
  // follow, and plenty fast for the size of list a student project needs.
  const filtered = transactions.filter((t) => {
    const matchesType = typeFilter === "all" || t.type === typeFilter;
    const haystack = `${t.category} ${t.note}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <>
      <Topbar eyebrow={`${transactions.length} total`} title="Transactions" />
      <div className="page">
        <Card
          title="All transactions"
          action={
            <Link to="/transactions/add">
              <Button>+ Add</Button>
            </Link>
          }
        >
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by category or note..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income only</option>
              <option value="expense">Expense only</option>
            </select>
          </div>

          <TransactionList transactions={filtered} onDelete={onDelete} />
        </Card>
      </div>
    </>
  );
}
