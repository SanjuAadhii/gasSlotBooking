// models/GasBooking.js
import mongoose from 'mongoose';

const GasBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
});

const GasBooking = mongoose.model('GasBooking', GasBookingSchema);

export default GasBooking;
