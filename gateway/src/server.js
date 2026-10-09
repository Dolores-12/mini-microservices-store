require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const services = require("./config/services");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

// Global middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Gateway health check
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "ok",
  });
});

// Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
  })
);

// Catalog Service
app.use(
  "/api/catalog",
  createProxyMiddleware({
    target: services.catalog,
    changeOrigin: true,

    pathRewrite: {
      "^/api/catalog": "",
    },

    on: {
      error: (err, req, res) => {
        console.error("========== CATALOG PROXY ERROR ==========");
        console.error("Error code:", err.code);
        console.error("Error message:", err.message);
        console.error("Catalog target:", services.catalog);
        console.error("Request URL:", req.originalUrl);
        console.error("=========================================");

        if (!res.headersSent) {
          res.status(502).json({
            success: false,
            message: "Catalog service unavailable",
            error: err.message,
          });
        }
      },
    },
  })
);

// Order Service
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: services.order,
    changeOrigin: true,
  })
);

// Unknown Gateway route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Gateway route not found",
  });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
