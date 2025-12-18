# Authentication & Admin System - Quick Start

## What's Been Added

✅ **Backend:**
- MongoDB schemas (User, Product)
- JWT-based authentication (register, login)
- Admin role authorization
- Product CRUD API (admin protected)
- Password hashing with bcrypt

✅ **Frontend:**
- Login/Register page
- AuthContext for state management
- Admin Dashboard with product management
- Protected routes (admin only)
- ProductDetailPage fetches from MongoDB

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Add to `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/dehn-project
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
```

### 3. Start MongoDB (local or use MongoDB Atlas)

### 4. Seed Product & Create Admin:
```bash
cd backend
npm run seed                    # Add example product
npm run create-admin admin@example.com password123 "Admin Name"
```

### 5. Start Servers:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev
```

### 6. Test:
- Go to `/login` - Register or login
- Admin users go to `/admin` dashboard
- Regular users go to home page
- Home page fetches products from MongoDB

## Files Created

**Backend:**
- `backend/models/User.js` - User schema
- `backend/models/Product.js` - Product schema  
- `backend/routes/auth.js` - Auth routes
- `backend/routes/products.js` - Product CRUD routes
- `backend/middleware/auth.js` - JWT & admin middleware
- `backend/scripts/seedProducts.js` - Seed script
- `backend/scripts/createAdmin.js` - Admin creation script

**Frontend:**
- `src/context/AuthContext.jsx` - Auth state management
- `src/pages/LoginPage.jsx` - Login/Register UI
- `src/pages/AdminDashboard.jsx` - Admin product management
- `src/components/ProtectedRoute.jsx` - Route protection

**Updated:**
- `src/App.jsx` - Added auth routes
- `src/pages/ProductDetailPage.jsx` - Fetches from MongoDB
- `src/components/ProductInfo.jsx` - Dynamic data

See `SETUP_GUIDE.md` for detailed instructions.

