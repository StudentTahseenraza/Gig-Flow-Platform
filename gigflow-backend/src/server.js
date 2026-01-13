const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const authRoutes = require('./routes/authRoutes');
const gigRoutes = require('./routes/gigRoutes');
const bidRoutes = require('./routes/bidRoutes');
const premiumRoutes = require('./routes/premiumRoutes')



// Import middleware
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : 'http://localhost:5173',
    credentials: true
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'https://gig-flow-platform.vercel.app',
      'https://gigflow-platform.vercel.app' // without hyphen if different
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// // Debug middleware for all requests
// app.use((req, res, next) => {
//   console.log(`\n=== ${new Date().toISOString()} ===`);
//   console.log(`${req.method} ${req.originalUrl}`);
//   console.log('Origin:', req.headers.origin);
//   console.log('Cookies:', req.cookies);
//   console.log('Headers:', JSON.stringify({
//     'content-type': req.headers['content-type'],
//     'user-agent': req.headers['user-agent']
//   }, null, 2));
  
//   // Log route matching
//   const originalUrl = req.originalUrl;
//   if (originalUrl.includes('/auth')) {
//     console.log(`Auth route detected: ${originalUrl}`);
//   }
  
//   next();
// });

// // Log all registered routes on startup
// console.log('\n=== REGISTERED ROUTES ===');
// console.log('POST /api/auth/register');
// console.log('POST /api/auth/login');
// console.log('POST /api/auth/logout');
// console.log('GET  /api/auth/me');
// console.log('========================\n');

// Make io accessible to controllers via request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join room based on user ID for private notifications
  socket.on('join-user-room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
  console.log('Cookies:', req.cookies)
  console.log('Headers:', req.headers['origin'])
  next()
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/premium', premiumRoutes)


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    cors: {
      allowedOrigins: ['http://localhost:5173', 'https://gig-flow-platform.vercel.app']
    }
  })
})

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!',
    timestamp: new Date().toISOString()
  })
})

// Error handler (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Socket.io is ready for real-time updates`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});