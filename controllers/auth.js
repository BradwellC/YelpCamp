const catchAsync = require('../utilities/catchAsync');

const User = require('../models/user')

module.exports.registerUser = (req, res) => {
    res.render('users/register');
}

module.exports.createUser = catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username })
        const registerUser = await User.register(user, password)

        req.login(registerUser, err => {
            if (err) return next(err)

            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
})

module.exports.login = (req, res) => {
    res.render('users/login')
}

module.exports.loginUser = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    req.flash('success', 'Welcome Back!')
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have signed out succesfully. We look forward to seeing you again!')
        res.redirect('/campgrounds');
    }
    )
}