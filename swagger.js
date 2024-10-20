const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "User API",
        description: "User API"
    },
    host : "localhost:3000",
    schemes : ['https','http']
}

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);