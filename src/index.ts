import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bookingsRouter from './routes/bookings';

const app = express();
const PORT = process.env.PORT ?? 3001;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/booking-manager';

// Lazy MongoDB connect for Vercel serverless (no startup; connect on first request)
let connectPromise: Promise<typeof mongoose> | null = null;
app.use(async (_req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  try {
    if (!connectPromise) connectPromise = mongoose.connect(MONGODB_URI);
    await connectPromise;
    next();
  } catch (e) {
    console.error('MongoDB connect failed:', e);
    res.status(500).json({ error: 'Database unavailable' });
  }
});

app.use(cors({ origin: process.env.CORS_ORIGIN ?? true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/bookings', bookingsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('MongoDB connection failed:', e);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  start();
}

export { app };
