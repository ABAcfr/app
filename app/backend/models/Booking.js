import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  time: String,
  date: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  createdAt: {
    type: Date,
    default: Date.now,
  }, 
}, { timestamps: true } );

export default mongoose.model('Booking', bookingSchema);
