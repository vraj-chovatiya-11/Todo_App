const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    // console.log(req.headers, "headers")
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: 'No token, authorization denined..'});
    }

    // if(!authHeader('Bearer ')){
    //     return res.status(401).json({message: 'Authorization failed..'});
    // }

    const token = authHeader.substring(7); // remove bearer from header value

    // token verify
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        console.log(id, "decode")
        req.user = id;
        next();
    }catch(err){
        res.status(401).json({message: 'Token is not valid..'});
    }
}

module.exports = auth;