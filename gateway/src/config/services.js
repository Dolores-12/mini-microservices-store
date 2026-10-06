const services = {
  auth: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
  catalog: process.env.CATALOG_SERVICE_URL || "http://localhost:4002",
  order: process.env.ORDER_SERVICE_URL || "http://localhost:4003",
};

module.exports = services;
