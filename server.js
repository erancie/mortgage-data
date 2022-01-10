const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const { send } = require('express/lib/response');
require('dotenv').config()
const path = require('path');



//Mongo Db
const uri = `mongodb+srv://mortgageadmin:${process.env.MONGO_PW}@cluster0.ngedb.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('main db connected');
});

//DB Schemas
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  mobile: Number,
  password: String
})
//DB Models
const User = new mongoose.model('User', userSchema)


//Express
let app = express()
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json())
app.use(cors())

//static declaration (redirect to client routes after devs & change req paths in client)
// app.use(express.static(path.join(__dirname, 'houses/build')));
// app.use('/users', express.static(path.join(__dirname, 'houses/build')));

//API
app.get('/test', (req, res)=>{
  res.send({msg:'mortgage server'})
  console.log('Get req!')
})

app.route('/users')
.get((req, res) => {
  console.log('users get')
  User.find({}, (err, users)=> {
    if(err) res.send(err)
    else res.send(users)
  })
})
.post((req, res)=>{
  console.log('users post')
  const {name, password, mobile} = req.body;
  const newUser = new User({
    name:{first: name},
    mobile: mobile,
    password: password
  })
  newUser.save((err)=>
    err ? console.log(err) : console.log('New User Inserted Succesfully')
  )
})

//Listen
let port = process.env.PORT;
if (!port) {
  port = 8080;
}
app.listen(port, ()=>{
  console.log("mortgage-data server connected")
})