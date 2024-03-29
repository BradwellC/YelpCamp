if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const engine = require('ejs-mate');

const mongoose = require('mongoose');
const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const ExpressError = require('./utilities/ExpressError');

const User = require('./models/user');

const campgroundRoutes = require('./routes/campground')
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb+srv://chrisBradwell:GkUoRYP9wBU2smxu@cluster0.2zyvo.mongodb.net/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected');
});

app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));



const sessionConfig = {
    secret: 'jj6ck9vuwbWaQaUb7CeoN2',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expries: Date.now() + 100 * 60 * 60 * 24 * 7,
        maxAge: 100 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Somethig went wrong with your search!'
    res.status(statusCode).render('error.ejs', { err });
})

app.listen(3050, () => {
    console.log('Serving on port 3050');
});