const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    phoneNo : {
        type : String,
        trim : true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});

userSchema.methods.toJSON = function() {
    const user = this;
    const userObj =  user.toObject();
    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

userSchema.methods.generateAuthId = async function(){
    const user = this;

    const token = jwt.sign({
        id : user._id.toString()
    }, process.env.JWT_SECRET_KEY);
    user.tokens = user.tokens.concat({
        token
    });

    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });

    if(!user){
        throw new Error('No such user found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Invalid Password');
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;