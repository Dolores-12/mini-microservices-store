import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { getCategories } from "../services/catalogService";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();

        const categoryList = Array.isArray(response)
          ? response
          : response?.categories ||
            response?.data?.categories ||
            response?.data ||
            [];

        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const findCategory = (name) => {
    return categories.find(
      (category) =>
        category.name?.toLowerCase() === name.toLowerCase()
    );
  };

  const electronics = findCategory("Electronics");
  const fashion = findCategory("Fashion");
  const homeLiving = findCategory("Home & Living");
  const beauty = findCategory("Beauty");
  const accessories = findCategory("Accessories");

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
          <NavLink to="/catalog">
            All Categories
          </NavLink>

          {electronics && (
            <NavLink
              to={`/catalog?category=${electronics._id}`}
            >
              Electronics
            </NavLink>
          )}

          {fashion && (
            <NavLink
              to={`/catalog?category=${fashion._id}`}
            >
              Fashion
            </NavLink>
          )}

          {homeLiving && (
            <NavLink
              to={`/catalog?category=${homeLiving._id}`}
            >
              Home & Living
            </NavLink>
          )}

          {beauty && (
            <NavLink
              to={`/catalog?category=${beauty._id}`}
            >
              Beauty
            </NavLink>
          )}

          {accessories && (
            <NavLink
              to={`/catalog?category=${accessories._id}`}
            >
              Accessories
            </NavLink>
          )}

          <NavLink to="/catalog">
            Deals
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
