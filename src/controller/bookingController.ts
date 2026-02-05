import { Request, Response } from 'express';
import { Booking } from '../models/booking';

export async function getAllBookings(_req: Request, res: Response): Promise<void> {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}


export async function createBooking(req: Request, res: Response): Promise<void> {
  try {
    const { name, date, time, guests, notes } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!date || typeof date !== 'string' || !date.trim()) {
      res.status(400).json({ error: 'Date is required' });
      return;
    }
    if (!time || typeof time !== 'string' || !time.trim()) {
      res.status(400).json({ error: 'Time is required' });
      return;
    }
    const numGuests = Number(guests);
    if (!Number.isInteger(numGuests) || numGuests < 1) {
      res.status(400).json({ error: 'Guests must be a positive number' });
      return;
    }

    const booking = await Booking.create({
      name: name.trim(),
      date: date.trim(),
      time: time.trim(),
      guests: numGuests,
      notes: typeof notes === 'string' ? notes.trim() : '',
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
}
