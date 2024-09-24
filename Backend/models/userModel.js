const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] },
  connections: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  posts: { type: [Schema.Types.ObjectId], ref: 'Post', default: [] },
  notifications: { type: [String], default: [] },
  experience: { type: [Object], default: [] },
  education: { type: [Object], default: [] },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;