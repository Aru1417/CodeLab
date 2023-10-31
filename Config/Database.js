const e = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(console.log('Connected to database'))
    .catch(err => { 
        
        console.log(err); 
        process.exit(1); 
    });

}
