const Subscribers = require('../models/subscriber.model')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try{
        let subscriber = await Subscribers.find()
        res.json(subscriber)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    let newSubscriber = new Subscribers({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })

    try{
        await newSubscriber.save()
        res.status(201).json("added successfully")
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
})

router.get('/:id',getSubscriber, (req, res) => {
    res.send(res.subscriber)
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove()
        res.json("deleted successfully")
    }
    catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:id', getSubscriber, async (req,res) => {
    if(req.body.name !== null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribeToChannel !== null){
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel
    }

    try{
        await res.subscriber.save()
        res.json("updated successfully")
    }
    catch(err){
        res.status(400).json({ message: err.message })
    }
})

module.exports = router

async function getSubscriber(req, res, next){
    let subscriber 
    try{
        subscriber = await Subscribers.findById(req.params.id)
        if(subscriber === null){
            return res.status(404).json("fail to find subscriber")
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}