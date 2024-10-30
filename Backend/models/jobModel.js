const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String ,required: true},
  skills: [{ type: String }],  // Array of required skills for the job
  workLocation: { 
    type: String, 
    enum: ['Remote', 'On-site', 'Hybrid'],  // Enum for location type: Remote, On-site, or Hybrid
    required: true 
  },
  typeOfWork: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],  // Enum for type of work
    required: true 
  },
  deadline: { type: Date},
  postedById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
