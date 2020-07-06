const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const CheckAuth = require('../middleware/checkAuth');

// STATUS = ['PENDING','CLOSED','OPENED','ELEVATED','UNRESOLVED']

//get all
//post
// get by id

router.get('/tickets', CheckAuth, (req, res, next) => {
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

router.get('/tickets/:id', CheckAuth, (req, res, next) => {
    const id = req.params.id;
    Ticket.findById(id).then(data => {
        if(data){
            res.status(200).json({
                data
            })
        } else {
            res.status(200).json({
                "message": "ticket not found"
            })
        }
    })

});

router.post('/tickets',CheckAuth, (req, res, next) => {
    
    const userId = req.user.id;
    const newTicket = new Ticket({
        user: userId,
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


