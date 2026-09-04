# Express Layered Microservices

A production-ready Node.js backend boilerplate implementing **JWT authentication**, **GitHub OAuth 2.0**, **Role-Based Access Control (RBAC)**, and a **clean layered architecture** (Controllers → Services → Repositories → Models). Built with scalability and maintainability in mind.

---

## ✨ Features

- ✅ **JWT Authentication** – Access & Refresh tokens with secure cookie handling
- ✅ **GitHub OAuth 2.0** – Seamless third-party login with account linking
- ✅ **Role-Based Access Control** – `user` and `service_provider` roles
- ✅ **Layered Architecture** – Controllers → Services → Repositories → Models
- ✅ **MongoDB Integration** – Mongoose ODM with schema validation and indexing
- ✅ **Password Hashing** – Bcrypt with pre-save hooks
- ✅ **Global Error Handling** – Centralized error middleware with `ApiError`
- ✅ **Environment Configuration** – Dotenv for secure secret management
- ✅ **Modular Codebase** – Clean separation of concerns for easy scaling

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js (ES Modules) |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB + Mongoose ODM |
| **Authentication** | JWT, Passport.js (GitHub Strategy), Bcrypt |
| **Security** | Cookie-Parser, CORS |
| **Utilities** | Dotenv, Nodemon |
| **Architecture** | Layered Microservices (Controllers → Services → Repositories → Models) |

---

## 📁 Project Structure

```bash
src/
├── config/
│   ├── db.config.js          # MongoDB connection
│   └── passport.config.js    # GitHub OAuth strategy
├── controllers/
│   ├── auth.controller.js    # Registration logic
│   └── user.login.controller.js  # Login logic
├── middlewares/
│   └── auth.middleware.js    # JWT verification & validation
├── models/
│   └── register.model.js     # User schema with hooks & methods
├── routes/
│   └── auth.route.js         # Authentication routes
├── utils/
│   ├── ApiError.js           # Custom error class
│   ├── ApiResponse.js        # Standardized response wrapper
│   └── asyncHandler.js       # Async error catcher
├── app.js                    # Express app configuration
└── index.js                  # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- GitHub OAuth App (for OAuth login)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Muhammadisaad/express-layered-microservicess.git
cd express-layered-microservicess
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Fill in the required values (see [Environment Variables](#-environment-variables)).

4. **Start the development server**

```bash
npm run dev
```

Server runs at `http://localhost:8000` (or your configured port).

---

## 🔐 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ |
| `POST` | `/api/v1/auth/login` | Login with email + password | ❌ |
| `GET` | `/api/v1/auth/github` | Initiate GitHub OAuth login | ❌ |
| `GET` | `/api/v1/auth/github/callback` | GitHub OAuth callback (handles redirect) | ❌ |

---

### Authentication Flow

#### 1. Email/Password Registration

```json
POST /api/v1/auth/register
{
  "username": "john_doe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### 2. Email/Password Login

```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "username": "john_doe",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 3. GitHub OAuth Login

1. Navigate to `/api/v1/auth/github` in your browser.
2. Authorize the application on GitHub.
3. You'll be redirected back with JWT tokens in the response.

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your_database

ACCESS_TOKEN_SECRET=your_secret_key_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret_key_here
REFRESH_TOKEN_EXPIRY=7d

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers) → OAuth Apps → New OAuth App.
2. Set **Homepage URL** to `http://localhost:8000`.
3. Set **Authorization callback URL** to `http://localhost:8000/api/v1/auth/github/callback`.
4. Copy the `Client ID` and `Client Secret` into your `.env`.

---

## 🛡️ Security Features

- **Password Hashing:** Bcrypt with salt rounds (6)
- **JWT Tokens:** Short-lived access tokens + long-lived refresh tokens
- **OAuth Account Linking:** Users can link GitHub to existing email/password accounts
- **Sparse Indexing:** `githubId` field is `sparse: true` to allow multiple users without GitHub IDs
- **Password Flexibility:** OAuth users have `password: null` and are blocked from password-based login

---

---

## 📝 License

This project is [ISC](https://choosealicense.com/licenses/isc/)-licensed.

---

## 👤 Author

**Muhammad Saad Nadeem**

- GitHub: [@Muhammadisaad](https://github.com/Muhammadisaad)
- LinkedIn: [Muhammad Saad Naseem](https://www.linkedin.com/in/muhammad-saad-naseem-663364357/)

---

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!