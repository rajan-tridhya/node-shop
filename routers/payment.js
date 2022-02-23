const router = require('express').Router()
const paymentcontroller = require('../controller/paymentController')
const {verifyToken, verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')

//payment routes
router.post("/order", verifyToken, paymentcontroller.getOrderId);  
router.post("/verify", verifyToken, paymentcontroller.paymentVerify);


module.exports = router