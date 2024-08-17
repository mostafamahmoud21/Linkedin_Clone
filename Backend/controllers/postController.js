const Post = require('../models/postModel.js')
const uploadImage = require('../utils/uploadImage.js')
const Comment = require('../models/commentmodel.js')
const User = require("../models/userModel.js");

// Add Post
exports.addPost = async (req, res) => {
    try {
        const { content, image } = req.body
        const authorId = req.user.userId

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage.uploadimage(image);
        }
        const newPost = new Post({
            authorId,
            content,
            image: imageUrl
        })

        await newPost.save()
        const user=await User.findById(req.user.userId)
        user.posts.push(newPost._id)
        await user.save()
        res.status(201).json({ message: "Post added successfully", post: newPost });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get a Single Post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update Post
exports.updatePost = async (req, res) => {
    try {
        const { content, image, visibility } = req.body
        const authorId = req.user.userId
        const post = await Post.findOne({ $and: [{ _id: req.params.id }, { authorId: authorId }] })
        if (!post) return res.status(404).json({ message: "Post not found or you are not the author" });
        if (content) post.content = content
        if (image) post.image = await uploadImage.uploadimage(image)
        if (visibility) post.visibility = visibility
        await post.save()
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete Post
exports.deletePost = async (req, res) => {
    try {
        const authorId = req.user.userId
        const post = await Post.findOneAndDelete({ $and: [{ _id: req.params.id }, { authorId: authorId }] })
        if (!post) return res.status(404).json({ message: "Post not found or you are not the author" });
        const user = await User.findByIdAndUpdate(
            {_id:req.user.userId},
            { $pull: { posts: { _id: req.params.id } } },
            { new: true }
        );
        await user.save()
        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Add Comment
exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body
        const { postId } = req.params.id
        const { authorId } = req.user.userId
        const newComment = new Comment({
            comment,
            postId,
            authorId
        })
        await newComment.save()
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ message: "Post not found" });
        post.comments.push(newComment._id)
        await post.save()
        res.status(201).json({ message: "Comment added successfully", newComment })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}