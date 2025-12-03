import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  notebook: { type: String, default: '' },
  favorites: [{
    id: String,
    type: String,
    data: Object,
    savedAt: { type: Date, default: Date.now }
  }],
  achievements: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);