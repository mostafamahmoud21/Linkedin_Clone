const { config } = require('dotenv');
config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connection = require('./config/db.js');
const authRouters = require('./routes/authRoutes.js');
const userRouters = require('./routes/userRoutes.js');
const postRouters = require('./routes/postRoutes.js');
const connectionRouters = require('./routes/connectionRouters.js');
const socketHandler = require('./utils/socket.js');
const path = require('path');
const messageRouters = require('./routes/messageRouters.js');
const companyRouters = require('./routes/companyAccountRouters.js');
const PostCompanyRouters = require('./routes/PostCompanyRouters.js');
const jobRouters = require('./routes/jobRoutes.js');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());

app.use('/api/auth', authRouters);
app.use('/api/user', userRouters);
app.use('/api/posts', postRouters);
app.use('/api/connections', connectionRouters);
app.use('/api/messages', messageRouters);
app.use('/api', companyRouters);
app.use('/api',PostCompanyRouters)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/jobs', jobRouters);

socketHandler(io);
app.use(express.static(path.join(__dirname, 'public')));
 
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
