require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const inventoryRoutes = require("./routes/inventoryRoute");

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "catalog-service",
    status: "ok",
  });
});

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Catalog service running on port ${PORT}`);
});
