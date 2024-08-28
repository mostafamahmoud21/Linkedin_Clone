const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  visibility: { type: String, enum: ['public', 'connections'], default: 'public' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
