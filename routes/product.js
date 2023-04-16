const express = require('express')
const router = express.Router()
const productControls = require('../controllers/productControls')

//get products
router.get('/inventory',productControls.getProducts)
//add product to list
router.post('/inventory',productControls.addProduct)
//get single product 
router.get('/inventory/:id',productControls.getSingleProduct)
//delete product from list
router.delete('/inventory/:id',productControls.deleteProduct)
//update product in the list
router.put("/inventory/:id",productControls.editProduct);

module.exports = router;