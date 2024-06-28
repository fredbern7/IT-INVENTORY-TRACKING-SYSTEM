//3. add library - express and setup server
//4. start app and check the message and port
const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

//create a route
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err){
        console.log(err);
    }else{
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
})



