import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moodsRouter from './routes/moods.js';

dotenv.config();

const app = express();

// Allow requests from your local frontend
app.use(cors({
  origin: "http://127.0.0.1:5500"  // Or use "*" for all origins during development
}));
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/moods', moodsRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
