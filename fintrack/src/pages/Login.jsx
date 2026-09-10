import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(name || "Student", email || "you@example.com");
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__brand">FinTrack</div>
        <p className="auth-card__tag">Track every rupee, spend with intent.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" block>
            Continue to dashboard
          </Button>
        </form>

        
      </div>
    </div>
  );
}
