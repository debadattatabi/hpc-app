const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors')

const bunyan = require('bunyan');
global.log = bunyan.createLogger({name: "hpc-demo"});


// Connect Db
var initDb = require('./app/db/init.js');
initDb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// var router = express.Router();

app.get('/', function(req, res){
  res.json({'message':'Hey! Welcome to API!'})
})

app.use('/api', require('./app/controllers/VMController'));

var port = process.env.PORT || config.get('port');
app.listen(port)
console.log('Server started at ', port);