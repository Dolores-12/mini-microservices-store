import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await getMyOrders();

        setOrders(
          Array.isArray(response)
            ? response
            : response?.data?.orders ||
              response?.orders ||
              response?.data ||
              []
        );
      } catch (err) {
        setError(err.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <div className="catalog-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="catalog-error">
          <span>⚠️</span>
          <h1>Unable to load orders</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-heading">
        <div>
          <span className="section-kicker">MY ACCOUNT</span>
          <h1>My Orders</h1>
          <p>Track and review your purchases.</p>
        </div>

        <Link to="/catalog" className="cta-button">
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div>📦</div>
          <h2>No orders yet</h2>
          <p>
            Your completed purchases will appear here.
          </p>
          <Link to="/catalog" className="cta-button">
            Browse Products →
          </Link>
        </div>
      ) : (
        <section className="orders-list">
          {orders.map((order) => {
            const status = order.status || "Pending";

            return (
              <article
                className="order-card"
                key={order._id}
              >
                <div className="order-card-header">
                  <div>
                    <span>ORDER</span>
                    <h2>
                      #{String(order._id).slice(-8).toUpperCase()}
                    </h2>
                  </div>

                  <span
                    className={`order-status ${status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {status}
                  </span>
                </div>

                <div className="order-card-body">
                  <div>
                    <small>Total</small>
                    <strong>
                      ₦
                      {Number(
                        order.total ||
                          order.totalAmount ||
                          0
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <small>Items</small>
                    <strong>
                      {order.items?.length || 0}
                    </strong>
                  </div>

                  <div>
                    <small>Date</small>
                    <strong>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </strong>
                  </div>
                </div>

                <div className="order-card-footer">
                  <span>
                    🔒 Order securely processed
                  </span>

                  <span>Order received ✓</span>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Orders;