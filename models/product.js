const Sequelize = require('sequelize')
const sequelize = require('../database')

const Product = sequelize.define('product',{
    id: {
        type: Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false,
    },
    quantity: {
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    price: {
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    category: {
        type:Sequelize.STRING,
        allowNull:false,
    }
});

module.exports = Product;