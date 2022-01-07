const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

//Config
let app = express()
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json())
app.use(cors())

//API
app.get('/', (req, res)=>{
  res.send({msg:'mortgage server'})
  console.log('Get req!')
})



//Listen
let port = process.env.PORT;
if (!port) {
  port = 8080;
}
app.listen(port, ()=>{
  console.log("mortgage-data server connected")
})