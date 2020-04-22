const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/userModel')

const router = express.Router();

router.post('/user/register', async (req, res) => {
    const user = new User(req.body);
    try{
        const token = await user.generateAuthId();
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthId();
        res.cookie("token", token);
        res.status(200).render('dashboard', {
            active : "Dashboard"
        });
    }catch(e){
        res.status(400).render('login',{error : "Invalid Credentials"});
    }
});


router.post('/user/logout', auth, async(req, res) => {
    try{
        
        const tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        });
        req.user.tokens = tokens;
        await req.user.save();
        res.status(200).redirect('/login');
    }catch(e){
        res.status(400).send({error : "cannot logout"});
    }
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/dashboard', auth, (req, res) => {
    res.render('dashboard', {
        active : "DashBoard"
    });
})

router.get('/addnotice', auth, (req, res) => {
    res.render('Addnotice', {
        active : "Add Notices"
    });
})

router.get('/about', auth, (req, res) => {
    res.render('About',{
        active : "About Us"
    });
})

router.get('/user/profile', auth, async(req, res) => {
    try{
        res.status(200).render('profile',{
            active : "Profile",
            name : req.user.name,
            email : req.user.email,
            phoneNo : req.user.phoneNo
        });
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/user/update', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    
    try{
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
    await req.user.save();
    res.status(200).redirect('/user/profile');
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/user/remove', auth, async (req, res) => {
    try{
        await req.user.remove();
        res.status(200).send({update : 'User Deleted Successfully'});
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = router;