const router = require("express").Router();
const twitterUser = require("../models/twitterUser");

//for registration
router.post("/register" , async (req,res) => {
    const newUser = new twitterUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async(req,res) => {
    try{
        const validUser = await twitterUser.findOne({email: req.body.email});
        !validUser && res.status(404).send("user not found with this email");

        const validPassword = await req.body.password == validUser.password ? true : false;
        !validPassword && res.status(404).send("you have entered wrong password");

        res.status(200).json(validUser);
    }
    catch(err){
        res.status(500).json(err);
    } 
});

module.exports = router;
