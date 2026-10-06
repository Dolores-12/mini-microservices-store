import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../services/catalogService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await getProduct(id);

        setProduct(
          response?.data?.product ||
            response?.data ||
            response?.product ||
            response
        );
      } catch (err) {
        setError(err.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const addToCart = () => {
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
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "store_cart",
      JSON.stringify(updatedCart)
    );

    setMessage("Product added to your cart.");
  };

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="catalog-loading">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details-page">
        <div className="catalog-error">
          <span>⚠️</span>
          <h1>Product unavailable</h1>
          <p>{error || "This product could not be found."}</p>
          <Link to="/catalog" className="btn btn-primary">
            Back to Catalog
          </Link>
        </div>
      </main>
    );
  }

  const image =
    product.images?.[0]?.url ||
    product.image ||
    product.imageUrl;

  const stock = Number(product.stock ?? 0);
  const price = Number(product.price || 0);

  return (
    <main className="product-details-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/catalog">Catalog</Link>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      <section className="product-details-card">
        <div className="product-details-image">
          {image ? (
            <img src={image} alt={product.name} />
          ) : (
            <div className="product-details-placeholder">
              🛍️
            </div>
          )}

          <span className="product-deal-badge">HOT</span>
        </div>

        <div className="product-details-info">
          <span className="section-kicker">
            FEATURED PRODUCT
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <span>★★★★★</span>
            <strong>4.8</strong>
            <small>128 reviews</small>
          </div>

          <div className="details-price">
            ₦{price.toLocaleString()}
          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-stock">
            {stock > 0 ? (
              <>
                <span>●</span>
                In stock — {stock} available
              </>
            ) : (
              <strong>Out of stock</strong>
            )}
          </div>

          {stock > 0 && (
            <>
              <div className="quantity-selector">
                <span>Quantity</span>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) =>
                        Math.max(1, value - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) =>
                        Math.min(stock, value + 1)
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="details-add-cart"
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>

              {message && (
                <div className="details-success">
                  ✓ {message}{" "}
                  <Link to="/cart">View Cart →</Link>
                </div>
              )}
            </>
          )}

          <div className="details-benefits">
            <div>
              <span>🚚</span>
              <div>
                <strong>Fast Delivery</strong>
                <small>Quick delivery to your door</small>
              </div>
            </div>

            <div>
              <span>🔒</span>
              <div>
                <strong>Secure Shopping</strong>
                <small>Your purchase is protected</small>
              </div>
            </div>

            <div>
              <span>↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <small>Shop with confidence</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;