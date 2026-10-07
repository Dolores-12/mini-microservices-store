# Mini Microservices Store — Architecture

## 1. Project Overview

The Mini Microservices Store is a full-stack e-commerce MVP built using a microservices architecture.

The system is divided into independent services responsible for authentication, product catalog management, and order processing.

## 2. System Components

### Frontend

Responsible for:

* User interface
* User registration and login
* Product browsing
* Product management
* Cart/order interactions
* Displaying order status

### API Gateway

Responsible for:

* Receiving frontend API requests
* Routing requests to the appropriate microservice
* Providing a single entry point to the backend services

### Auth Service

Responsible for:

* User registration
* User login
* Password hashing
* JWT authentication
* Authentication-related validation

### Catalog Service

Responsible for:

* Product creation
* Product retrieval
* Product updates
* Product deletion
* Product stock information

### Order Service

Responsible for:

* Creating orders
* Retrieving orders
* Updating order status
* Validating product availability
* Reserving/releasing stock

## 3. Service Communication

The frontend communicates with the API Gateway.

The API Gateway routes requests to the appropriate backend service.

```text
Frontend
   |
   v
API Gateway
   |
   +----> Auth Service
   |
   +----> Catalog Service
   |
   +----> Order Service
```

## 4. Data Flow

### Authentication

```text
User
  |
  v
Frontend
  |
  v
API Gateway
  |
  v
Auth Service
  |
  v
Authentication Database
```

### Product Management

```text
Admin/User
    |
    v
Frontend
    |
    v
API Gateway
    |
    v
Catalog Service
    |
    v
Catalog Database
```

### Order Processing

```text
User
  |
  v
Frontend
  |
  v
API Gateway
  |
  v
Order Service
  |
  +----> Catalog Service
  |          |
  |          v
  |       Stock Check
  |
  v
Order Database
```

## 5. Git Workflow

The `main` branch represents the stable submission/production branch.

The `develop` branch is the team's integration branch.

Team members should create feature branches from `develop`.

```text
main
  |
  └── develop
        |
        ├── feature/auth
        ├── feature/catalog
        ├── feature/orders
        ├── feature/frontend
        └── feature/gateway
```

Completed feature branches should be submitted through Pull Requests and reviewed before merging into `develop`.

## 6. Technical Lead Responsibilities

The Project/Technical Lead is responsible for:

* Maintaining the overall architecture
* Coordinating service integration
* Maintaining the Git workflow
* Reviewing Pull Requests
* Resolving integration conflicts
* Ensuring services communicate correctly
* Maintaining technical documentation
* Coordinating final testing and deployment
