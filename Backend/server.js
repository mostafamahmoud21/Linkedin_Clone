const { config } = require('dotenv');
config(); 

const express = require('express');
const  connection  = require('./config/db.js');
const authRouters = require('./routes/authRoutes.js');
const userRouters = require('./routes/userRoutes.js');
const postRouters = require('./routes/postRoutes.js');

const app = express();
const port = process.env.PORT; 


app.use(express.json());
app.use('/api/auth',authRouters)
app.use('/api/user',userRouters)
app.use('/api',postRouters)

app.listen(port, () => {
    console.log(`Server is running`);
});
