# Pharmly

A modern pharmacy billing and customer management system built with MERN stack (MongoDB, Express.js, React/Next.js, Node.js).

## 📋 Project Structure

```
pharmly/
├── pharmly-api/          # Backend API (Node.js + Express + TypeScript)
├── pharmly-web/          # Frontend Web App (Next.js + React + TypeScript)
├── pharmly-app/          # Mobile App (To be developed)
└── Documentation Files
```

## 🚀 Features

- ✅ **Store Management** - Register, login, manage pharmacy store details
- ✅ **Bill Management** - Create, view, update, delete bills with auto-calculations
- ✅ **Customer Management** - Track customers, search by WhatsApp, view purchase history
- ✅ **Analytics Dashboard** - Sales tracking, growth metrics, daily reports
- ✅ **WhatsApp Integration** - Auto-generate bill messages for WhatsApp sharing
- ✅ **Public Bill View** - Customers can view bills without authentication
- ✅ **Secure Authentication** - JWT-based authentication with bcrypt password hashing

## 📚 Documentation Files

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with all endpoints, request/response examples
- **[FEATURES.md](./FEATURES.md)** - Detailed features documentation, use cases, and business benefits
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick API reference guide for developers
- **[KNOWN_ISSUES.md](./KNOWN_ISSUES.md)** - Known issues and their fixes (all issues resolved ✅)

## 🛠️ Technology Stack

### Backend (pharmly-api)
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled

### Frontend (pharmly-web)
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Responsive Design

## 🔧 Setup Instructions

### Backend Setup

```bash
cd pharmly-api
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

### Frontend Setup

```bash
cd pharmly-web
npm install
npm run dev
```

## 📡 API Endpoints

Base URL: `https://pharmly.co.in/api` or `http://localhost:5000/api`

### Authentication
- POST `/stores/register` - Register new store
- POST `/stores/login` - Login store
- GET `/stores/details` - Get store details (Auth required)
- PUT `/stores/details` - Update store details (Auth required)

### Bills
- POST `/bills` - Create bill (Auth required)
- GET `/bills` - Get all bills (Auth required)
- GET `/bills/public/:id` - Get public bill (No auth)
- PUT `/bills/:id` - Update bill (Auth required)
- DELETE `/bills/:id` - Delete bill (Auth required)

### Customers
- GET `/patients` - Get all customers (Auth required)
- GET `/patients/search` - Search customer (Auth required)
- POST `/patients` - Create customer (Auth required)
- PUT `/patients/:id` - Update customer (Auth required)

### Analytics
- GET `/analytics/today` - Today's summary (Auth required)
- GET `/analytics/history` - Sales history (Auth required)
- GET `/analytics/recent-bills` - Recent bills (Auth required)

## ✅ All APIs Working

**Status:** All 16 API endpoints are working correctly ✅

The analytics service issue has been fixed and all endpoints are now fully functional:
- ✅ Store authentication and management
- ✅ Bill CRUD operations with calculations
- ✅ Customer management with search
- ✅ Analytics with real-time data
- ✅ Public bill view for customers

## 🎯 For Android Development

Ready for Android app integration! Check these files:
1. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API specs
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick integration guide with Kotlin examples
3. **[FEATURES.md](./FEATURES.md)** - All features, use cases, and architecture recommendations

### Android Integration Checklist
- [ ] Implement Retrofit for API calls
- [ ] Store JWT token securely (EncryptedSharedPreferences)
- [ ] Build authentication screens (Login/Register)
- [ ] Create dashboard with analytics
- [ ] Implement bill creation flow
- [ ] Add customer management
- [ ] Integrate WhatsApp sharing
- [ ] Add offline support with Room DB

## 🔒 Security Features

- ✅ JWT authentication (7-day expiry)
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ CORS configuration
- ✅ Input validation
- ✅ Authorization checks for edit/delete

## 📞 Support

For API questions or issues, refer to the documentation files or raise an issue in the repository.

## 📝 License

Private - For team use only

---

**Version:** 1.0.0  
**Last Updated:** January 16, 2026  
**Status:** Production Ready ✅  
**All APIs:** Working ✅
