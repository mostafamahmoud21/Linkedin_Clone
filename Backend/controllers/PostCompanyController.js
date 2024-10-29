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

exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const postId = req.params.id;
        const authorId = req.user.userId;

        const newComment = new Comment({
            comment,
            postId,
            authorId
        });

        await newComment.save();

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: "Comment added successfully", newComment });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Comment
exports.updateComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const commentId = req.params.id;
        const authorId = req.user.userId;

        const commentFound = await Comment.findOne({ _id: commentId, authorId });

        if (!commentFound) return res.status(404).json({ message: "Comment not found or you are not the author" });

        if (comment) commentFound.comment = comment;
        await commentFound.save();

        res.status(200).json({ message: "Comment updated successfully", comment: commentFound });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        const authorId = req.user.userId;
        const commentId = req.params.id;

        const comment = await Comment.findOneAndDelete({ _id: commentId, authorId });

        if (!comment) return res.status(404).json({ message: "Comment not found or you are not the author" });

        const post = await Post.findOneAndUpdate(
            { _id: comment.postId },
            { $pull: { comments: commentId } },
            { new: true }
        );

        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add Likes
exports.addLike = async (req, res) => {
    try {
        const userId = req.user.userId;
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => !id.equals(userId));
            await post.save();
            return res.status(200).json({ message: "Like removed from post" });
        } else {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


