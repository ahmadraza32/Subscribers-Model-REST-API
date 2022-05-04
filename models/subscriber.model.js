const mongoose = require('mongoose')

const Schema = mongoose.Schema

let subscriberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subscribeToChannel: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const Subscribers = mongoose.model('subscribers', subscriberSchema)

module.exports = Subscribers