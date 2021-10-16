const express = require('express');
const validate = require('../validators/testStudentInfo');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Students = require('../models/student');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

//fix error "Failed to obtain access token"
require('https').globalAgent.options.rejectUnauthorized = false;

const GOOGLE_CLIENT_ID = '926286756007-a45pgl0b0j4jvb7192qo75a3md5vc975.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});


const router = express.Router();

router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', 
    passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        const userEmail = req.user.emails[0].value;
        if (validate.testMail(userEmail)) {
            if (!(await Students.find({email: userEmail})).length)
                if (!saveInfo(req.user)) {
                    return res.json({
                        success: false,
                        status: {
                            code: 400,
                            message: 'Fail to save info!'
                        }
                    });
                }
            const data = {
                name: req.user.displayName,
                email: req.user.emails[0].value
            }
            const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
            res.json({
                token,
                success: true,
                status: {
                    code: 200,
                    message: 'Signed in successfully!'
                }
            });
        }  
        else {
            req.logout();
            req.session.destroy();
            res.json({
                success: false,
                status: {
                    code: 401,
                    message: 'Fail to sign in!'
                }
            });
        }    
});

async function saveInfo(user) {
    let student = new Students({
        email: user.emails[0].value,
        name: user.displayName,
        step: 2
    });
    try {
        let result = await student.save();
        return true;
    }
    catch(e) {
        return false;
    }
}

module.exports = router;


