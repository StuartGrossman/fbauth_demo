var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var jwt = require("jsonwebtoken");
var passport = require("passport");

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'], display: 'touch' }));

router.get("/auth/facebook/callback", passport.authenticate('facebook', { failureRedirect: "/#/"}), function(req, res) {
    if(req.user) {
        var token = { token : req.user.generateJWT()}
        res.redirect("/#/auth/token/" + token.token);
    } else {
        res.send("You are not authenticated");
    }
})

module.exports = router;
