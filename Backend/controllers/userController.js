const User = require("../models/userModel.js");

// Add skills
exports.addSkills = async (req, res) => {
    try {
        const { skills } = req.body;
        const user = await User.findById(req.params.id);
        //if (!user) return res.status(404).json({ message: 'User not found' });

        user.skills.push(skills);
        await user.save();
        res.status(200).json(user.skills);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update skills
exports.updateSkill = async (req, res) => {
    try {
        const { skillIndex, newSkill } = req.body;
        const updateQuery = {
            [`skills.${skillIndex}`]: newSkill
        };

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateQuery },
            { new: true }
        );

        res.status(200).json(user.skills);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Delete skill
exports.deleteSkill = async (req, res) => {
    try {
        const { skill } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { skills: skill } },
            { new: true }
        );

        res.status(200).json(user.skills);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add education
exports.addEducation = async (req, res) => {
    try {
        const { education } = req.body;
        const user = await User.findById(req.params.id);
        //if (!user) return res.status(404).json({ message: 'User not found' });

        user.education.push(education);
        await user.save();
        res.status(200).json(user.education);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update education
exports.updateEducation = async (req, res) => {
    try {
        const { educationId, newEducation } = req.body;
        const user = await User.findById(req.params.id);

        let educationItem = user.education.id(educationId)
        if (newEducation.degree) educationItem.degree = newEducation.degree
        if (newEducation.institution) educationItem.institution = newEducation.institution
        if (newEducation.startDate) educationItem.startDate = newEducation.startDate
        if (newEducation.endDate) educationItem.endDate = newEducation.endDate
        await user.save()
        res.status(200).json(user.education);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete education
exports.deleteEducation = async (req, res) => {
    try {
        const { educationId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { education: { _id: educationId } } },
            { new: true }
        );
        res.status(200).json(user.education);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add experience
exports.addExperience = async (req, res) => {
    try {
        const { experience } = req.body;
        const user = await User.findById(req.params.id);

        user.experience.push(experience);
        await user.save();
        res.status(200).json(user.experience);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update experience
exports.updateExperienceById = async (req, res) => {
    try {
        const { experienceId, updatedExperience } = req.body;
        const user = await User.findById(req.params.id);
        let experienceItem = user.experience.id(experienceId)
        if (updatedExperience.jobTitle) experienceItem.jobTitle = updatedExperience.jobTitle
        if (updatedExperience.company) experienceItem.company = updatedExperience.company
        if (updatedExperience.startDate) experienceItem.startDate = updatedExperience.startDate
        if (updatedExperience.endDate) experienceItem.endDate = updatedExperience.endDate
        if (updatedExperience.description) experienceItem.description = updatedExperience.description
        await user.save()
        res.status(200).json(user.experience);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete experience
exports.deleteExperience = async (req, res) => {
    try {
        const { experienceId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { experience: { _id: experienceId } } },
            { new: true }
        );
        res.status(200).json(user.experience);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (password) {

            user.password = await bcrypt.hash(password, Number(process.env.ROUND));
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
