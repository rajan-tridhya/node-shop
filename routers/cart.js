const router = require('express').Router()
const cartcontroller = require('../controller/cartController')
const {verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')

//User cart routes
router.post('/',verifyToken, cartcontroller.createCart)  
router.get('/mycart',verifyToken, cartcontroller.myCart)
router.delete('/',verifyToken,cartcontroller.deleteCart)
router.put('/:productId',verifyToken, cartcontroller.decreaseQuantity)
router.delete('/:productId',verifyToken, cartcontroller.removeProductFromCart)

//Admin cart routes
router.get('/',verifyTokenAndAdmin,cartcontroller.cartListAdmin)
router.get('/:userid',verifyTokenAndAdmin,cartcontroller.searchCartById)

module.exports = router
