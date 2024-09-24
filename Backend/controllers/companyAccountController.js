const Company = require('../models/companyModel.js');
const User = require('../models/userModel.js');
const uploadImage = require('../utils/uploadImage.js');

exports.createBusinessAccount = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            industry,
            location,
            employeesCount,
            establishedYear,
            logoUrl,
            coverImageUrl
        } = req.body;


        const userId = req.user.userId;;
        const user = await User.findById(userId);
        let uploadedLogoUrl, uploadedCoverImageUrl;
        if (logoUrl) {
            try {
                uploadedLogoUrl = await uploadImage.uploadimage(logoUrl);
            } catch (uploadError) {
                return res.status(500).json({ message: 'Image upload failed.', error: uploadError.message });
            }
        }

        if (coverImageUrl) {
            try {
                uploadedCoverImageUrl = await uploadImage.uploadimage(coverImageUrl);
            } catch (uploadError) {
                return res.status(500).json({ message: 'Image upload failed.', error: uploadError.message });
            }
        }
        const company = new Company({
            name,
            description,
            website,
            industry,
            location,
            employeesCount,
            establishedYear,
            logoUrl: uploadedLogoUrl,
            coverImageUrl: uploadedCoverImageUrl,
            createdBy: userId,
        });


        const savedCompany = await company.save();

        user.role = 'admin';
        await user.save();

        res.status(201).json({
            message: 'Business account created successfully.',
            company: savedCompany,
            user: user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.updateBusinessAccount = async (req, res) => {
    try {
        const {
            name,
            description,
            website,
            industry,
            location,
            employeesCount,
            establishedYear,
            logoUrl,
            coverImageUrl
        } = req.body;

        const { id } = req.params;
        const userId = req.user.userId;

        const company = await Company.findOne({ _id: id, createdBy: userId });
        if (!company) {
            return res.status(403).json({ message: 'Unauthorized: You do not have permission to update this company.' });
        }

        let updateData = {
            name,
            description,
            website,
            industry,
            location,
            employeesCount,
            establishedYear,
        };

        if (logoUrl) {
            try {
                updateData.logoUrl = await uploadImage.uploadimage(logoUrl);
            } catch (uploadError) {
                return res.status(500).json({ message: 'Image upload failed.', error: uploadError.message });
            }
        }

        if (coverImageUrl) {
            try {
                updateData.coverImageUrl = await uploadImage.uploadimage(coverImageUrl);
            } catch (uploadError) {
                return res.status(500).json({ message: 'Image upload failed.', error: uploadError.message });
            }
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            message: 'Business account updated successfully.',
            company: updatedCompany,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteBusinessAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const company = await Company.findOneAndDelete({ _id: id, createdBy: userId });
        if (!company) {
            return res.status(403).json({ message: 'Unauthorized: You do not have permission to delete this company.' });
        }
        if (company.logoUrl) {
            await uploadImage.deleteimage(company.logoUrl);
        }

        if (company.coverImageUrl) {
            await uploadImage.deleteimage(company.coverImageUrl);
        }


        const user = await User.findById(userId);
        if (user.role === 'admin') {
            const otherCompanies = await Company.find({ createdBy: userId });
            if (otherCompanies.length === 0) {
                user.role = 'user';
                await user.save();
            }
        }

        res.status(200).json({ message: 'Business account deleted successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
      const id = req.params.id;
      
      const profile = await Company.findById(id)
        .populate({
          path: 'posts',
          select: '-_id', 
          populate: { path: 'comments likes', select: 'content -_id' } 
        })
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.json({companyName: profile.name,profile});
      
    } catch (error) {
      console.error(`Error fetching profile with id ${req.params.id}: `, error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  