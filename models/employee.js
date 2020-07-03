const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmployeeSchema = new Schema({
    ecNum: {type: String},
    name: String,
    surname: String ,
    contactNumber: {type: Number, maxlength: 10}
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;

