const router = require('express').Router()
const productcontroller = require('../controller/productController')
const {verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')

//get all product rout to see all product on home page
router.get('/',verifyToken,productcontroller.allProduct)

//product routes for admin
router.post('/',verifyTokenAndAdmin,productcontroller.addProduct)
router.put('/:id',verifyTokenAndAdmin,productcontroller.updateProduct)
router.delete('/:id',verifyTokenAndAdmin,productcontroller.deleteProduct)
router.get('/:id',verifyTokenAndAdmin,productcontroller.searchProductById)

module.exports = router
