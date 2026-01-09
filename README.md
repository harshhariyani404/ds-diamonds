# 💎 Diamond Filter Search Web App

A full-stack MERN application for searching and filtering diamonds with an admin panel for managing diamond listings.

## Features

### User Side
- **Advanced Filter Search**: Filter diamonds by shape, carat, clarity, color, cut, polish, symmetry, fluorescence, certificate, price range, and location
- **Interactive UI**: Clickable filter chips, dropdowns, and range inputs similar to Rapnet/Idex style
- **Real-time Results**: View filtered results in a responsive table format
- **Search & Reset**: Easy search and reset functionality

### Admin Panel
- **Secure Authentication**: JWT-based admin login
- **CRUD Operations**: Add, edit, and delete diamond listings
- **Form Validation**: Comprehensive validation for all diamond attributes
- **Protected Routes**: Secure admin-only access

## Tech Stack

- **Frontend**: React 18, React Router DOM, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Styling**: CSS3 with modern UI design

## Project Structure

```
Dimond/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── Diamond.js            # Diamond schema
│   │   └── Admin.js              # Admin user schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   └── diamonds.js           # Diamond CRUD routes
│   ├── server.js                 # Express server entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── FilterPage.js     # Main filter/search page
    │   │   └── admin/
    │   │       ├── AdminLogin.js      # Admin login page
    │   │       ├── AdminDashboard.js  # Admin dashboard
    │   │       ├── DiamondForm.js    # Add/Edit diamond form
    │   │       └── PrivateRoute.js    # Protected route component
    │   ├── utils/
    │   │   ├── api.js            # Axios API configuration
    │   │   └── auth.js            # Auth utility functions
    │   ├── App.js                 # Main app component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://dsbrothers:JenishD@cluster0.ca4cei1.mongodb.net/?appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   If not set, defaults to `http://localhost:5000/api`

4. **Start the React app:**
   ```bash
   npm start
   ```
   
   App will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (Protected)

### Diamonds
- `GET /api/diamonds` - Get all diamonds with filtering
  - Query params: `shape`, `carat`, `clarity`, `color`, `cut`, `polish`, `symmetry`, `fluorescence`, `certificate`, `location`, `minPrice`, `maxPrice`, `page`, `limit`, `sortBy`, `sortOrder`
- `GET /api/diamonds/:id` - Get single diamond
- `POST /api/diamonds` - Create diamond (Protected - Admin only)
- `PUT /api/diamonds/:id` - Update diamond (Protected - Admin only)
- `DELETE /api/diamonds/:id` - Delete diamond (Protected - Admin only)

### Example Filter Query
```
GET /api/diamonds?shape=ROUND&clarity=VVS1&color=E&location=HK&minPrice=1000&maxPrice=10000
```

## Usage

### Creating Admin Account

1. Start the backend server
2. Use Postman or curl to register an admin:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "admin@example.com",
       "password": "admin123"
     }'
   ```

3. Login through the admin panel at `http://localhost:3000/admin/login`

### Adding Diamonds

1. Login to admin panel
2. Click "Add New Diamond"
3. Fill in all required fields
4. Submit the form

### Filtering Diamonds

1. Go to the home page (`http://localhost:3000`)
2. Use filter chips, dropdowns, and inputs to set filters
3. Click "Search" to apply filters
4. View results in the table below

## Diamond Attributes

- **Shape**: ROUND, PRINCESS, CUSHION, EMERALD, OVAL, PEAR, MARQUISE, RADIANT, HEART, ASSCHER
- **Clarity**: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3
- **Color**: D through Z
- **Cut/Polish/Symmetry**: EXCELLENT, VERY GOOD, GOOD, FAIR, POOR
- **Fluorescence**: NONE, FAINT, MEDIUM, STRONG, VERY STRONG
- **Certificate**: GIA, IGI, HRD, AGS, EGL, OTHER

## Development

- Backend runs on port `5000` (configurable via `.env`)
- Frontend runs on port `3000` (default React port)
- Backend uses `nodemon` for auto-restart in development
- Frontend uses React's hot-reload for development

## Security Notes

- Change `JWT_SECRET` in production
- Use strong passwords for admin accounts
- Enable HTTPS in production
- Validate and sanitize all inputs
- Use environment variables for sensitive data

## License

ISC

