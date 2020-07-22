const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Status = require('./status');
// const Priority = require('./priority');
const {STATUS, PRIORITY} = require('../util/constants');

const TicketSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId },
    dateCreated: { type: Date, default: Date.now },
    status: {type: String, default: STATUS.PENDING }, ///
    priority: { type: String, default: PRIORITY.LOW }, ///
    tags: [String],
    title: String,
    description: String,
    attachment: {type: String},
    elevatedTo: {type: mongoose.Schema.Types.ObjectId, required:false}
});


// static methods to update the status and the priority

TicketSchema.methods.updateStatus = async (status) => {
    // takes status from the frontend and updates the status string 
    this.status = status;
    await this.save()
}


TicketSchema.methods.updatePriority = async (priority) => {
    // takes the priority from the frontend and updates the priority string
    this.priority = priority;
    await this.save();
}


const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;

