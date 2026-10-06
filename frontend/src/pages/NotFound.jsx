import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-icon">🛍️</div>

      <span className="section-kicker">OOPS!</span>

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist or may have
        been moved.
      </p>

      <div className="not-found-actions">
        <Link to="/" className="cta-button">
          Return Home
        </Link>

        <Link to="/catalog" className="continue-shopping">
          Browse Products
        </Link>
      </div>
    </main>
  );
}

export default NotFound;