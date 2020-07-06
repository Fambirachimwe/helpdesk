const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

STATUS = ['PENDING','CLOSED','OPENED','ELEVATED','UNRESOLVED']

//get all
//post
// get by id

router.get('/tickets', (req, res, next) => {
    Ticket.find().then(data => {
        if(data.length > 0){
            res.status(200).json({
                tickets: data // returning the all tickets onject
            });
        } else{
            res.status(200).json({
                "message": "No tickets Available"
            })
        }
    })
});

router.get('/tickets/:id/:statusId?', (req, res, next) => {
    const {id,statusId }  = req.params



    Ticket.findOneAndUpdate({ _id : id},{ $set : { status : STATUS[statusId] } },(ticket) => {
        if(!ticket)  res.sendStatus(400)
    })


    // Ticket.findById(id).then(data => {
    //     if(data){
    //         res.status(200).json({
    //             data
    //         })
    //     } else {
    //         res.status(200).json({
    //             "message": "ticket not found"
    //         })
    //     }
    // })
});

router.post('/tickets', (req, res, next) => {
    // userID is taken from then tocken when the user logs in

    

    //issue of populating 

    // .. id from the request object for now
    const userId = req.userId;
    const newTicket = new Ticket({
        userId: userId,
        dateCreated: req.body.dateCreated,
        // status
        // priority
        // tags
        title: req.body.title,
        description: req.body.description,
        // attachment
    }).save()
    .then(data => {
        res.status(200).json({
            "message": "new ticket created",
            ticket: data
        })
    })
})


module.exports = router


