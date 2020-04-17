const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middleware/auth');
const User = require('../models/userModel')

const upload = multer({
    limits: {
        fileSize : 1000000
    }
});

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
        res.status(200).send({user, token});
    }catch(e){
        res.status(400).send({error : e});
    }
});


router.post('/user/logout', auth, async(req, res) => {
    try{
        const tokens = req.user.tokens.filer(token => {
            return token != req.token
        });
        req.user.tokens = tokens;
        await req.user.save();
        res.status(200).send({msg : "logout Successfully"});
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/user/profile/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send();
}, (err, req,  res, next) => {
    res.status(400).send(({error : err.message}));
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        active : "DashBoard"
    });
})

router.get('/addnotice', (req, res) => {
    res.render('Addnotice', {
        active : "Add Notices"
    });
})

router.get('/user/profile', auth, async(req, res) => {
    try{
        res.status(200).send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/user/profile/avatar', auth, (req, res) => {
    try{
        res.status(200).send(req.user.avatar);
    }catch(e){
        res.status(400).send(e)
    }
});

router.patch('/user/update', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    
    try{
        updates.forEach(update => {
            req.user[update] = req.user[update]
        })
    await req.user.save();
    res.status(200).send(req.user);
    }catch(e){
        res.status(400).send(e);
    }
});

router.delete('/user/remove', auth, async (req, res) => {
    try{
        await req.user.remove();
        res.status(200).send({update : 'User Deleted Successfully'});
    }catch(e){
        res.status(400).send(e);
    }
});



module.exports = router;