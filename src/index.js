const express = require('express');
const app = express();
const route = require('./routes/user.routes');
const passport = require("passport");
const session = require('express-session')
require("./services/googleSSO");
require('dotenv').config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api/v1', route);

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})

app.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/success');
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express App running on port ${port}`);
});