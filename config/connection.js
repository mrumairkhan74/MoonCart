const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose")
const config = require('config');

const connection = mongoose.connect(`${config.get("MONGO_URI")}/Moon-Cart`);

connection.then(()=>{
    dbgr('Database connected')
})
connection.catch((err)=>{
    dbgr(err);
});

module.exports = connection;