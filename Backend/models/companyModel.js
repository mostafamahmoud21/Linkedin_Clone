const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true }, 
  description: { type: String },
  website: { type: String },
  industry: { type: String },
  location: { type: String },
  employeesCount: { type: Number },
  establishedYear: { type: Number },
  logoUrl: { type: String },
  coverImageUrl: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  posts: { type: [Schema.Types.ObjectId], ref: 'PostCompany', default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', companySchema);
