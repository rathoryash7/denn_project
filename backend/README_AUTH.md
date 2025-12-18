# Authentication & Admin Setup Guide

This guide explains how to set up authentication and admin functionality.

## Prerequisites

1. MongoDB installed and running (local or cloud like MongoDB Atlas)
2. Node.js backend server
3. All dependencies installed

## Setup Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation

### 2. Configure MongoDB Connection

Add to `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/dehn-project
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dehn-project

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Existing email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PORT=3001
```

**Important:** 
- Change `JWT_SECRET` to a strong random string in production
- Use a secure MongoDB connection string

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Windows (if installed as service, it should auto-start)
# Or start manually:
mongod

# Linux/Mac
sudo systemctl start mongod
# OR
mongod
```

**MongoDB Atlas (Cloud):**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Seed Initial Product

Run the seed script to add the example product:

```bash
cd backend
npm run seed
```

This will create the "BCO ML2 B 180" product in your database.

### 5. Create Admin User

Create your first admin user:

```bash
cd backend
npm run create-admin admin@example.com password123 "Admin Name"
```

Replace:
- `admin@example.com` with your email
- `password123` with your desired password
- `"Admin Name"` with your name (optional)

### 6. Start Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
Server is running on port 3001
```

## API Endpoints

### Authentication

**POST /api/auth/register**
- Register a new user
- Body: `{ email, password, name? }`
- Returns: `{ success, token, user }`

**POST /api/auth/login**
- Login user
- Body: `{ email, password }`
- Returns: `{ success, token, user }`

**GET /api/auth/me**
- Get current user info
- Headers: `Authorization: Bearer <token>`
- Returns: `{ success, user }`

### Products (Public)

**GET /api/products**
- Get all active products
- Returns: `{ success, count, data }`

**GET /api/products/:id**
- Get single product by ID or part number
- Returns: `{ success, data }`

### Products (Admin Only - Requires Auth)

**POST /api/products**
- Create new product
- Headers: `Authorization: Bearer <token>`
- Body: Product data (see Product schema)

**PUT /api/products/:id**
- Update product
- Headers: `Authorization: Bearer <token>`
- Body: Updated product data

**DELETE /api/products/:id**
- Delete product (soft delete)
- Headers: `Authorization: Bearer <token>`

**GET /api/products/admin/all**
- Get all products (including inactive)
- Headers: `Authorization: Bearer <token>`

## Frontend Routes

- `/` - Home page (product detail)
- `/notepad` - Notepad page
- `/login` - Login/Register page
- `/admin` - Admin dashboard (admin only)

## Testing

1. **Register a regular user:**
   - Go to `/login`
   - Click "Register"
   - Fill in details
   - You'll be redirected to home page

2. **Login as admin:**
   - Go to `/login`
   - Use admin credentials
   - You'll be redirected to `/admin`

3. **Access admin dashboard:**
   - Only accessible when logged in as admin
   - Regular users will be redirected to home

4. **Create/Edit/Delete products:**
   - In admin dashboard
   - Click "Add New Product"
   - Fill in form and submit
   - Edit or delete existing products from the table

## Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 7 days (configurable)
- Admin routes are protected by middleware
- Always use HTTPS in production
- Change JWT_SECRET in production
- Keep `.env` file secure and never commit it

## Troubleshooting

**MongoDB connection fails:**
- Check if MongoDB is running
- Verify MONGODB_URI is correct
- Check firewall settings

**Authentication fails:**
- Verify JWT_SECRET is set in .env
- Check token expiration
- Ensure user exists in database

**Admin access denied:**
- Verify user role is "admin" in database
- Logout and login again
- Check token is valid

