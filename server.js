const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const port = process.env.PORT || 3000;
const app = express();

//create a route
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-RequestedWith, Content-Type, Accept, Z-Key'
   
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }else{
        app.listen(port, () => {
        console.log(`Database is listening and node Running on port ${port}`)});
    }
});



