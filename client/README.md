# ⚡ NextGadget — Full Stack Tech Gadgets E-Commerce Web Application

A full-featured e-commerce web application for buying the latest tech gadgets. Includes an admin dashboard for managing products, brands, categories and orders, secure user authentication, wishlist, and multiple payment options.

## ✨ Features

### 👤 User Side
- Browse and filter products by **Brand** and **Category**
- Sort products by price: **Low to High / High to Low**
- Real-time **product search**
- **Wishlist** — save favourite products
- Add products to **cart**
- Update cart quantity or remove items
- Place orders via **Cash on Delivery** or **Stripe** payment
- **Track order status** (Order Placed → Packing → Shipped → Out for Delivery → Delivered)
- View full **order history**
- **Email verification** and **OTP verify** on signup
- **Forgot/Reset password** flow
- Secure **JWT authentication**
- User **profile** management

### 🔐 Admin Dashboard
- Role-based admin access
- **Brand** management (Add / Edit / Delete)
- **Category** management (Add / Edit / Delete)
- **Slider/Banner** management
- Add new products with **image upload** (Cloudinary)
- View all listed products with **pagination**
- Delete products with confirmation
- View all **customer orders** with pagination
- **Update order status** in real time
- View and manage **user list**
- View **contact/support messages**

---

## 🧰 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication & authorization |
| Cloudinary | Image upload & storage |
| Stripe | Payment gateway |
| Helmet | HTTP security headers |
| HPP | HTTP parameter pollution protection |
| CORS | Cross-origin resource sharing |
| XSS | Cross-site scripting sanitization |
| express-rate-limit | Brute force protection |
| Custom Mongo Sanitizer | NoSQL injection protection (Express 5 compatible) |

### Frontend
| Technology | Purpose |
|---|---|
| React | UI library |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Axios | HTTP requests |
| React Toastify | Toast notifications |
| React Icons | Icon library |
| Stripe.js | Frontend payment integration |

---

## 📁 Project Structure

```
NextGadget/
├── client/                       # React frontend
│   ├── src/
│   │   ├── admin/                # Admin panel & protected route
│   │   ├── animation/            # Framer Motion components
│   │   ├── assets/               # Images, logos, SVGs
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── Loader.jsx
│   │   ├── features/             # Redux slices
│   │   │   └── loaderSlice.js
│   │   ├── layout/               # Admin layout components
│   │   │   ├── Brand.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── Slider.jsx
│   │   │   ├── Add.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── OrderList.jsx
│   │   │   ├── UserList.jsx
│   │   │   └── ContactList.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── PlaceOrder.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── OrderCancel.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── OtpVerify.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Notfound.jsx
│   │   ├── store/                # Redux store setup
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── server/                       # Node.js backend
    ├── src/
    │   ├── config/               # DB and Cloudinary config
    │   ├── controllers/          # Route controllers
    │   ├── middleware/           # Auth and security middleware
    │   ├── models/               # Mongoose models
    │   └── routes/               # API routes
    ├── app.js
    ├── server.js
    ├── .env
    └── package.json
```

---

## ⚙️ Environment Variables

### Backend `/server/.env`
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

### Frontend `/client/.env`
```env
VITE_BACKEND_URL=http://localhost:4000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- Stripe account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/nextgadget.git
cd nextgadget
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env   # Fill in your environment variables
npm run dev
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/register` | Register new user |
| POST | `/api/v1/login` | Login user |
| POST | `/api/v1/email-verify` | Verify user email |
| POST | `/api/v1/otp-verify` | Verify OTP code |
| POST | `/api/v1/reset-password` | Reset user password |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/list-products` | Get all products |
| POST | `/api/v1/add-product` | Add product (Admin) |
| PUT | `/api/v1/update-product/:id` | Update product (Admin) |
| DELETE | `/api/v1/remove-product/:id` | Delete product (Admin) |

### Brand & Category
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/list-brands` | Get all brands |
| POST | `/api/v1/add-brand` | Add brand (Admin) |
| DELETE | `/api/v1/remove-brand/:id` | Delete brand (Admin) |
| GET | `/api/v1/list-categories` | Get all categories |
| POST | `/api/v1/add-category` | Add category (Admin) |
| DELETE | `/api/v1/remove-category/:id` | Delete category (Admin) |

### Cart & Wishlist
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/get-cart` | Get user cart |
| POST | `/api/v1/update-cart` | Update cart item |
| GET | `/api/v1/get-wishlist` | Get user wishlist |
| POST | `/api/v1/update-wishlist` | Update wishlist |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/user-order` | Get user orders |
| GET | `/api/v1/orders-list` | Get all orders (Admin) |
| POST | `/api/v1/update-status` | Update order status (Admin) |
| POST | `/api/v1/place-order` | Place COD order |
| POST | `/api/v1/stripe-payment` | Place Stripe order |

---

## 🛡️ Security

- JWT-based authentication with role-based access (Admin / User)
- Email verification and OTP on signup
- HTTP security headers via `Helmet`
- NoSQL injection protection via custom sanitizer (Express 5 compatible)
- XSS protection via `xss` sanitizer on request body
- HTTP parameter pollution prevention via `HPP`
- Rate limiting — 500 requests per 15 minutes per IP
- CORS restricted to allowed origins only

---

## 📦 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Images | Cloudinary |

> **Note:** Render free tier sleeps after 15 minutes of inactivity. Use [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes and prevent cold starts.

---

## 🙋‍♂️ Author

**Mustafijur Rahman**
Full Stack Developer (MERN)

- GitHub: [MustafijurMohan](https://github.com/MustafijurMohan)
- LinkedIn: [MustafijurMohan](https://linkedin.com/in/mustafijur-mohan)
- Fiverr: [MustafijurMohan](https://fiverr.com/mustafijur_123)

---

