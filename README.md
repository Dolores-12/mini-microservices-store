# Mini Microservices Store

A full-stack microservices-based online store developed as the TS Academy Capstone Project.

## Architecture

The application consists of:

- React Frontend
- API Gateway
- Auth Service
- Catalog Service
- Order Service
- MongoDB

## Services

### Auth Service
Responsible for:
- User registration
- Login
- Authentication
- Authorization
- User roles

### Catalog Service
Responsible for:
- Products
- Categories
- Product search
- Inventory/stock

### Order Service
Responsible for:
- Orders
- Order items
- Order totals
- Order status

## Database Architecture

MongoDB will use a database-per-service architecture:

- ministore_auth
- ministore_catalog
- ministore_orders