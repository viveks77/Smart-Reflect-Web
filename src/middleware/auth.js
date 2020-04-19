const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try{
        
        const token = req.cookies.token;
        const decode = jwt.verify(token, 'SecretKey');

        const user = await User.findOne({_id : decode.id, 'tokens.token' : token });
        if(!user){
            throw new Error({error : "Invalid Authorization token"});
        }
        req.token = token;
        req.user = user;
        next();

    }catch(e){
        res.status(401).render('login');
    }
}

module.exports = auth;