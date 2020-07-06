require('dotenv').config();
const jwt = require('jsonwebtoken');


const CheckAuth = (req, res, next) => {
    const token = req.headers['token'] || req.body.token;
    // console.log(token);

    if(!token) return res.status(401).send('User not authorised');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded)

        next()
    } catch(error){
        console.log("Auth Error", error);
        return res.status(400).send("Invalid token")
    }
}


/// to store the token in the fronend 

module.exports = CheckAuth;