import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getCategories,
  getProducts,
} from "../services/catalogService";

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const currentPageFromUrl = Number(
    searchParams.get("page") || 1
  );

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [cartMessage, setCartMessage] = useState("");

  const currentPage =
    Number.isFinite(currentPageFromUrl) &&
    currentPageFromUrl > 0
      ? currentPageFromUrl
      : 1;

  /*
   * Load categories
   */
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

  /*
   * Load products whenever the category
   * or page changes.
   */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const queryParams = new URLSearchParams();

        queryParams.set("page", currentPage);
        queryParams.set("limit", 10);

        if (selectedCategory) {
          queryParams.set("category", selectedCategory);
        }

        const response = await getProducts(
          queryParams.toString()
        );

        const productList = Array.isArray(response)
          ? response
          : response?.products ||
            response?.data?.products ||
            response?.data ||
            [];

        setProducts(productList);

        if (response?.pagination) {
          setPagination(response.pagination);
        } else {
          setPagination({
            page: currentPage,
            limit: 10,
            total: productList.length,
            totalPages: 1,
          });
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setError(
          error.message || "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, currentPage]);

  /*
   * Client-side search and sorting
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(search) ||
          product.description
            ?.toLowerCase()
            .includes(search)
        );
      });
    }

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [products, searchTerm, sortBy]);

  /*
   * Category selection
   */
  const handleCategoryChange = (categoryId) => {
    const params = {};

    if (categoryId) {
      params.category = categoryId;
    }

    params.page = 1;

    setSearchParams(params);
    setSearchTerm("");
  };

  /*
   * Pagination
   */
  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === currentPage
    ) {
      return;
    }

    const params = {};

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    params.page = page;

    setSearchParams(params);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * Generate page numbers
   */
  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1
  );

  /*
   * Cart message
   */
  const handleAddToCart = (product) => {
  if (!product || !product._id) {
    setCartMessage("Unable to add this product. Please try again.");
    return;
  }

  // Check available stock if the product has a stock field.
  const stockValue =
    product.stock ??
    product.quantity ??
    product.inventory;

  const stock =
    stockValue == null ? null : Number(stockValue);

  if (stock !== null && Number.isFinite(stock) && stock <= 0) {
    setCartMessage(`${product.name} is out of stock.`);
    return;
  }

  // Read the same cart key used by Cart.jsx.
  let cart = [];

  try {
    const savedCart = localStorage.getItem("store_cart");
    cart = savedCart ? JSON.parse(savedCart) : [];

    if (!Array.isArray(cart)) {
      cart = [];
    }
  } catch (error) {
    console.error("Unable to read cart:", error);
    setCartMessage("Unable to read your cart. Please try again.");
    return;
  }

  // Check whether this product is already in the cart.
  const existingItem = cart.find(
    (item) => item._id === product._id
  );

  const currentQuantity = Number(existingItem?.quantity || 0);

  if (
    stock !== null &&
    Number.isFinite(stock) &&
    currentQuantity + 1 > stock
  ) {
    setCartMessage(
      `Only ${stock} unit(s) of ${product.name} are available.`
    );
    return;
  }

  // Increase the quantity or add a new item.
  const updatedCart = existingItem
    ? cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: currentQuantity + 1 }
          : item
      )
    : [...cart, { ...product, quantity: 1 }];

  try {
    localStorage.setItem("store_cart", JSON.stringify(updatedCart));
    setCartMessage(`${product.name} has been added to your cart.`);
  } catch (error) {
    console.error("Unable to save cart:", error);
    setCartMessage("Unable to save your cart. Please try again.");
  }
};

    
  return (
    <main className="catalog-page">
      <div className="catalog-container">
        <div className="catalog-header">
          <div>
            <h1>Product Catalog</h1>

            <p>
              {pagination.total}{" "}
              {pagination.total === 1
                ? "Product"
                : "Products"}
            </p>
          </div>
        </div>

        {cartMessage && (
          <div className="cart-message">
            {cartMessage}
          </div>
        )}

        <div className="catalog-controls">
          <div className="category-filters">
            <button
              type="button"
              className={
                !selectedCategory
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                handleCategoryChange("")
              }
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                className={
                  selectedCategory === category._id
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  handleCategoryChange(category._id)
                }
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="catalog-sort">
            <label htmlFor="sort">
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
            >
              <option value="default">
                Default
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name">
                Name
              </option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="catalog-status">
            Loading products...
          </div>
        )}

        {error && !loading && (
          <div className="catalog-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="catalog-status">
              No products found.
            </div>
          )}

        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <>
              <div className="product-grid">
                {filteredProducts.map((product) => {
                  const imageUrl =
                    product.images?.[0]?.url ||
                    product.images?.[0] ||
                    "";

                    const stockValue =
                      product.stock ??
                      product.quantity ??
                      product.inventory;

                    const stock =
                      stockValue == null ? null : Number(stockValue);

                  return (
                    <article
                      className="product-card"
                      key={product._id}
                    >
                      <Link
                        to={`/catalog/${product._id}`}
                        className="product-image-link"
                      >
                        <div className="product-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                            />
                          ) : (
                            <span>
                              No Image
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="product-info">
                        <p className="product-category">
                          {product.category?.name ||
                            "Uncategorized"}
                        </p>

                        <h2>
                          {product.name}
                        </h2>

                        <p className="product-description">
                          {product.description}
                        </p>

                        {stock !== null && Number.isFinite(stock) && (
                           <p className="stock-status">
                             {stock > 0
                               ? `${stock} available`
                               : "Out of stock"}
                           </p>
                        )}

                        <div className="product-bottom">
                          <strong className="product-price">
                            {"\u20A6"}
                            {Number(
                              product.price || 0
                            ).toLocaleString()}
                          </strong>

                          <button
                            type="button"
                            className="add-to-cart"
                            disabled={
                              stock !== null &&
                              Number.isFinite(stock) &&
                              stock <= 0
                           }
                            onClick={() => handleAddToCart(product)}
                        >
                            {stock === 0 ? "Out of Stock" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {pagination.totalPages > 1 && (
                <nav
                  className="pagination"
                  aria-label="Product pagination"
                >
                  <button
                    type="button"
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1
                      )
                    }
                  >
                    ← Previous
                  </button>

                  <div className="pagination-pages">
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={
                          page === currentPage
                            ? "pagination-number active"
                            : "pagination-number"
                        }
                        onClick={() =>
                          handlePageChange(page)
                        }
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="pagination-button"
                    disabled={
                      currentPage ===
                      pagination.totalPages
                    }
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
      </div>
    </main>
  );
}

export default Catalog;
