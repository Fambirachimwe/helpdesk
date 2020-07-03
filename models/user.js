const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    empId : {type: mongoose.Schema.Types.ObjectId, ref: "Employee"},
    username: String,

    email: {
        type: String,
        require: true,
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password: {type: String , required: true},
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
    
    
});

const User = mongoose.model('User', UserSchema);
module.exports = User;


