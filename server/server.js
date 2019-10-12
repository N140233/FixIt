const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const userRouter = require('./routes/userRoute')
const jwt = require('jsonwebtoken');
const User = require('./modals/usersModal')
const validate = require('./modals/usersModal')
const projectRouter = require('./routes/projectsRoute')
// app.use(express.static(path.join(__dirname, 'public')));


const uri = "mongodb+srv://Surya:Surya@123@cluster0-rng2v.mongodb.net/fixit?retryWrites=true&w=majority"
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',userRouter)
app.use('/projects/',projectRouter)




app.get('/ping', function (req, res) {
  res.send([{ "name": "surya", "age": 20 }, { "name": "anand", "age": 19 }])
});

app.get('/', function (req, res) {
  res.send([{ "name": "surya", "age": 20 }, { "name": "anand", "age": 19 }])
});

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    app.listen(8080, () => console.log("App listening in Port : 8080"));
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log(err));

app.use((error,req,res,next)=>{
  if(error) res.send({"message": error.message})
})