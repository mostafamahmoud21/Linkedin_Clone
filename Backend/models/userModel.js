const mongoose = require('mongoose');
const { Schema } = mongoose;

// const experienceSchema = new Schema({
//     title: { type: String, required: true },
//     company: { type: String, required: true },
//     location: { type: String },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date },
//     description: { type: String }
// });

// const educationSchema = new Schema({
//     school: { type: String, required: true },
//     degree: { type: String },
//     fieldOfStudy: { type: String },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date }
// });

// const jobSchema = new Schema({
//     jobTitle: { type: String, required: true },
//     jobLocation: { type: String, required: true }
// });

// const messageSchema = new Schema({
//     sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     content: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// const notificationSchema = new Schema({
//     type: { type: String, required: true },
//     content: { type: String, required: true },
//     read: { type: Boolean, default: false },
//     timestamp: { type: Date, default: Date.now }
// });

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  password: { type: String, required: false, minlength: 6 },
  profilePicture: { type: String },
  resetPasswordToken: { type: String },
  //resetPasswordExpires: Date,
  skills: [{ type: String }],
  experience: [{
    jobTitle: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    startDate: Date,
    endDate: Date
  }],
  connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
