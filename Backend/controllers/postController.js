const Post = require('../models/postModel.js');
const uploadImage = require('../utils/uploadImage.js');
const Comment = require('../models/commentmodel.js');
const User = require('../models/userModel.js');

// Add Post
exports.addPost = async (req, res) => {
    try {
        const { content, image } = req.body;
        const authorId = req.user.userId;

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage.uploadimage(image);
        }
        const newPost = new Post({
            authorId,
            content,
            image: imageUrl
        });

        await newPost.save();

        const user = await User.findById(authorId);
        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json({ message: "Post added successfully", post: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a Single Post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments');
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Post
exports.updatePost = async (req, res) => {
    try {
        const { content, image, visibility } = req.body;
        const authorId = req.user.userId;
        const post = await Post.findOne({ _id: req.params.id, authorId });

        if (!post) return res.status(404).json({ message: "Post not found or you are not the author" });

        if (content) post.content = content;
        if (image) post.image = await uploadImage.uploadimage(image);
        if (visibility) post.visibility = visibility;

        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const authorId = req.user.userId;
        const post = await Post.findOneAndDelete({ _id: req.params.id, authorId });

        if (!post) return res.status(404).json({ message: "Post not found or you are not the author" });

        await User.findByIdAndUpdate(
            authorId,
            { $pull: { posts: post._id } },
            { new: true }
        );

        await Comment.deleteMany({ postId: post._id });

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add Comment
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


