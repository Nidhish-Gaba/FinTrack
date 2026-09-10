import { Link } from "react-router-dom";
import Topbar from "../components/Layout/Topbar";
import StatCard from "../components/UI/StatCard";
import Card from "../components/UI/Card";
import TransactionList from "../components/Transactions/TransactionList";
import CategoryBarChart from "../components/Charts/CategoryBarChart";
import Button from "../components/UI/Button";
import { formatINR } from "../utils/format";

export default function Dashboard({ transactions, totals, onDelete }) {
  const recent = transactions.slice(0, 5);

  return (
    <>
      <Topbar eyebrow="Overview" title="Dashboard" />
      <div className="page">
        <div className="hero-balance">
          <div>
            <div className="hero-balance__label">Total balance</div>
            <div className="hero-balance__value money">
              {formatINR(totals.balance)}
            </div>
          </div>
          <Link to="/transactions/add">
            <Button>+ Add transaction</Button>
          </Link>
        </div>

        <div className="stat-grid">
          <StatCard label="Total income" amount={totals.income} tone="income" />
          <StatCard label="Total expenses" amount={totals.expense} tone="expense" />
          <StatCard label="Net savings" amount={totals.balance} tone="neutral" />
        </div>

        <div className="dashboard-grid">
          <Card title="Recent transactions" action={<Link to="/transactions">View all</Link>}>
            <TransactionList transactions={recent} onDelete={onDelete} />
          </Card>

          <Card title="Spending by category">
            <CategoryBarChart transactions={transactions} />
          </Card>
        </div>
      </div>
    </>
  );
}
