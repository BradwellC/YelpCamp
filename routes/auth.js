const express = require('express')
const passport = require('passport')

const { registerUser, createUser, login, loginUser, logoutUser } = require('../controllers/auth')

const router = express.Router()

router.route('/register')
    .get(registerUser)
    .post(createUser)

router.route('/login')
    .get(login)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser)

router.get('/signout', logoutUser)

module.exports = router;