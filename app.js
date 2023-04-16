const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./database');

const productRoutes = require('./routes/product')    //routes
const app = express();

const http = require('http').createServer(app);
const { Server } = require('socket.io');
var io = new Server(http,{});

//Checkng if the socket connection is on or not!
io.on('connection',(socket) => {
    console.log('User connected!')
    socket.on("new_product",(productDetails) => {
        // console.log(productDetails)
        socket.broadcast.emit("new_product",productDetails)
    })
})

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