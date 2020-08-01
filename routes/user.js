require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');

const CheckAuth = require('../middleware/checkAuth');


// auth from the auth database
// const passport = require('../auth/auth');

// signup
// login
// 

router.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body;

    User.find({email: email}).then(user => {
        if(user.length > 0 ){
            res.status(409).json({
                message: "Email already exist"
            })
        } else{
            bcrypt.hash(password, 10, (err, hash) => {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash
                }).save()
                .then(data => {
                    res.status(200).json({
                        message: "signup success please log in ",
                        user: data
                    });
                });
            });
        
        }
    });

    
});


router.post('/login' ,(req, res, next) => {
    const {username, password} = req.body;
    User.find({username: username}).then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "username or password is incorrect "
            });
        } else {
            bcrypt.compare(password, user[0].password, (err, response) => {
                if(response){
                    // console.log(user)
                    const token = jwt.sign({username: user[0].username, id: user[0]._id},
                        process.env.JWT_SECRET   
                    );
                    console.log(user);
                    // console.log(JSON.parse(atob(token.split('.')[1])));  // login the decoded token

                    return res.status(200).json({
                        message: "loggedIn",
                        role: user[0].role,
                        user: user[0],
                        token 
                    });
                } else {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
            } )
        }
    })
    .catch(err =>{
        // console.log(err);
        res.status(500).json({error: err})
    });


});

//  verify the token from frontend 

router.post("/verify", (req, res, next) => {
    const id =  req.body.id;
    User.find({_id: id}).then(data => {
        res.status(200).json({
            user: data
        })
    })
})


// testing auth middleware

router.get('/authtest', CheckAuth, (req, res, next) => {
    res.send('auth middleware success... ready to go')
});





module.exports = router;


