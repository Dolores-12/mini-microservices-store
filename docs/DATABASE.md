# Database Architecture

## Overview

The Mini Microservices Store uses MongoDB with a database-per-service architecture.

Each microservice owns its own database and is responsible for the data belonging to that service.

This approach provides clear service boundaries, reduces coupling between services, and allows each service to evolve independently.

## Database Structure

```text
MongoDB
│
├── store_auth
│   └── users
│
├── store_catalog
│   ├── products
│   ├── categories
│   └── inventory
│
└── store_orders
    └── orders

Service-to-Database Mapping
| Service         | Database        | Collections                           |
| --------------- | --------------- | ------------------------------------- |
| Auth Service    | `store_auth`    | `users`                               |
| Catalog Service | `store_catalog` | `products`, `categories`, `inventory` |
| Order Service   | `store_orders`  | `orders`                              |

Auth Service

The Auth Service owns:
store_auth
└── users

The users collection stores authentication and authorization information such as:

User ID
First name
Last name
Email
Password hash
Role
Account status

Passwords must never be stored in plain text.

Catalog Service

The Catalog Service owns:
store_catalog
├── products
├── categories
└── inventory

Products

Stores product information including:

Product ID
Name
Description
Price
Category reference
Product image information
Stock information where applicable
Active status
Categories

Stores product categories including:

Category ID
Category name
Description
Active status

Inventory

Stores stock-related information including:

Product reference
Available quantity
Reserved quantity
Stock status

Inventory remains owned by the Catalog Service.

Order Service

The Order Service owns:
store_orders
└── orders

The orders collection stores:

Order ID
Customer/user ID
Ordered products
Quantities
Prices at the time of purchase
Total amount
Order status
Payment-related status where applicable
Order timestamps

Orders maintain references to users and products using IDs rather than directly owning user or product records.

Service Boundaries

Services must not directly access another service's database.

For example:
Auth Service
     │
     └── store_auth

Catalog Service
     │
     └── store_catalog

Order Service
     │
     └── store_orders

The Order Service must not directly query store_catalog or store_auth.

If the Order Service requires information owned by another service, it should communicate through the appropriate service/API.

Mongoose

Each service uses Mongoose to define application-level schemas and establish its MongoDB connection.

Each service contains its own database connection module:
services/
├── auth-service/
│   └── src/config/database.js
│
├── catalog-service/
│   └── src/config/database.js
│
└── order-service/
    └── src/config/database.js

The connection URI is provided through the service environment:
MONGODB_URI=<service-specific-mongodb-connection-string>

The database connection must not be hard-coded into application source code.

Database Naming Convention

The project uses the following naming convention:
store_auth
store_catalog
store_orders

This makes service ownership immediately identifiable.

Architectural Benefits

The database-per-service approach provides:

Service isolation
Each service owns its data.
Reduced coupling
Services do not depend on another service's database schema.
Independent evolution
A service can modify its schema without directly breaking another service's database.
Improved security boundaries
Database access can be restricted to the service that owns the data.
Clear ownership
Each team responsible for a service knows exactly which data it owns.
Scalability
Services can scale their database workloads independently.

Data Ownership Rules
| Data                       | Owner           |
| -------------------------- | --------------- |
| Users                      | Auth Service    |
| Authentication credentials | Auth Service    |
| Roles                      | Auth Service    |
| Products                   | Catalog Service |
| Categories                 | Catalog Service |
| Inventory                  | Catalog Service |
| Orders                     | Order Service   |

Cross-Service Data

Cross-service relationships use IDs rather than duplicated ownership.

For example, an order may contain:
userId
productId

These IDs identify records owned by other services.

The Order Service does not become the owner of those records.

Security

Database credentials must be stored in environment variables or a secure secrets manager.

They must never be committed to Git.

.env files containing secrets must be excluded from version control.

Summary

The Mini Microservices Store uses MongoDB with separate databases for each service:
Auth Service
     ↓
store_auth

Catalog Service
     ↓
store_catalog

Order Service
     ↓
store_orders

This architecture maintains clear ownership, minimizes coupling, and supports independent development and deployment of the microservices.