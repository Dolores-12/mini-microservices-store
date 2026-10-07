import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("store_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const removeItem = (productId) => {
    const updatedCart = cart.filter(
      (item) => item._id !== productId
    );

    setCart(updatedCart);
    localStorage.setItem("store_cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("store_cart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const delivery = subtotal >= 100000 ? 0 : 2500;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <span className="section-kicker">YOUR SHOPPING CART</span>
          <h1>Your cart is empty</h1>
          <p>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/catalog" className="cta-button">
            Start Shopping →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div>
          <span className="section-kicker">SHOPPING CART</span>
          <h1>Your Cart</h1>
          <p>{cart.length} item(s) ready for checkout.</p>
        </div>

        <Link to="/catalog" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => {
            const image =
              item.images?.[0]?.url ||
              item.image ||
              item.imageUrl;

            return (
              <article className="cart-item" key={item._id}>
                <div className="cart-item-image">
                  {image ? (
                    <img src={image} alt={item.name} />
                  ) : (
                    <span>🛍️</span>
                  )}
                </div>

                <div className="cart-item-details">
                  <Link
                    to={`/catalog/${item._id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p>
                    {item.description ||
                      "Quality product at a great price."}
                  </p>

                  <strong className="cart-item-price">
                    ₦{Number(item.price || 0).toLocaleString()}
                  </strong>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <strong className="cart-item-subtotal">
                  ₦
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toLocaleString()}
                </strong>
              </article>
            );
          })}
        </section>

        <aside className="cart-summary">
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

          {delivery === 0 && (
            <div className="free-delivery-message">
              ✓ You qualify for free delivery
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <strong>₦{total.toLocaleString()}</strong>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

          <div className="secure-checkout">
            🔒 Secure checkout
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Cart;