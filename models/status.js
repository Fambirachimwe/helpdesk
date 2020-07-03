const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatusSchema = new Schema({
    name: String
});

// pending opened, elevated, completed, unresolved

const Status = mongoose.model('Status', StatusSchema);
module.exports = Status;
