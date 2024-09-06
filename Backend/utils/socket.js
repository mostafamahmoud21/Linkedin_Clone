const jwt = require('jsonwebtoken');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', ({ token }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;
        socket.join(userId);
        console.log(`User ${userId} joined room`);
      } catch (error) {
        console.error('Invalid token');
      }
    });

    // Handle sending messages
    socket.on('sendMessage', ({ token, receiverId, content }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const senderId = decoded.userId;

        // Emit message to receiver's room
        io.to(receiverId).emit('receiveMessage', { senderId, receiverId, content });

        console.log(`Message sent from ${senderId} to ${receiverId}`);
      } catch (error) {
        console.error('Error verifying token or sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;
