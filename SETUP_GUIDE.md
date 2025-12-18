# Complete Setup Guide - Authentication & Admin Features

This guide will help you set up the complete authentication and admin functionality for your DEHN project.

## Prerequisites

- Node.js installed
- MongoDB installed and running (or MongoDB Atlas account)
- Git (optional)

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- Existing dependencies (express, cors, nodemailer, multer, dotenv)

## Step 2: Configure Environment Variables

Edit `backend/.env` file and add MongoDB connection and JWT secret:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/dehn-project
# OR for MongoDB Atlas (cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRE=7d

# Existing Email Configuration (already configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=yashrathore20027@gmail.com
EMAIL_PASSWORD=rxbvxzswqwokxuh
PORT=3001
```

**Important Security Notes:**
- Change `JWT_SECRET` to a strong random string (at least 32 characters) in production
- Never commit `.env` file to Git
- Use a secure MongoDB connection string in production

## Step 3: Start MongoDB

### Option A: Local MongoDB

**Windows:**
- If installed as a service, MongoDB should start automatically
- Or run manually: `mongod`

**Linux/Mac:**
```bash
sudo systemctl start mongod
# OR
mongod
```

### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in `backend/.env`

## Step 4: Seed Initial Product

Run the seed script to add the example product (BCO ML2 B 180):

```bash
cd backend
npm run seed
```

You should see: `✅ Product seeded successfully`

## Step 5: Create Admin User

Create your first admin user:

```bash
cd backend
npm run create-admin your-email@example.com your-password "Your Name"
```

**Example:**
```bash
npm run create-admin admin@dehn.com admin123 "Admin User"
```

You should see: `✅ Admin user created successfully`

## Step 6: Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
Server is running on port 3001
Health check: http://localhost:3001/api/health
```

## Step 7: Start Frontend (if not already running)

In a new terminal:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or similar port).

## Step 8: Test the Application

### Test Authentication:

1. **Register a regular user:**
   - Go to `http://localhost:5173/login`
   - Click "Don't have an account? Register"
   - Fill in email, password, and name
   - You'll be redirected to home page

2. **Login as admin:**
   - Go to `http://localhost:5173/login`
   - Enter admin credentials you created in Step 5
   - You'll be redirected to `/admin` dashboard

3. **Access admin dashboard:**
   - Only accessible when logged in as admin
   - Regular users will be redirected to home page
   - URL: `http://localhost:5173/admin`

### Test Product Management:

1. **View products:**
   - Home page (`/`) shows products from MongoDB
   - Products are fetched dynamically from the API

2. **Add new product (Admin only):**
   - Go to `/admin`
   - Click "Add New Product"
   - Fill in the form:
     - Product Name* (required)
     - Part Number* (required, must be unique)
     - Price (AED)* (required)
     - MOQ (default: 100)
     - Description (optional)
     - Full Description (optional)
   - Click "Create Product"

3. **Edit product:**
   - In admin dashboard, click "Edit" next to a product
   - Modify fields and click "Update Product"

4. **Delete product:**
   - In admin dashboard, click "Delete" next to a product
   - Confirm deletion (soft delete - sets isActive to false)

## API Endpoints Reference

### Authentication (Public)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Products (Public)
- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get single product by ID or part number

### Products (Admin Only - Requires JWT Token)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)
- `GET /api/products/admin/all` - Get all products (including inactive)

## Frontend Routes

- `/` - Home page (product detail, fetches from MongoDB)
- `/notepad` - Notepad page (unchanged)
- `/login` - Login/Register page
- `/admin` - Admin dashboard (protected, admin only)

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**
- Check MongoDB connection string
- Verify username/password in MongoDB Atlas
- Check IP whitelist in MongoDB Atlas

**Error: "MongooseServerSelectionError: connect ECONNREFUSED"**
- Check if MongoDB is running
- Verify MONGODB_URI is correct
- Check firewall settings

### Authentication Issues

**Error: "Invalid token"**
- Token may have expired (default: 7 days)
- Logout and login again
- Check JWT_SECRET in .env matches

**Error: "Access denied. Admin privileges required"**
- User role must be "admin" in database
- Verify user exists: Check MongoDB collection
- Create admin user: `npm run create-admin`

### Product Not Loading

**Error: "Product not found"**
- Run seed script: `npm run seed`
- Check MongoDB connection
- Verify product exists in database
- Check API endpoint: `http://localhost:3001/api/products`

## File Structure

```
backend/
├── models/
│   ├── User.js          # User schema (email, password, role)
│   └── Product.js       # Product schema (name, partNumber, price, etc.)
├── routes/
│   ├── auth.js          # Authentication routes (register, login)
│   └── products.js      # Product CRUD routes
├── middleware/
│   └── auth.js          # JWT authentication & admin authorization
├── scripts/
│   ├── seedProducts.js  # Seed initial product
│   └── createAdmin.js   # Create admin user
├── server.js            # Main server file
└── .env                 # Environment variables (not in Git)

src/
├── context/
│   ├── AuthContext.jsx  # Authentication state management
│   └── NotepadContext.jsx
├── pages/
│   ├── LoginPage.jsx    # Login/Register page
│   ├── AdminDashboard.jsx  # Admin product management
│   ├── ProductDetailPage.jsx  # Updated to fetch from MongoDB
│   └── NotepadPage.jsx
├── components/
│   └── ProtectedRoute.jsx  # Route protection component
└── App.jsx              # Updated with auth routes
```

## Security Best Practices

1. **Change JWT_SECRET** in production
2. **Use strong passwords** for admin accounts
3. **Enable HTTPS** in production
4. **Keep .env file secure** - never commit to Git
5. **Use MongoDB Atlas** with IP whitelist in production
6. **Regular security updates** for dependencies

## Next Steps

- Customize admin dashboard UI
- Add product image upload functionality
- Add more product fields as needed
- Implement product search/filter
- Add user management (for admins)
- Set up production environment

## Support

If you encounter any issues:
1. Check console logs (browser and server)
2. Verify MongoDB connection
3. Check environment variables
4. Review API responses in browser DevTools
5. Check MongoDB database directly

