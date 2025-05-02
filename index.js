const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const { Server } = require("socket.io");
const http = require('http');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Static files
app.use(express.static('public'));

// Session + Flash
app.use(session({
  secret: 'your-secret-key',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Flash message middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.errors = req.flash('errors');
  next();
});

// Routes
const web = require('./routes/web');
app.use('/', web);

// Sequelize DB
const db = require('./models');
const defineAssociations = require('./models/associations');

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ MySQL Connected');

    defineAssociations(db);
    await db.sequelize.sync({ alter: true });
    console.log('📦 All models synced');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();

// Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  // 1. Join ride room
  socket.on('joinRideRoom', ({ rideId, userType }) => {
    const room = `ride_${rideId}`;
    socket.join(room);
    console.log(`${userType} joined room: ${room}`);
  });

  // 2. Share location
  socket.on('shareLocation', ({ rideId, userType, location }) => {
    const room = `ride_${rideId}`;
    socket.to(room).emit('receiveLocation', {
      from: userType,
      location
    });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
});
