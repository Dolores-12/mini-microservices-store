openapi: 3.0.3

info:
  title: Mini Microservices Store API
  description: |
    API documentation for the Mini Microservices Store.

    The application uses an API Gateway as the public entry point.
    Clients should communicate with the API Gateway rather than directly
    with individual microservices.

    Public Gateway:
    http://localhost:4000

    Services:
    - Auth Service: http://localhost:4001
    - Catalog Service: http://localhost:4002
    - Order Service: http://localhost:4003
  version: 1.0.0
  contact:
    name: Mini Microservices Store Team

servers:
  - url: http://localhost:4000
    description: Local API Gateway

tags:
  - name: Authentication
    description: User registration and authentication
  - name: Products
    description: Product management and product discovery
  - name: Categories
    description: Product category management
  - name: Orders
    description: Customer order management

paths:

  /api/auth/register:
    post:
      tags:
        - Authentication
      summary: Register a new customer
      description: Creates a new customer account.
      operationId: registerUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RegisterRequest"
            example:
              firstName: Dolores
              lastName: Onwugbufor
              email: customer@example.com
              password: Password123!
      responses:
        "201":
          description: User registered successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/RegisterResponse"
        "400":
          description: Required registration fields are missing
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
              example:
                success: false
                message: "First name, last name, email and password are required"
                data: null
        "409":
          description: Email address is already registered
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
              example:
                success: false
                message: "Email already registered"
                data: null
        "500":
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

  /api/auth/login:
    post:
      tags:
        - Authentication
      summary: Login
      description: Authenticates a user and returns a JWT access token.
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/LoginRequest"
            example:
              email: customer@example.com
              password: Password123!
      responses:
        "200":
          description: Login successful
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/LoginResponse"
        "400":
          description: Email and password are required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
        "401":
          description: Invalid credentials or inactive account
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
              examples:
                invalidCredentials:
                  value:
                    success: false
                    message: "Invalid email or password"
                    data: null
                inactiveAccount:
                  value:
                    success: false
                    message: "Account is inactive"
                    data: null
        "500":
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/catalog/products:
    get:
      tags:
        - Products
      summary: Get products
      description: |
        Retrieves active products.

        Products can be searched, filtered by category and price,
        and paginated.
      operationId: getProducts
      parameters:
        - name: search
          in: query
          description: Search product name or description
          required: false
          schema:
            type: string
          example: phone

        - name: category
          in: query
          description: MongoDB category ID
          required: false
          schema:
            type: string
            pattern: "^[a-fA-F0-9]{24}$"
          example: 65f1c9b2e123456789abcdef

        - name: minPrice
          in: query
          description: Minimum product price
          required: false
          schema:
            type: number
            minimum: 0
          example: 50000

        - name: maxPrice
          in: query
          description: Maximum product price
          required: false
          schema:
            type: number
            minimum: 0
          example: 500000

        - name: page
          in: query
          description: Page number
          required: false
          schema:
            type: integer
            minimum: 1
            default: 1
          example: 1

        - name: limit
          in: query
          description: Number of products per page
          required: false
          schema:
            type: integer
            minimum: 1
            default: 10
          example: 10

      responses:
        "200":
          description: Products retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductListResponse"

        "500":
          description: Failed to retrieve products
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    post:
      tags:
        - Products
      summary: Create a product
      description: |
        Creates a new product.

        The endpoint accepts multipart/form-data and supports up to
        10 product images. Uploaded images are stored using Cloudinary.
      operationId: createProduct
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: "#/components/schemas/ProductCreateRequest"
      responses:
        "201":
          description: Product created successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductResponse"

        "400":
          description: Invalid product data
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to create product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/catalog/products/{id}:
    get:
      tags:
        - Products
      summary: Get a product
      description: Retrieves an active product by ID.
      operationId: getProduct
      parameters:
        - $ref: "#/components/parameters/ProductId"
      responses:
        "200":
          description: Product retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductResponse"

        "404":
          description: Product not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to retrieve product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    put:
      tags:
        - Products
      summary: Update a product
      description: |
        Updates an existing product.

        If new images are uploaded, the existing Cloudinary images are
        removed and replaced with the new images.

        If no new images are supplied, existing images remain unchanged.
      operationId: updateProduct
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/ProductId"
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: "#/components/schemas/ProductUpdateRequest"
      responses:
        "200":
          description: Product updated successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductResponse"

        "400":
          description: Invalid product data
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "404":
          description: Product not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to update product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    delete:
      tags:
        - Products
      summary: Delete a product
      description: |
        Soft deletes a product by setting isActive to false.

        The product and its Cloudinary images are removed from active use,
        but the product document is not physically removed from MongoDB.
      operationId: deleteProduct
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/ProductId"
      responses:
        "200":
          description: Product deleted successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ProductResponse"

        "404":
          description: Product not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to delete product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/catalog/categories:
    get:
      tags:
        - Categories
      summary: Get all categories
      description: Retrieves all categories.
      operationId: getCategories
      responses:
        "200":
          description: Categories retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CategoryListResponse"

        "500":
          description: Failed to retrieve categories
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    post:
      tags:
        - Categories
      summary: Create a category
      description: Creates a new product category.
      operationId: createCategory
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CategoryCreateRequest"
            example:
              name: Electronics
              description: Electronic devices and accessories
      responses:
        "201":
          description: Category created successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CategoryResponse"

        "409":
          description: Category already exists
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to create category
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/catalog/categories/{id}:
    get:
      tags:
        - Categories
      summary: Get a category
      operationId: getCategory
      parameters:
        - $ref: "#/components/parameters/CategoryId"
      responses:
        "200":
          description: Category retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CategoryResponse"

        "404":
          description: Category not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to retrieve category
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    put:
      tags:
        - Categories
      summary: Update a category
      operationId: updateCategory
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/CategoryId"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CategoryUpdateRequest"
      responses:
        "200":
          description: Category updated successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CategoryResponse"

        "404":
          description: Category not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "409":
          description: Category already exists
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to update category
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    delete:
      tags:
        - Categories
      summary: Delete a category
      description: Deletes a category.
      operationId: deleteCategory
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/CategoryId"
      responses:
        "200":
          description: Category deleted successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CategoryResponse"

        "404":
          description: Category not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to delete category
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/orders/:
    post:
      tags:
        - Orders
      summary: Create an order
      description: Creates an order for the authenticated customer.
      operationId: createOrder
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateOrderRequest"
            example:
              items:
                - productId: 65f1c9b2e123456789abcdef
                  quantity: 2
      responses:
        "201":
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/OrderResponse"

        "400":
          description: Invalid order data
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to create order
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

    get:
      tags:
        - Orders
      summary: Get my orders
      description: Retrieves orders belonging to the authenticated customer.
      operationId: getMyOrders
      security:
        - bearerAuth: []
      responses:
        "200":
          description: Orders retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/OrderListResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to retrieve orders
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


  /api/orders/{id}:
    get:
      tags:
        - Orders
      summary: Get one order
      description: Retrieves one order belonging to the authenticated customer.
      operationId: getOrder
      security:
        - bearerAuth: []
      parameters:
        - $ref: "#/components/parameters/OrderId"
      responses:
        "200":
          description: Order retrieved successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/OrderResponse"

        "401":
          description: Authentication required
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "404":
          description: Order not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

        "500":
          description: Failed to retrieve order
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"


components:

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: |
        Enter the JWT returned by the login endpoint.

        Example:
        Bearer eyJhbGciOiJIUzI1NiIs...

  parameters:

    ProductId:
      name: id
      in: path
      required: true
      description: MongoDB product ID
      schema:
        type: string
        pattern: "^[a-fA-F0-9]{24}$"
      example: 65f1c9b2e123456789abcdef

    CategoryId:
      name: id
      in: path
      required: true
      description: MongoDB category ID
      schema:
        type: string
        pattern: "^[a-fA-F0-9]{24}$"
      example: 65f1c9b2e123456789abcdef

    OrderId:
      name: id
      in: path
      required: true
      description: MongoDB order ID
      schema:
        type: string
        pattern: "^[a-fA-F0-9]{24}$"
      example: 65f1c9b2e123456789abcdef

  schemas:

    RegisterRequest:
      type: object
      required:
        - firstName
        - lastName
        - email
        - password
      properties:
        firstName:
          type: string
          example: Dolores
        lastName:
          type: string
          example: Onwugbufor
        email:
          type: string
          format: email
          example: customer@example.com
        password:
          type: string
          format: password
          example: Password123!

    RegisterResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: User registered successfully
        data:
          $ref: "#/components/schemas/User"

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          example: customer@example.com
        password:
          type: string
          format: password
          example: Password123!

    LoginResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Login successful
        data:
          type: object
          properties:
            user:
              $ref: "#/components/schemas/User"
            token:
              type: string
              description: JWT access token
              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    User:
      type: object
      properties:
        id:
          type: string
          example: 65f1c9b2e123456789abcdef
        firstName:
          type: string
          example: Dolores
        lastName:
          type: string
          example: Onwugbufor
        email:
          type: string
          format: email
          example: customer@example.com
        role:
          type: string
          example: CUSTOMER
          enum:
            - CUSTOMER
            - ADMIN
        isActive:
          type: boolean
          example: true

    ProductImage:
      type: object
      properties:
        url:
          type: string
          format: uri
          example: https://res.cloudinary.com/example/image/upload/product.jpg
        publicId:
          type: string
          example: mini-microservices-store/products/product-image

    Product:
      type: object
      properties:
        _id:
          type: string
          example: 65f1c9b2e123456789abcdef
        name:
          type: string
          example: Wireless Bluetooth Headphones
        description:
          type: string
          example: Noise cancelling wireless headphones
        price:
          type: number
          format: float
          minimum: 0
          example: 75000
        stock:
          type: integer
          minimum: 0
          example: 25
        category:
          $ref: "#/components/schemas/Category"
        images:
          type: array
          items:
            $ref: "#/components/schemas/ProductImage"
        isActive:
          type: boolean
          example: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    ProductCreateRequest:
      type: object
      required:
        - name
        - description
        - price
        - stock
        - category
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: Wireless Bluetooth Headphones
        description:
          type: string
          minLength: 5
          maxLength: 1000
          example: Noise cancelling wireless headphones
        price:
          type: number
          minimum: 0
          example: 75000
        stock:
          type: integer
          minimum: 0
          example: 25
        category:
          type: string
          pattern: "^[a-fA-F0-9]{24}$"
          example: 65f1c9b2e123456789abcdef
        isActive:
          type: boolean
          example: true
        images:
          type: array
          maxItems: 10
          items:
            type: string
            format: binary

    ProductUpdateRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
        description:
          type: string
          minLength: 5
          maxLength: 1000
        price:
          type: number
          minimum: 0
        stock:
          type: integer
          minimum: 0
        category:
          type: string
          pattern: "^[a-fA-F0-9]{24}$"
        isActive:
          type: boolean
        images:
          type: array
          maxItems: 10
          items:
            type: string
            format: binary

    ProductResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Product retrieved successfully
        data:
          $ref: "#/components/schemas/Product"

    ProductListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Products retrieved successfully
        data:
          type: array
          items:
            $ref: "#/components/schemas/Product"
        pagination:
          $ref: "#/components/schemas/Pagination"

    Pagination:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 10
        total:
          type: integer
          example: 40
        totalPages:
          type: integer
          example: 4

    CategoryCreateRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
          example: Electronics
        description:
          type: string
          maxLength: 500
          example: Electronic devices and accessories
        isActive:
          type: boolean
          example: true

    CategoryUpdateRequest:
      type: object
      properties:
        name:
          type: string
          minLength: 2
          maxLength: 100
        description:
          type: string
          maxLength: 500
        isActive:
          type: boolean

    Category:
      type: object
      properties:
        _id:
          type: string
          example: 65f1c9b2e123456789abcdef
        name:
          type: string
          example: Electronics
        description:
          type: string
          example: Electronic devices and accessories
        isActive:
          type: boolean
          example: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    CategoryResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Category retrieved successfully
        data:
          $ref: "#/components/schemas/Category"

    CategoryListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Categories retrieved successfully
        data:
          type: array
          items:
            $ref: "#/components/schemas/Category"

    CreateOrderRequest:
      type: object
      required:
        - items
      properties:
        items:
          type: array
          minItems: 1
          items:
            type: object
            required:
              - productId
              - quantity
            properties:
              productId:
                type: string
                example: 65f1c9b2e123456789abcdef
              quantity:
                type: integer
                minimum: 1
                example: 2

    OrderItem:
      type: object
      properties:
        productId:
          type: string
          example: 65f1c9b2e123456789abcdef
        quantity:
          type: integer
          minimum: 1
          example: 2

    Order:
      type: object
      properties:
        _id:
          type: string
          example: 65f1c9b2e123456789abcdef
        userId:
          type: string
          example: 65f1c9b2e123456789abcdef
        items:
          type: array
          items:
            $ref: "#/components/schemas/OrderItem"
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    OrderResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        message:
          type: string
          example: Order created successfully
        data:
          $ref: "#/components/schemas/Order"

    OrderListResponse:
      type: object
      properties:
        success:
          type: boolean
          example: true
        count:
          type: integer
          example: 2
        data:
          type: array
          items:
            $ref: "#/components/schemas/Order"

    ErrorResponse:
      type: object
      properties:
        success:
          type: boolean
          example: false
        message:
          type: string
          example: Resource not found
        data:
          nullable: true
          example: null
        error:
          type: string
          nullable: true
          example: Error details