import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../index';
import { Booking } from '../models/booking';

const MONGODB_TEST = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/booking-manager-test';

beforeAll(async () => {
  await mongoose.connect(MONGODB_TEST);
});

afterAll(async () => {
  await Booking.deleteMany({});
  await mongoose.disconnect();
});

describe('GET /api/bookings', () => {
  it('returns an array of bookings', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/bookings', () => {
  it('creates a booking with valid data', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        name: 'John Doe',
        date: '2025-02-10',
        time: '14:00',
        guests: 2,
        notes: 'Window seat',
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('John Doe');
    expect(res.body.date).toBe('2025-02-10');
    expect(res.body.guests).toBe(2);
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ date: '2025-02-10', time: '14:00', guests: 1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });
});
