const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
});

const educationSchema = new Schema({
    school: { type: String, required: true },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
});

const jobSchema = new Schema({
    jobTitle: { type: String, required: true },
    jobLocation: { type: String, required: true }
});

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const notificationSchema = new Schema({
    type: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true, minlength: 6 },
    profilePicture: { type: String },
    headline: { type: String },
    location: { type: String },
    industry: { type: String },
    currentPosition: { type: String },
    summary: { type: String },
    experience: [experienceSchema],
    education: [educationSchema],
    jobTitle: { type: String },
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary'] },
    mostRecentCompany: { type: String },
    kindOfJob: [jobSchema],
    connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [messageSchema],
    notifications: [notificationSchema],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
