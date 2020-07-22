require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

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
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*'); // the * allows all site to access the
  res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
  );
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATHCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if ('OPTIONS' == req.method) {
  res.sendStatus(200);
  } else {
    next();
  }
});



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

app.post('/api/photo', upload.single('attachment'), (req, res, next) => {
  console.log(req)
});



app.use(__dirname + '/uploads', express.static('uploads'));


// routes
app.use('/user' ,  UserRoutes );
app.use('/app', TicketRoutes);




module.exports = app;