import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import checklistRoutes from './routes/checklistRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { handleErrors } from './utils/errorHandler.js';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://edunova-frontend.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/checklist', checklistRoutes);

// Handle 404 errors
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use(handleErrors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});