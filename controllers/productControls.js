const Product = require('../models/product');

exports.getProducts = async (req,res,next) => {
    try {
        const data = await Product.findAll()
        res.status(200).json({ data, success:true })
    } catch (err) {
        res.status(500).json({ error:err, success:false })
    }
}

exports.addProduct = async (req,res,next) => {
    const { name, quantity, price, category } = req.body;
    try {
        if( name == '' || quantity == '' || price == '' || category == ''){
            alert('Please fill all details');
        } else {
            const data = await Product.create({
                name, 
                quantity, 
                price, 
                category
            })
            console.log(data)
            res.status(201).json({productAdded: data});
        }
    } catch (err) {
        res.status(500).json({ error:err, success:false })
    }
}