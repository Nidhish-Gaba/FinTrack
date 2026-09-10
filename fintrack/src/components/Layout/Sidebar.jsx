import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/transactions", label: "Transactions", icon: "🧾" },
  { to: "/transactions/add", label: "Add entry", icon: "➕" },
  { to: "/budget", label: "Budget", icon: "🎯" },
  { to: "/reports", label: "Reports", icon: "📊" },
];

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">FinTrack</span>
      </div>

      <nav className="sidebar__nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar__icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <strong>{user?.name || "Guest"}</strong>
          {user?.email}
        </div>
        <button className="sidebar__logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}
