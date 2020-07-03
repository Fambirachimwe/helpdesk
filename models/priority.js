const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PrioritySchema = new Schema({
    name: String
});

// low, high, critical

const Priority = mongoose.model('Priority', PrioritySchema);
module.exports = Priority;
