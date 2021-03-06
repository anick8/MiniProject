const  asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.protect = asyncHandler(async (req,res,next) => {
    let token =  req.body.token;

  //  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //    token = req.headers.authorization.split('')[1];
    //}

    if(!token){
        return next(new ErrorResponse('Token not found',401));
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next()
    }
    catch(err)
    {
        console.log(err);
        return next(new ErrorResponse('Not authorized',401));
    }

});
exports.authorize = (...roles) => {
 return(req,res,next) => {
    console.log(roles)
    if(!roles.includes(req.user.role)) return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`,403))
    next();
 }
 
}
