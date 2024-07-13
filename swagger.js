const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Inventory Api',
        description: 'Inventory Api'
    },
    host: 'it-inventory-tracking-system.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles,doc);