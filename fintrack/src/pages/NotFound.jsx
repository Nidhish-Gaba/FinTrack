import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__code">404</div>
      <h2>This page doesn't exist</h2>
      <p>The page you're looking for may have been moved or removed.</p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
