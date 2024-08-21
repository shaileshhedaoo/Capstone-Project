
const express = require('express');
const questions = require('./routes/questionRoutes.js');
const users = require('./routes/userRoutes.js');
const answers=require('./routes/answerRoutes.js');
const comments=require('./routes/commentRoutes.js')
const cors = require('cors');
const dotenv = require('dotenv');
const bodyparser=require('body-parser');
const mongoose=require('mongoose')

const app = express();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Express server running on port: "+PORT);
})

app.use(bodyparser.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  };

  
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.error('Error connecting to MongoDB',err);
})
const db=mongoose.connection;
db.on('error',console.error.bind(console, 'Mongo DB connectin error'));
app.use(cors(corsOptions));
app.use('/questions',questions);
app.use('/users',users);
app.use('/answers',answers);
app.use('/comments',comments);