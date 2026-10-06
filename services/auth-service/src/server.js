require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "auth-service",
    status: "ok",
  });
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
