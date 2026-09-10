import { Navigate } from "react-router-dom";

// If there's no logged-in user, redirect to /login.
// Plain prop-based check - no Context needed.
export default function RequireAuth({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
