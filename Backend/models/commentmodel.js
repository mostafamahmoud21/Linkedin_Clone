const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post schema
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User schema
  comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
