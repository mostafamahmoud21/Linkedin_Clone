const Job = require('../models/jobModel.js');

exports.addNewJob = async (req, res) => {
    try {
        const { title, description, company, location, skills, workLocation, typeOfWork, deadline } = req.body;
        const postedById = req.user.userId;

        const arraySkills = Array.isArray(skills) ? skills : [skills];

        const newJob = new Job({
            title,
            description,
            company,
            location,
            skills: arraySkills,
            workLocation,
            typeOfWork,
            deadline: deadline ? new Date(deadline) : undefined,
            postedById
        });

        await newJob.save();
        res.status(201).json({
            message: 'New job created successfully',
            job: newJob
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        Object.assign(job, updates);

        await job.save();
        res.status(200).json({
            message: 'Job updated successfully',
            job
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            message: 'Job deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({
            job
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve job' });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            jobs
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve jobs' });
    }
};
