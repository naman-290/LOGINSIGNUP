const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    username :{
        type: String,

    },
    email : {
        type: String,
    },
    password :{
        type: String
    }
})

module.exports = mongoose.model("user",user)