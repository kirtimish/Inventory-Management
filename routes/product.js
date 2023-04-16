const express = require('express')
const router = express.Router()
const productControls = require('../controllers/productControls')

router.get('/inventory',productControls.getProducts)
router.post('/inventory',productControls.addProduct)

module.exports = router;