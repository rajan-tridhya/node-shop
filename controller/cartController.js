const Product = require('../models/Product')
const Cart = require('../models/Cart')

//cartlist method for admin to see all the user's cart list
module.exports.cartListAdmin = async(req,res)=>{
    try{
      const Carts = await Cart.find().sort({ "createdAt": -1 })
      if(Carts)
      {
        res.status(200).send({message:"Carts List",Cart_List:Carts})
      }else{
        res.status(404).send({message:"No Cart Found"})
      }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//create cart method to create a cart for user
module.exports.createCart = async(req,res)=>{
   const productId = req.body.productId
   const addedProduct =  await Product.findById(productId)
    try{
        let  cart = await Cart.findOne({userId:req.user.id})  //searching for user cart if exist or not                                                   
        if(cart){                                             //if exist then add product to that cartListAdmin
            let productIndex = cart.products.findIndex(p => p.productId == productId); //searching if added product is exist in cart or not
            if (productIndex > -1) {                                                    //if product exist already then increase the quantity
              let productItem = cart.products[productIndex];
              productItem.quantity += 1;
              productItem.subtotal = (addedProduct.price * productItem.quantity)
              cart.products[productIndex] = productItem;
            } else {
              cart.products.push({ productId, quantity : 1, subtotal:addedProduct.price });//if not exist in cart add new with quantity 1.
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        }else{                                                 //if not exist then create new cart
            const newCart = await Cart.create({
                userId:req.user.id,
                products: [{ productId, quantity:1,subtotal:addedProduct.price }],
              });
              return res.status(201).send({status:"pass",message:"new cart created",newCart:newCart});
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//method to decrease the quantity of product of cart 
module.exports.decreaseQuantity = async(req,res)=>{
    try{
        const productId = req.params.productId
        const addedProduct =  await Product.findById(productId)

        let  cart = await Cart.findOne({userId:req.user.id})
        if(cart){
            let productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
              let productItem = cart.products[productIndex];
              if(productItem.quantity <= 1){                      //here checking if by decreaseing quantity is matched < 1 should be remove from cart
                cart.products.splice(productIndex, 1)[0]
              }else{
              productItem.quantity -= 1;
              productItem.subtotal = (addedProduct.price * productItem.quantity)
              cart.products[productIndex] = productItem;
              }
            } else {
                res.status(404).send({status: 'Not Found', message:"ProductId you have entered not exist in Cart"})
            }
            cart.total = cart.products.reduce((sum, item)=>{
                return sum + item.quantity;
            },0);
            cart = await cart.save();
            return res.status(201).send(cart);
        }else{
            res.status(404).send({status: 'Cart Not Found', message:"Add  Product to cart to do further process"})
    }}
    catch(err){
        res.status(401).send({Error:err.message})
    }
}

//my cart method to for user to see current cart details 
module.exports.myCart = async(req,res)=>{
    try{
        let  cart = await Cart.findOne({userId:req.user.id}).populate('products.productId') //searching for loggedin user cart with populating product to see product details too
        if(cart){
        res.status(200).send({message:"User Cart ",cart:cart})
        }else{
            res.status(404).send({status:"failed",message:"User Cart Not Found"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//delete cart method to discart loggedin user cart
module.exports.deleteCart = async(req,res)=>{
    try{
        await Cart.deleteOne({userId:req.user.id})
        res.status(200).send({message:"Cart Deleted"})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//method for admin to search cart 
module.exports.searchCartById = async(req,res)=>{
    try{
        const userCart = await Cart.find({userId:req.params.userId})
        if(userCart){
        res.status(200).send({message:"Search Result",userCart:userCart})
        }else{
            res.status(404).send({ Error:"Cart Not Found",message:"Cart maybe Empty"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

//removecartproduct method to remove single product from the cart
module.exports.removeProductFromCart = async(req,res)=>{
    try{
        const productId = req.params.productId
        const del = await Cart.updateMany({ $pull: { products: { productId } } });
         res.status(200).send({status:"pass",message:"cart Product Deleted"})
        }catch(err){
            res.status(401).send({Error:err.message})
        }
}
