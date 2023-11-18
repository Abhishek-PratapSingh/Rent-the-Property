require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3333 

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(
  uri,
  { useNewUrlParser: true } //useCreateIndex: true }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

//Define Routes
app.get('/', (req,res)=>{
   res.send("Home page")
})
app.use('/api/authenticate', require('./controllers/auth'));
app.use('/api/properties', require('./controllers/allproperty'));
app.use('/api/manageProperties', require('./controllers/manageProperty'));

if(!module.parent){
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
}

module.exports =app;