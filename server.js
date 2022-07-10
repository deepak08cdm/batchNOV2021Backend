const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Routes = require('./Routes/Routes')
const cors = require('cors')

const app = express()
mongoose.connect('mongodb+srv://deepak08:12345@cluster0.q06cc7h.mongodb.net/batchNov?retryWrites=true',{
    useNewUrlParser: true
})
mongoose.connection
.once('open', () => console.log('Connected to the database!'))
.on('error', err => console.log('Error with the database!', err));

app.use(cors())
app.use(bodyParser.json())
app.use('/',Routes)
app.listen(4000,()=>{
    console.log('connected to port 4000 and localhost')
})