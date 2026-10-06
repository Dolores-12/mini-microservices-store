import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="brand">
            <span className="brand-icon">🛒</span>
            <span>MiniStore</span>
          </NavLink>

          <div className="navbar-search">
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
            />

            <button type="button" aria-label="Search">
              🔍
            </button>
          </div>

          <div className="navbar-actions">
            <NavLink to="/catalog" className="nav-link">
              Shop
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/orders" className="nav-link">
                  Orders
                </NavLink>

                <NavLink to="/cart" className="cart-link">
                  🛒
                  <span>Cart</span>
                </NavLink>

                <span className="user-name">
                  {user?.name || user?.email || "Customer"}
                </span>

                <button
                  type="button"
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>

                <NavLink to="/register" className="register-button">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="category-bar">
        <div className="category-container">
          <NavLink to="/catalog">All Categories</NavLink>
          <NavLink to="/catalog">Electronics</NavLink>
          <NavLink to="/catalog">Fashion</NavLink>
          <NavLink to="/catalog">Home & Living</NavLink>
          <NavLink to="/catalog">Beauty</NavLink>
          <NavLink to="/catalog">Accessories</NavLink>
          <NavLink to="/catalog">Deals</NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;