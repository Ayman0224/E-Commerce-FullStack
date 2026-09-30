# Rammal Store

A full-stack e-commerce application built with React, Node.js, Express, and SQLite.

Rammal Store includes user authentication, JWT-based authorization, password hashing, persistent user-specific shopping carts, checkout with a payment sandbox, order creation, and automatic inventory updates after successful payment.

## Features

* User registration and login
* Password hashing with bcrypt
* JWT authentication
* Protected frontend routes
* Persistent shopping cart
* Separate cart for each user
* Product listing from the backend database
* Add and remove products from cart
* Increase and decrease product quantities
* Checkout page
* Payment sandbox
* Order creation
* Order items storage
* Automatic inventory/stock updates
* Out-of-stock handling
* Responsive user interface
* User account dropdown
* Logout functionality
* SQLite database

## Tech Stack

### Frontend

* React
* React Router
* Vite
* Context API
* React Toastify
* CSS

### Backend

* Node.js
* Express.js
* SQLite
* bcrypt
* JSON Web Token (JWT)
* dotenv
* CORS

## Project Structure

```text
ecommerce-new/
│
├── public/
│   └── images/
│       ├── iphone15.jfif
│       ├── GalaxyS24.jfif
│       └── AirPodsPro.jfif
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   └── Checkout.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── backend/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── database.js
│   ├── server.js
│   ├── .env
│   └── database.sqlite
│
├── .gitignore
├── package.json
└── README.md
```

## Database

The application uses SQLite as its local database.

The database contains the following tables:

### Users

Stores registered user accounts.

```text
id
name
email
password
```

Passwords are never stored as plain text. They are hashed using bcrypt before being saved.

### Products

Stores the available products.

```text
id
name
description
price
stock
image
```

### Orders

Stores completed orders.

```text
id
user_id
total
created_at
```

### Order Items

Stores the products included in each order.

```text
id
order_id
product_id
quantity
price
```

## Authentication

Rammal Store uses JWT-based authentication.

### Registration

When a user creates an account:

1. The frontend sends the user's information to the backend.
2. The password is hashed using bcrypt.
3. The hashed password is stored in SQLite.
4. The user account is created.

### Login

When a user logs in:

1. The backend finds the account using the email.
2. bcrypt compares the entered password with the stored hash.
3. A JWT is generated after successful authentication.
4. The token is stored on the frontend.
5. Protected pages can then be accessed.

The JWT contains the authenticated user's ID.

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
JWT_SECRET=your_secret_key
```

The JWT secret is used to sign and verify authentication tokens.

The `.env` file should not be committed to GitHub.

Make sure `.gitignore` contains:

```gitignore
.env
node_modules/
```

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project:

```bash
cd ecommerce-new
```

Install frontend dependencies:

```bash
npm install
```

Navigate to the backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

## Running the Application

### Start the Backend

From the `backend` folder:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and navigate to the project root:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

Creates a new user account.

#### Login

```http
POST /api/auth/login
```

Authenticates a user and returns a JWT token.

---

### Products

#### Get Products

```http
GET /api/products
```

Returns all available products from the database.

---

### Payment

#### Payment Sandbox

```http
POST /api/payment/sandbox
```

Simulates a successful payment transaction.

#### Process Payment

```http
POST /api/payment/pay
```

Processes the checkout request for an authenticated user.

The endpoint:

* Verifies the JWT
* Validates the products
* Checks product stock
* Calculates the order total
* Creates the order
* Creates order items
* Updates product inventory

## Shopping Cart

The shopping cart is stored using the browser's local storage.

Each authenticated user receives a separate cart based on their user ID.

For example:

```text
cart_user_1
cart_user_2
```

This prevents different users from sharing the same cart on the same browser.

The cart persists after refreshing the page.

## Checkout Flow

The checkout process works as follows:

```text
User adds products
        ↓
Shopping Cart
        ↓
Checkout
        ↓
Payment Sandbox
        ↓
JWT Verification
        ↓
Stock Validation
        ↓
Create Order
        ↓
Create Order Items
        ↓
Decrease Product Stock
        ↓
Payment Successful
        ↓
Clear Cart
```

## Inventory Management

Product inventory is stored in the SQLite database.

Before completing an order, the backend checks whether enough stock is available.

For example:

```text
Product stock: 10
User purchases: 2

New stock: 8
```

If the requested quantity is greater than the available stock, the payment request is rejected.

## Security

The project implements several security-related practices:

* Password hashing with bcrypt
* JWT-based authentication
* Protected frontend routes
* JWT verification on payment requests
* Environment variables for the JWT secret
* Parameterized SQL queries
* CORS configuration
* Authentication required for checkout/payment

## User Flow

A typical user journey is:

```text
Register
   ↓
Login
   ↓
Browse Products
   ↓
Add Products to Cart
   ↓
View Cart
   ↓
Checkout
   ↓
Payment Sandbox
   ↓
Order Created
   ↓
Inventory Updated
   ↓
Cart Cleared
```

## Screens

The application contains the following main pages:

* Login
* Register
* Products
* Shopping Cart
* Checkout

The navigation bar also provides:

* Products
* Cart
* User account menu
* My Account
* My Orders
* Logout

## Development

This project was built as a full-stack e-commerce learning project to practice:

* React development
* REST APIs
* Node.js and Express
* SQLite databases
* Authentication
* JWT
* Password hashing
* Local storage
* Shopping cart state management
* Checkout workflows
* Inventory management

## Future Improvements

Possible future improvements include:

* Real Stripe payment integration
* Order history page
* Product search and filtering
* Product details pages
* Admin dashboard
* Product management
* User profile management
* Server-side cart storage
* Better form validation
* Refresh token authentication
* Production database
* Deployment

## Author

**Ayman Rammal**

Computer Science Student

Built with React, Node.js, Express, and SQLite.
