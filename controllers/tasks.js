const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) =>{
    const result = await mongodb.getDatabase().db().collection('tasks').find();
    result.toArray().then((tasks)=>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(tasks);
    })
}

const getSingle = async (req, res) =>{
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tasks').find({_id:taskId});
    result.toArray().then((tasks)=>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(tasks[0]);
    })
}

const createTask = async (req, res) =>{
    const task = {
        taskName : req.body.taskName,
        taskCreatedDate : req.body.taskCreatedDate,
        userCreatedTask : req.body.userCreatedTask,
        taskDeadLine : req.body.taskDeadLine
    };
    const response = await mongodb.getDatabase().db().collection('tasks').insertOne(task);
    if(response.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
}

const updateTask = async (req, res) =>{
    const taskId = new ObjectId(req.params.id);
    const task = {
        taskName : req.body.taskName,
        taskCreatedDate : req.body.taskCreatedDate,
        userCreatedTask : req.body.userCreatedTask,
        taskDeadLine : req.body.taskDeadLine
    };
    const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({_id:taskId}, task);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
}

const deleteTask = async (req, res) =>{
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({_id:taskId});
    if(response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
}

module.exports = 
{
    getAll,
    getSingle,
    createTask,
    updateTask,
    deleteTask
}