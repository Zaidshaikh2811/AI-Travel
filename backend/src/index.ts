import { Hono } from 'hono';
import { cors } from 'hono/cors'
import mongoose from 'mongoose';
import  userRouter  from './routes/User.route';
import dotenv from 'dotenv';
import tripRouter from './routes/Trip.route';
dotenv.config();


// import { tripRouter } from './routes/tripRoutes';
// import { authMiddleware } from './middleware/auth';




mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tripplanner')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const app = new Hono();


app.use( cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,

}));



// Routes
app.route('/api/users', userRouter);
app.route('/api/trips', tripRouter);

export default {
  port: process.env.PORT || 8080,
  fetch: app.fetch
};