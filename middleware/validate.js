const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        firstName : 'required|string',
        lastName : 'required|string',
        email: 'required|email',
        course: 'required|string',
        lastLogin: 'string'
    };
    validator(req.body, validationRule, {}, (err,status)=>{
        if(!status){
            res.status(412).send({
                sucess:false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    })
}

const saveTask = (req, res, next)=>{
    const validationRule = {
        taskName : 'required|string',
        taskCreatedDate : 'required',
        userCreatedTask : 'required',
        taskDeadLine : 'required'
    }
    validator(req.body, validationRule, {}, (err,status)=>{
        if(!status){
            res.status(412).send({
                sucess:false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    })
}
module.exports = {
    saveUser,
    saveTask
};