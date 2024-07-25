const { config } = require('dotenv');
config(); 

const express = require('express');
const  connection  = require('./config/db.js');

const app = express();
const port = process.env.PORT; 


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running`);
});
