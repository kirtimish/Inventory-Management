const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./database');

const productRoutes = require('./routes/product')    //routes
const app = express();

//MIDDLEWARES 
app.use(cors());     //For cross-origin resources sharing
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json());
app.use(productRoutes)

sequelize            //Setting up Connection with SQL database
.sync()
.then(res => {
    http.listen('3000',()=> {
        console.log('Connected to database!')
        console.log('Server is listening!')
    })
})
.catch(err => {
    console.log(err)
})