import { useNavigate } from "react-router-dom";
import Topbar from "../components/Layout/Topbar";
import Card from "../components/UI/Card";
import TransactionForm from "../components/Transactions/TransactionForm";

export default function AddTransaction({ onAdd }) {
  const navigate = useNavigate();

  function handleSubmit(transaction) {
    onAdd(transaction);
    navigate("/transactions");
  }

  return (
    <>
      <Topbar eyebrow="New entry" title="Add transaction" />
      <div className="page">
        <Card>
          <TransactionForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </>
  );
}
