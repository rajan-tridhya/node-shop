const Order = require('../models/Order')
const Cart = require('../models/Cart')

//this method is for admin to see all the order happend by all the user
module.exports.allOrders = async(req,res)=>{
    try{
      const Orders = await Order.find().sort({ "createdAt": -1 })
      if(Orders)
      {
        res.status(200).send({message:"Orders List",Order_List:Orders})
      }else{
        res.status(404).send({message:"No Order Found"})
      }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//this method is to see list of order done by user
module.exports.myOrders = async(req,res)=>{
    try{
      const Orders = await Order.find({userId: req.user.id})
      if(Orders)
      {
        res.status(200).send({message:"Orders List",Order_List:Orders})
      }else{
        res.status(404).send({message:"No Order Found"})
      }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//this method is to create order from cart and clear the cart
module.exports.createOrder = async(req,res)=>{
    try{
    let  cart = await Cart.findOne({userId:req.user.id})
    // const  newOrder = new  Order(req.body)
    const newOrder = await Order.create({
        userId:cart.userId,
        products:cart.products,
        total:req.body.total,
        address:req.body.address
    })
    await Cart.findOneAndDelete(cart._id)
    res.status(200).send({message:"Order Created",Order_Detail:newOrder})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//this method is for admin using this admin can change the status of order to pending to deliverd or cancel
module.exports.updateOrder = async(req,res)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true})
        res.status(200).send({message:"updatedProduct ",updatedOrder:updateOrder})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//this method to delete order
module.exports.deleteOrder = async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"Order Deleted"})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//this method to search particular users order
module.exports.searchUserOrder = async(req,res)=>{
    try{
        const userOrder = await Order.find({userId:req.params.userId})
        if(userOrder){
        res.status(200).send({message:"Search Result",userOrder:userOrder})
        }else{
            res.status(404).send({ Error:"Order Not Found",message:"Order To search for Orders"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}