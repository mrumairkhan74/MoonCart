const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose")
require('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URI);

connection.then(()=>{
    dbgr('Database connected')
})
connection.catch((err)=>{
    dbgr(err);
});

module.exports = connection;