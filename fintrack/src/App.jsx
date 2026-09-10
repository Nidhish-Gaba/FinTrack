import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "./routes/RequireAuth";
import Layout from "./components/Layout/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

export default function App() {
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fintrack_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fintrack_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("fintrack_budgets");
    return saved ? JSON.parse(saved) : {};
  });

  
  useEffect(() => {
    localStorage.setItem("fintrack_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("fintrack_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("fintrack_budgets", JSON.stringify(budgets));
  }, [budgets]);

  
  useEffect(() => {
    if (transactions.length > 0) return;

    async function loadSampleData() {
      const response = await fetch("/data/sample-transactions.json");
      const data = await response.json();
      setTransactions(data);
    }

    loadSampleData();
    
  }, []);

  function handleLogin(name, email) {
    setUser({ name, email });
  }

  function handleLogout() {
    setUser(null);
  }

  function addTransaction(transaction) {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions([newTransaction, ...transactions]);
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  function setBudgetForCategory(category, limit) {
    setBudgets({ ...budgets, [category]: limit });
  }

  
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totals = { income, expense, balance: income - expense };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route
        path="/dashboard"
        element={
          <RequireAuth user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Dashboard
                transactions={transactions}
                totals={totals}
                onDelete={deleteTransaction}
              />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/transactions"
        element={
          <RequireAuth user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Transactions transactions={transactions} onDelete={deleteTransaction} />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/transactions/add"
        element={
          <RequireAuth user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <AddTransaction onAdd={addTransaction} />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/budget"
        element={
          <RequireAuth user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Budget
                transactions={transactions}
                budgets={budgets}
                onSetBudget={setBudgetForCategory}
              />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/reports"
        element={
          <RequireAuth user={user}>
            <Layout user={user} onLogout={handleLogout}>
              <Reports transactions={transactions} />
            </Layout>
          </RequireAuth>
        }
      />

      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
