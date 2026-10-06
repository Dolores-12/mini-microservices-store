import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/catalogService";

function Catalog() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();

        const productList = Array.isArray(response)
          ? response
          : response?.products ||
            response?.data?.products ||
            response?.data ||
            [];

        setProducts(productList);
      } catch (err) {
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search)
        );
      });
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [products, searchTerm, sortBy]);

  const addToCart = (product) => {
    const savedCart = localStorage.getItem("store_cart");

    const cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "store_cart",
      JSON.stringify(updatedCart)
    );

    setCartMessage(`${product.name} added to cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  if (loading) {
    return (
      <main>
        <div className="catalog-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="catalog-error">
          <span>⚠️</span>

          <h1>Unable to load products</h1>

          <p>{error}</p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="catalog-page">
      {/* Page heading */}
      <section className="catalog-header">
        <div>
          <span className="section-kicker">DISCOVER</span>

          <h1>Product Catalog</h1>

          <p>
            Find products you'll love at prices you'll love.
          </p>
        </div>

        <div className="catalog-count">
          <strong>{products.length}</strong>
          <span>Products</span>
        </div>
      </section>

      {/* Search / filter */}
      <section className="catalog-toolbar">
        <div className="catalog-search">
          <span>🔎</span>

          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="catalog-sort">
          <label htmlFor="sort">Sort by</label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="name">Name</option>
          </select>
        </div>
      </section>

      {/* Cart notification */}
      {cartMessage && (
        <div className="cart-toast">
          <span>✓</span>

          <p>{cartMessage}</p>

          <Link to="/cart">View Cart →</Link>
        </div>
      )}

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="catalog-empty">
          <div>🔎</div>

          <h2>No products found</h2>

          <p>
            Try a different search term or clear your search.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setSearchTerm("")}
          >
            View All Products
          </button>
        </div>
      ) : (
        <section className="catalog-grid">
          {filteredProducts.map((product) => {
            const image =
              product.image ||
              product.imageUrl ||
              product.images?.[0];

            const stock =
              product.stock ??
              product.quantity ??
              product.inventory ??
              null;

            return (
              <article
                className="store-product-card"
                key={product._id}
              >
                <Link
                  to={`/catalog/${product._id}`}
                  className="store-product-image"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                    />
                  ) : (
                    <div className="product-placeholder">
                      🛍️
                    </div>
                  )}

                  <span className="product-deal-badge">
                    HOT
                  </span>

                  <button
                    type="button"
                    className="wishlist-button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    ♡
                  </button>
                </Link>

                <div className="store-product-info">
                  <Link
                    to={`/catalog/${product._id}`}
                    className="store-product-name"
                  >
                    {product.name}
                  </Link>

                  <div className="product-rating">
                    <span>★</span>
                    <span>4.8</span>
                    <small>
                      (128)
                    </small>
                  </div>

                  <p className="store-product-description">
                    {product.description ||
                      "Quality product at a great price."}
                  </p>

                  <div className="store-product-pricing">
                    <strong>
                      ₦{Number(product.price || 0).toLocaleString()}
                    </strong>

                    <span className="old-price">
                      ₦
                      {Math.round(
                        Number(product.price || 0) * 1.25
                      ).toLocaleString()}
                    </span>

                    <span className="discount-badge">
                      -20%
                    </span>
                  </div>

                  {stock !== null && (
                    <div className="stock-status">
                      {Number(stock) > 0 ? (
                        <>
                          <span className="stock-dot"></span>
                          {Number(stock)} left
                        </>
                      ) : (
                        <span className="out-of-stock">
                          Out of stock
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    className="add-cart-button"
                    disabled={stock !== null && Number(stock) <= 0}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Catalog;