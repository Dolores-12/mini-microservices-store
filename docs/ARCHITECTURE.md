# Mini Microservices Store — Architecture

## 1. Project Overview

The Mini Microservices Store is a full-stack e-commerce MVP built using a microservices architecture.

The system is divided into independent services responsible for authentication, product catalog management, order processing, and API routing.

The frontend communicates with the backend through a centralized API Gateway.

## 2. System Architecture

```text
                         ┌─────────────────────────┐
                         │     React Frontend      │
                         │        Vite :5173       │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP/JSON
                                      ▼
                         ┌─────────────────────────┐
                         │      API Gateway        │
                         │         :4000           │
                         └────────────┬────────────┘
                                      │
                  ┌───────────────────┼───────────────────┐
                  │                   │                   │
                  ▼                   ▼                   ▼
        ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
        │   Auth Service  │ │ Catalog Service │ │  Order Service  │
        │      :4001      │ │      :4002      │ │      :4003      │
        └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
                 │                   │                   │
                 ▼                   ▼                   ▼
             MongoDB             MongoDB             MongoDB
Each backend service is independently responsible for its own business logic and data.

3. System Components
3.1 React Frontend

The frontend is built with React and Vite.

Responsibilities include:

User interface and responsive ecommerce design
User registration and login
Authentication state management
Protected routes
Product browsing
Product search and sorting
Product details
Cart management
Checkout
Order history
Order status display
Communication with backend services through the API Gateway

The frontend does not communicate directly with the individual backend services.

All backend requests are sent through:
http://localhost:4000

3.2 API Gateway

The API Gateway provides a single entry point to the backend services.

Port: 4000

Responsibilities include:

Receiving frontend API requests
Routing requests to the appropriate microservice
Providing a centralized backend entry point
Applying common middleware such as CORS, logging, and error handling

Gateway routes:
/api/auth/*       → Auth Service :4001
/api/catalog/*    → Catalog Service :4002
/api/orders/*     → Order Service :4003

3.3 Auth Service

Port: 4001

Responsibilities include:

User registration
User login
Password hashing
JWT authentication
Authentication validation
Role-based authorization
Authentication middleware

Main routes:
POST /api/auth/register
POST /api/auth/login

3.4 Catalog Service

Port: 4002

Responsibilities include:

Product creation
Product retrieval
Product updates
Product deletion
Category management
Product validation
Product stock management
Product image uploads
Cloudinary image storage

Main product routes:
GET    /api/catalog/products
POST   /api/catalog/products
GET    /api/catalog/products/:id
PUT    /api/catalog/products/:id
DELETE /api/catalog/products/:id

Category routes:
GET    /api/catalog/categories
POST   /api/catalog/categories
GET    /api/catalog/categories/:id
PUT    /api/catalog/categories/:id
DELETE /api/catalog/categories/:id

3.5 Order Service

Port: 4003

Responsibilities include:

Creating orders
Retrieving user orders
Retrieving individual orders
Validating order input
Checking product availability
Reserving stock
Releasing stock when required
Managing order status

Main routes:
POST /api/orders/
GET  /api/orders/
GET  /api/orders/:id

Order creation requires:
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2
    }
  ]
}

4. Service Communication

The frontend communicates only with the API Gateway.

The Gateway routes requests to the appropriate backend service.
Frontend :5173
     |
     | HTTP
     v
API Gateway :4000
     |
     +--------> Auth Service :4001
     |
     +--------> Catalog Service :4002
     |
     +--------> Order Service :4003

The services communicate with their respective databases and may communicate with other services when required by business operations.

5. Data Flow
5.1 Authentication
User
  |
  v
React Frontend
  |
  v
API Gateway :4000
  |
  v
Auth Service :4001
  |
  v
MongoDB

After successful login, the Auth Service returns a JWT.

The frontend stores the authentication information and sends the JWT in the Authorization header for protected requests.

5.2 Product Browsing
User
  |
  v
React Frontend
  |
  v
API Gateway :4000
  |
  v
Catalog Service :4002
  |
  v
MongoDB

Product images are stored using Cloudinary, while product image URLs and public IDs are associated with the product records.

5.3 Product Management
Admin
  |
  v
React Frontend
  |
  v
API Gateway
  |
  v
Catalog Service
  |
  +----> Product Database
  |
  +----> Cloudinary

  Product creation and updates may include product image uploads.

5.4 Order Processing
User
  |
  v
React Frontend
  |
  v
API Gateway :4000
  |
  v
Order Service :4003
  |
  +----> Catalog Service :4002
  |             |
  |             v
  |        Stock Check
  |        Stock Reservation
  |
  v
Order Database

The Order Service validates the order and checks product availability before completing the order.

6. Authentication and Authorization

Authentication is handled by the Auth Service using JSON Web Tokens (JWT).

Protected frontend pages include:

Cart
Checkout
Orders

The frontend uses an authentication context to maintain the current authentication state.

Protected backend requests include the JWT in:
Authorization: Bearer <token>

Role-based authorization is handled by the Auth Service middleware.

7. Data Storage

The project uses MongoDB for backend service data.

Each microservice maintains responsibility for its own data.

Auth Service
    |
    └── User data

Catalog Service
    |
    ├── Product data
    └── Category data

Order Service
    |
    └── Order data

    Product images are stored externally using Cloudinary.

8. Git Workflow

The main branch represents the stable submission/production branch.

The develop branch is the team's integration branch.

Team members should create feature branches from develop.

main
  |
  └── develop
        |
        ├── feature/auth-service
        ├── feature/catalog-service
        ├── feature/order-service
        ├── feature/api-gateway
        └── feature/frontend-architecture

Completed feature branches should be submitted through Pull Requests.

Pull Requests should be reviewed before merging into develop.

The general workflow is:
develop
   |
   └── Create feature branch
            |
            v
      Implement feature
            |
            v
        Test locally
            |
            v
          Push
            |
            v
      Create Pull Request
            |
            v
          Review
            |
            v
       Merge into develop

9. Development Ports
| Component       | Port |
| --------------- | ---: |
| React Frontend  | 5173 |
| API Gateway     | 4000 |
| Auth Service    | 4001 |
| Catalog Service | 4002 |
| Order Service   | 4003 |

10. Technical Lead Responsibilities

The Project/Technical Lead is responsible for:

Maintaining the overall architecture
Coordinating service integration
Maintaining the Git workflow
Reviewing Pull Requests
Resolving integration conflicts
Ensuring services communicate correctly
Maintaining technical documentation
Coordinating final testing
Coordinating deployment
Ensuring the project follows the agreed microservices architecture
11. Current Project Status

The following major components have been implemented:

React frontend architecture
Responsive ecommerce interface
Authentication service
Catalog service
Order service
API Gateway
JWT authentication
Role-based authorization
Product and category management
Product image upload through Cloudinary
Cart and checkout frontend flow
Order history frontend
Git feature-branch workflow
