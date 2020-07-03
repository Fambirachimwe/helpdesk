const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');


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

router.get('/tickets:id', (req, res, next) => {
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
})


module.exports = router


