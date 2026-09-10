import Sidebar from "./Sidebar";

// Wraps a page with the sidebar. We pass the page in as `children`
// instead of using React Router's <Outlet />, so it's easier to see
// exactly what's being rendered.
export default function Layout({ user, onLogout, children }) {
  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="main">{children}</main>
    </div>
  );
}
