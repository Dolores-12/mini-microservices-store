
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() => {
    const savedCart = localStorage.getItem("store_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const delivery = subtotal >= 100000 ? 0 : 2500;
  const total = subtotal + delivery;

  const handleCheckout = async () => {
    setError("");
    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      await createOrder({
        items: orderItems,
      });

      localStorage.removeItem("store_cart");

      navigate("/orders");
    } catch (err) {
      setError(err.message || "Unable to create order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Add products before proceeding to checkout.</p>
          <Link to="/catalog" className="cta-button">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <span className="section-kicker">CHECKOUT</span>
        <h1>Complete Your Order</h1>
        <p>Review your order before placing it.</p>
      </div>

      {error && (
        <div className="checkout-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      <div className="checkout-layout">
        <section className="checkout-products">
          <div className="checkout-section-header">
            <h2>Order Items</h2>
            <Link to="/cart">Edit Cart</Link>
          </div>

          {cart.map((item) => {
            const image =
              item.images?.[0]?.url ||
              item.image ||
              item.imageUrl;

            return (
              <div
                className="checkout-product"
                key={item._id}
              >
                <div className="checkout-product-image">
                  {image ? (
                    <img src={image} alt={item.name} />
                  ) : (
                    <span>🛍️</span>
                  )}
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <strong>
                  ₦
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toLocaleString()}
                </strong>
              </div>
            );
          })}

          <div className="checkout-security">
            <span>🔒</span>
            <div>
              <strong>Secure checkout</strong>
              <p>
                Your order is securely processed through our
                protected system.
              </p>
            </div>
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₦{subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <strong>
              {delivery === 0
                ? "FREE"
                : `₦${delivery.toLocaleString()}`}
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <Link to="/cart" className="back-cart">
            ← Back to Cart
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;