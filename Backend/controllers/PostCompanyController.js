const PostCompany = require('../models/postCompanyModel.js');
const Company = require('../models/companyModel.js');
const uploadImage = require('../utils/uploadImage.js');

exports.addCompanyPost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        
        const checkuser = await Company.findOne({ _id: id, createdBy: userId });
        if (!checkuser) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { content, image } = req.body;
        const companyId = checkuser._id;

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage.uploadimage(image);
        }

        const newPost = new PostCompany({
            companyId,
            content,
            image: imageUrl
        });

        await newPost.save();

        checkuser.posts.push(newPost._id);
        await checkuser.save();

        res.status(201).json({ message: "Post added successfully", post: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred while adding the post', error });
    }
};

