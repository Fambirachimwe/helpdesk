const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const CheckAuth = require('../middleware/checkAuth');
const multer = require('multer');
const { STATUS } = require('../util/constants');


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
    // console.log(req.body)

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

    // console.log(req.file);
    // const upload = multer({ storage: storage }).single('attachment');
    // upload(req, res, function (err) {
    //     console.log(req.file);
    //     // if (err) {
    //     //     console.log(res.send(err))
    //     // }

    //     // const userId = req.user.id;
    //     // const newTicket = new Ticket({
    //     //     user: userId,
    //     //     dateCreated: req.body.dateCreated,
    //     //     // status
    //     //     // priority
    //     //     // tags
    //     //     title: req.body.title,
    //     //     description: req.body.description,
    //     //     attachment: req.file.path
    //     // }).save()
    //     //     .then(data => {
    //     //         res.status(200).json({
    //     //             "message": "new ticket created",
    //     //             ticket: data
    //     //         });
    //     //     });
    // });

});


module.exports = router


