const express = require('express');     // import express
const app = express();                          // create express app
const cors = require('cors')                // import cors
const port = 4000;                               // port number
app.use(cors());                                // middleware
app.use(express.json());                        // middleware

const { mongoose } = require('mongoose');
const workoutRoutes = require('./Router/workoutRouter');


app.use((req, res, next) => {
    console.log("PATH: ", req.path, "\nACTION: " ,req.method)
    next()
})

// ROUTES
app.use('/api/workouts', workoutRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my API!'
    })
})

// connect to db
mongoose.connect('mongodb+srv://shine:Wisdom_100@cluster0.mxiiu7b.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {listen();})
    .catch((error) => {
        console.log(error);
    })

//FUNCTIONS
{ 
    // listen to port
    function  listen() {
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
        })
    }
}


