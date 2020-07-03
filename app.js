const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');



//mongoose connection string here 
mongoose.connect('mongodb://localhost:27017/helpdesk', {useNewUrlParser: true});

mongoose.connection.once('open', () =>{
  console.log('connected');
}).on('error', (error) =>{
  console.log('connection error ', error);
});


// handling static folders and files
app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
      return filename;
    },
}));


// test route to  post the image of attachment

app.post('/api/photo', function(req,res){
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
});



// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());





module.exports = app;