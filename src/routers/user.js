const express = require('express');

const User = require('../models/userModel')

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.status(200).send(user);
    }catch(e){
        res.status(401).send(e);
    }
});

router.patch('/user/update', async (req, res) => {});



module.exports = router;