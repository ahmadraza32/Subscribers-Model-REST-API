const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const port = process.env.port || 5000

mongoose.connect(process.env.db, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => console.log('db connected'))
connection.on('error', () => console.log('db failed'))

app.use(express.json())
const subscriberRouter = require('./routes/subscriber-router')
app.use('/subscribers', subscriberRouter)

app.listen(port, () => console.log("server is running"))