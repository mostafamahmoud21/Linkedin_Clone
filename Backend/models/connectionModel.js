const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Connection', connectionSchema);
