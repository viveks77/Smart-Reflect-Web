const express = require('express');

const auth = require('../middleware/auth');
const User = require('../models/userModel')

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try{
        const token = await user.generateAuthId();
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthId();
        res.status(200).send({user, token});
    }catch(e){
        res.status(400).send({error : e});
    }
});

router.patch('/user/update', async (req, res) => {});



module.exports = router;