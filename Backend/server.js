const { config } = require('dotenv');
config(); 

const express = require('express');
const  connection  = require('./config/db.js');
const authRouters = require('./routes/authRoutes.js');

const app = express();
const port = process.env.PORT; 


app.use(express.json());
app.use('/api/auth',authRouters)

app.listen(port, () => {
    console.log(`Server is running`);
});
