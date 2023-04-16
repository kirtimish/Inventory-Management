require('dotenv').config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./database');
 //routes
const productRoutes = require('./routes/product')   
const errorController = require('./controllers/error');
const app = express();

const http = require('http').createServer(app);
const { Server } = require('socket.io');
var io = new Server(http,{});

//Checkng if the socket connection is on or not!
io.on('connection',(socket) => {
    console.log('User connected!')
    socket.on("new_product",(productDetails) => {
        // console.log(productDetails)
        socket.broadcast.emit("new_product",productDetails)   //once connection formed, it broadcast the info
    })
    socket.on("delete_product",(id) => {
        // console.log(id)
        socket.broadcast.emit("delete_product",id)
    })
    socket.on("update_product",(updaedProductDetails) => {
        // console.log(updaedProductDetails)
        socket.broadcast.emit("update_product",updaedProductDetails)
    })
})

//MIDDLEWARES 
app.use(cors());     //For cross-origin resources sharing
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json());
app.use(productRoutes)
app.use(errorController.get404);

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