const jobRouters = require('express').Router();
const jobController = require('../controllers/jobControllers.js');
const verifyToken = require('../middlewares/auth.js');

jobRouters.post('/addJob', verifyToken, jobController.addNewJob);
jobRouters.put('/:id', verifyToken, jobController.updateJob);
jobRouters.delete('/:id', verifyToken, jobController.deleteJob);
jobRouters.get('/:id', jobController.getJobById);
jobRouters.get('/', jobController.getAllJobs);

jobRouters.post('/apply/:jobId', verifyToken, jobController.uploadResume, jobController.applyForJob);

module.exports = jobRouters;
