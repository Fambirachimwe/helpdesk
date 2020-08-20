const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    
    username: String,

    email: {
        type: String,
        require: true,
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,  
    },

    password: {type: String , required: true},
    role: {type: String, default: "User"}
       
});

const User = mongoose.model('User', UserSchema);
module.exports = User;


