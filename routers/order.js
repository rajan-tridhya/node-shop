const router = require('express').Router()
const ordercontroller = require('../controller/orderController')
const {verifyToken,verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')

//user routes
router.get('/MyOrder',verifyToken, ordercontroller.myOrders)
router.post('/',verifyToken,ordercontroller.createOrder)

//admin routes
router.get('/',verifyTokenAndAdmin,ordercontroller.allOrders)
router.put('/:id',verifyTokenAndAdmin, ordercontroller.updateOrder)
router.delete('/:id',verifyTokenAndAdmin, ordercontroller.deleteOrder)
router.get('/:userId',verifyTokenAndAdmin,ordercontroller.searchUserOrder)



module.exports = router