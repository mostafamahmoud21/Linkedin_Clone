const mongoose = require('mongoose');

const connection=mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected!'));

module.exports=connection