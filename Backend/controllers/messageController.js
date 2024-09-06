const Message = require('../models/messageModel.js');

// Middleware to extract senderId from token
exports.sendMessage = async (req, res) => {
  try {
    // Extract token from authorization header

    // Extract receiverId from params and content from the body
    const { senderId } = req.user.userId
    const { receiverId } = req.params;
    const { content } = req.body;

    // Save the new message
    const newMessage = new Message({ senderId, receiverId, content });
    await newMessage.save();

    // Broadcast the message using Socket.IO
    const io = req.app.get('socketio');
    io.to(receiverId).emit('receiveMessage', newMessage);

    res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get messages between sender and receiver
exports.getMessages = async (req, res) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const senderId = decoded.userId;
    const { senderId } = req.user.userId
    const { receiverId } = req.params;

    // Find messages between sender and receiver, sorted by creation time
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId } // Get both directions
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get messages' });
  }
};
