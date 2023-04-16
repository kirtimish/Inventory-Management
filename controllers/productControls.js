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

exports.getSingleProduct = async (req,res,next) => {
    const id =  req.params.id;
    console.log(id,'>>>>')
    try {
        const data = await Product.findByPk(id)
        console.log(data)

        res.status(201).json({productDeleted: data});
    } catch (err) {
        res.status(500).json({message:err,success:false})
    }
}

exports.deleteProduct = async (req,res,next) => {
    const id =  req.params.id;
    console.log(id,'>>>>')
    try {
        const data = await Product.destroy( {where : { id: id }})
        // console.log(data)

        res.status(201).json({message:'Deleted Successfully'});
    } catch (err) {
        res.status(500).json({message:err,success:false})
    }
}

exports.editProduct = async (req,res,next) => {
    const id = req.params.id;
    console.log(id, '>>>>')
    try {
        const data = await Product.update(req.body,
        { where: { id: id } })
        console.log(data)
        
        res.status(201).json({productUpdated: data});
    } catch (err) {
        res.status(500).json({ error:err, success:false })
    }
}