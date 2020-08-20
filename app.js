require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');



// const CheckAuth = require('./middleware/checkAuth');

const UserRoutes = require('./routes/user');
const TicketRoutes = require('./routes/ticket');


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




//mongoose connection string here 
mongoose.connect(process.env.MONGODB_CONNECTION, {  useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () =>{
  console.log('connected');
}).on('error', (error) =>{
  console.log('connection error ', error);
});


// HANDLING CORS ERRORS
// CROSS ORIGIN RESOURCE SHARING 

app.use(cors());





const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024* 1024}
});
// test route to  post the image of attachment
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/api/photo', upload.single('attachment'), (req, res, next) => {
  console.log(req)
});



app.use('/uploads', express.static('uploads'));


// routes
app.use('/user' ,  UserRoutes );
app.use('/app', TicketRoutes);




module.exports = app;