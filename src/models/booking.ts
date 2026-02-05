import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  name: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>('Booking', bookingSchema);
