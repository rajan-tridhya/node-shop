const jwt = require('jsonwebtoken')

//middleware to verify the jwt token
const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify (token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err){
                res.status(404).send(err)
            }else{
                req.user = user
                next()
            }
        })
    }else{
        return res.status(401).send({Error:"JWT NOT FOUND.!",message:"Not AUthenticated"})    }
}

//middleware to verify token as well admin
const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{z
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).send({Error:"AccessDenied",message:"You are not allow to Do That!"})
        }
    })
}
module.exports = { verifyToken, verifyToken, verifyTokenAndAdmin }
