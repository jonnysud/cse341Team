const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) =>{
    const result = await mongodb.getDatabase().db().collection('professors').find();
    result.toArray().then((professors)=>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(professors);
    })
}

const getSingle = async (req, res) =>{
    const professorId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('professors').find({_id:professorId});
    result.toArray().then((professors)=>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(professors[0]);
    })
}

const createProfessor = async (req, res) =>{
    const professor = {
        professorName : req.body.professorName,
        professorCourse : req.body.professorCourse,
        professorEmail : req.body.professorEmail,
        professorAge : req.body.professorAge,
    };
    const response = await mongodb.getDatabase().db().collection('professors').insertOne(professor);
    if(response.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while creating the professor.');
    }
}

const updateProfessor = async (req, res) =>{
    const professorId = new ObjectId(req.params.id);
    const professor = {
        professorName : req.body.professorName,
        professorCourse : req.body.professorCourse,
        professorEmail : req.body.professorEmail,
        professorAge : req.body.professorAge,
    };
    const response = await mongodb.getDatabase().db().collection('professors').replaceOne({_id:professorId}, professor);
    if(response.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the professor.');
    }
}

const deleteProfessor = async (req, res) =>{
    const professorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('professors').deleteOne({_id:professorId});
    if(response.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the professors.');
    }
}

module.exports = 
{
    getAll,
    getSingle,
    createProfessor,
    updateProfessor,
    deleteProfessor
}