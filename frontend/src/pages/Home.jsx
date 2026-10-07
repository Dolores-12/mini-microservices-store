import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../services/catalogService";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
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
        console.error("Unable to load categories:", error);
      }
    }

    loadCategories();
  }, []);

  const categoryIcons = {
    Electronics: "📱",
    Fashion: "👗",
    "Home & Living": "🏠",
    Beauty: "💄",
    Accessories: "🎧",
    Gaming: "🎮",
    Smartphones: "📱",
    Laptops: "💻",
    Kitchen: "🍳",
  };

  const deals = [
    {
      icon: "⚡",
      title: "Flash Deals",
      text: "Limited-time prices on popular products",
    },
    {
      icon: "🔥",
      title: "Hot Picks",
      text: "Trending products customers love",
    },
    {
      icon: "🎁",
      title: "Special Offers",
      text: "Discover great value every day",
    },
  ];

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🔥 TODAY'S TOP DEALS</span>

          <h1>
            Great products.
            <br />
            <span>Great prices.</span>
          </h1>

          <p>
            Discover everyday essentials, trending products and
            amazing deals all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="hero-button">
              Shop Now
            </Link>

            <Link to="/products" className="hero-secondary">
              Explore Deals →
            </Link>
          </div>

          <div className="hero-benefits">
            <span>✓ Great prices</span>
            <span>✓ Wide selection</span>
            <span>✓ Secure shopping</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle hero-circle-one"></div>
          <div className="hero-circle hero-circle-two"></div>

          <div className="floating-product product-one">
            <span>🎧</span>
            <strong>Audio</strong>
            <small>From ₦8,000</small>
          </div>

          <div className="floating-product product-two">
            <span>👟</span>
            <strong>Fashion</strong>
            <small>New arrivals</small>
          </div>

          <div className="floating-product product-three">
            <span>📱</span>
            <strong>Tech</strong>
            <small>Best sellers</small>
          </div>

          <div className="hero-shopping-bag">
            🛍️
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="benefit-item">
          <span>🚚</span>
          <div>
            <strong>Fast Delivery</strong>
            <p>Get your orders delivered quickly.</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>🔒</span>
          <div>
            <strong>Secure Shopping</strong>
            <p>Your account and orders are protected.</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>💰</span>
          <div>
            <strong>Great Value</strong>
            <p>Find products at competitive prices.</p>
          </div>
        </div>

        <div className="benefit-item">
          <span>⭐</span>
          <div>
            <strong>Quality Products</strong>
            <p>Discover products worth buying.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EXPLORE</span>
            <h2>Shop by Category</h2>
          </div>

          <Link to="/products">View All →</Link>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${encodeURIComponent(category._id)}`}
              className="category-card"
            >
              <span>
                {categoryIcons[category.name] || "🛍️"}
              </span>

              <strong>{category.name}</strong>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">DON'T MISS OUT</span>
            <h2>Today's Highlights</h2>
          </div>

          <Link to="/products">See More →</Link>
        </div>

        <div className="deal-grid">
          {deals.map((deal) => (
            <Link
              to="/products"
              className="deal-card"
              key={deal.title}
            >
              <div className="deal-icon">{deal.icon}</div>

              <div>
                <h3>{deal.title}</h3>
                <p>{deal.text}</p>

                <span>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shopping-cta">
        <div>
          <span className="section-kicker">READY TO SHOP?</span>

          <h2>Find something you'll love.</h2>

          <p>
            Browse our growing collection and discover your next
            favorite product.
          </p>
        </div>

        <Link to="/products" className="cta-button">
          Start Shopping →
        </Link>
      </section>
    </main>
  );
}

export default Home;
