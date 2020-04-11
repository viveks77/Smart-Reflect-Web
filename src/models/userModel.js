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
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});


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