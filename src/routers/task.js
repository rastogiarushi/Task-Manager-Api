const express = require('express')
const Tasks1 = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    //const abc = new Tasks1(req.body)
    const task = new Tasks1({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //const tasks = await Tasks1.find({ owner: req.user._id, match })
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
    
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Tasks1.findById(_id)
        const task = await Tasks1.findOne({ _id, owner: req.user._id })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    try {
        const task = await Tasks1.findOne({ _id: req.params.id, owner: req.user._id })
        //const task = await Tasks1.findById(req.params.id)

        
        //const task = await Tasks1.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true })
        if(!task){
            return  res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Tasks1.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router