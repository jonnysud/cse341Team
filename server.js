const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(cors({origin:'*'}))
app.use('/', require('./routes'));

mongodb.initDb((err=>{
    if(err){
        console.log(err);
    }else{
        app.listen(port, ()=>{
            console.log(`Running on port ${port}`);
        });
    };
}));