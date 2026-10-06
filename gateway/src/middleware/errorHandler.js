const errorHandler = (err, req, res, next) => {
  console.error("Gateway error:", err.message);

  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      success: false,
      message: "Service temporarily unavailable",
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal gateway error",
  });
};

module.exports = errorHandler;
