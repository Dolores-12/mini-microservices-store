require("dotenv").config();

const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoute");

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "order-service",
    status: "ok",
  });
});

app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
