const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config()



const mongoose=require('mongoose');
const url="mongodb://localhost:27017/maqalat";
mongoose.connect(url).then(()=>{
    console.log("connected to database");
});

//routes
const authorsRoute=require('./routes/authorsRoute');
app.use('/api/authors',authorsRoute);

const articlesRoute=require('./routes/articlesRoute');
app.use('/api/articles',articlesRoute);

const port=9000;
app.listen(port,()=>{
    console.log("connecting on port",port);
});