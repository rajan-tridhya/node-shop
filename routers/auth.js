const router = require('express').Router()
const authcontroller = require('../controller/authController')

//auth routes to login and register user
router.post('/register',authcontroller.userRegister)
router.post('/login',authcontroller.userLogin)

module.exports = router