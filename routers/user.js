const router = require('express').Router()
const usercontroller = require('../controller/userController')
const {verifyToken, verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')

//Crud route of user 
router.put('/',verifyToken,usercontroller.updateUser)
router.delete('/:id',verifyToken,usercontroller.deleteUser)
router.get('/:id',verifyToken,usercontroller.searchUserById)

//admin route to get list of all user
router.get('/',verifyToken,usercontroller.allUser)

module.exports = router
