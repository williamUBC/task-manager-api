const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.sendStatus(400);
    }
    // task.save().then(() => res.status(201).send(task))
    //     .catch((e) => {
    //         res.status(400).send(e)
    //     })
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {//虽然completeded字段应该是boolean的，但是query string传过来的是String类型的
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        let key = req.query.sortBy.split(':')[0];
        let value = req.query.sortBy.split(':')[1];
        sort[key] = value === 'desc'? -1: 1;
    }
    try {
        // const task = await Task.find({owner: req.user._id});       
        // await req.user.populate('tasks').execPopulate();
        await req.user.populate({
            path: 'tasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.sendStatus(500);
    }
    // Task.find({}).then((task) => res.send(task))
    //     .catch((e) => res.sendStatus(500));
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        //const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id, owner: req.user._id})
        if (!task) {
            return res.sendStatus(404);
        }
        res.send(task);
    } catch (error) {
        res.sendStatus(500);
    }
    // Task.findById(req.params.id).then((user) => {
    //     if (!user) {
    //         return res.sendStatus(404);
    //     }

    //     res.send(user);
    // }).catch((e) => res.sendStatus(500));
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});        
        //const task = await Task.findById(req.params.id);
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        task.save();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        
        if (!task) {
            res.sendStatus(404);
        }
        res.send(task);        
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;