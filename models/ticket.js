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
    attachment: {type: String, required: true},
    elevatedTo: {type: mongoose.Schema.Types.ObjectId, required:false}
});

// static methods to update the status and the priority

TicketSchema.methods.updateStatus = async (status) => {
    // take the sting of the status from the frontend dropdown
    // search if the string exist
    // return the id of the status string 
    // upstate the status with the id and await save

    const stId = async () => {
        Status.find({ name: status }).then(data => {
            return data._id
        });
    }

    this.status = await stId;
    await this.save()

}


TicketSchema.methods.updatePriority = async (priority) => {
    const prId = async () => {
        Priority. find({name: priority }).then(data => {
            return data._id;
        });
    }

    this.priority = await prId;
    await this.save();
}


const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;

