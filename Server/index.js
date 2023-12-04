require('dotenv').config({path: __dirname + '/.env'})
console.log(process.env.JWT_SECRET)
console.log(process.env.useMongoDB)
console.log(process.env.MONGO_URI)
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const parcelRoutes = require('./src/routes/parcelRoutes');
const authenticateJWT = require('./src/middlewares/authenticateJWT');
const config = require('./src/config');
const connectMongoDB = require('./src/db/mongo');
// const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const port = process.env.PORT || 4000;
console.log('config.useMongoDB',config.useMongoDB);
if (config.useMongoDB) {
  console.log('inside mongo db')
  connectMongoDB();
}

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

console.log('code updated3');

// app.use(cors({
//   origin: 'http://localhost:7200',
//   credentials: true,
// }));

const corsOptions = {
  origin: 'http://localhost:7200',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/api/parcels', authenticateJWT , parcelRoutes);

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection disconnected due to app termination');
    process.exit(0);
  });
});

