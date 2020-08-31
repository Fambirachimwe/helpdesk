const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const CheckAuth = require('../middleware/checkAuth');
const multer = require('multer');
const { STATUS } = require('../util/constants');
const { route } = require('./user');




// multer middleware
// const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')

    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
});


const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024* 1024}
});


//  this is the comment or the live server extesion 


// mhata wadii ... 

// get ticket pool
router.get('/tickets', CheckAuth, (req, res, next) => {
    Ticket.find().then(data => {
        if (data.length > 0) {
            res.status(200).json({
                tickets: data // returning the all tickets onject
            });
        } else {
            res.status(200).json({
                "message": "No tickets Available"
            })
        }
    })
});



// get ticket by Id
router.get('/tickets/:id', CheckAuth, (req, res, next) => {
    const id = req.params.id;
    Ticket.findById(id).then(data => {
        if (data) {
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



// user create ticket
router.post('/tickets', CheckAuth, upload.single("attachment") , (req, res, next) => {
    const {title, description} = req.body;
    const attachment = req.file;
    const usetId = req.user.id;
    const newTicket = new Ticket({
        user: usetId,
        title: title,
        description: description,
        attachment: attachment.path
    }).save()
    .then(data => {
        res.status(200).json({
            data
        })
    })
});


// get all tickets by userId

router.get('/mytickets', CheckAuth, (req, res, next) => {
    const userId = req.user.id;
    Ticket.find({user: userId}).then(data => {
        if (data.length > 0) {
            res.status(200).json({
                tickets: data // returning the all tickets onject
            });
        } else {
            res.status(200).json({
                "message": "No tickets Available"
            })
        }
    })
});



// update ticket status 
router.put("/tickets", (req, res, next) => {
    const id = req.body.id;
    // const status = req.body.status;
    Ticket.findByIdAndUpdate({_id: id }, {status: STATUS.OPENED}, {returnOriginal: false}).then(data => {
        res.status(200).json({
            data
        })
    })
});


// change the overal status of the ticket in the admin detail page
router.put('/ticket', (req, res, next) => {
    const {id, status} = req.body;

    Ticket.findByIdAndUpdate({_id: id }, {status: status}, {returnOriginal: false}).then(data => {
        res.status(200).json({
            data
        })
    })

})


module.exports = router


