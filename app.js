const express = require('express');
const path = require('path');
const engine = require('ejs-mate');

const { campgroundSchema } = require('./schemas');

const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Campground = require('./models/campground');

const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');

// GkUoRYP9wBU2smxu

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
app.use(express.static(__dirname + '/public'));


const validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');

        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}



app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data!', 400);

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/update', { campground });
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {

    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    Campground.findByIdAndDelete(id);

    res.redirect('/campgrounds');
}))

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    res.render('campgrounds/index');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})


app.use((err, req, res, next) => {

    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Somethig went wrong with your search!'
    res.status(statusCode).render('error.ejs', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
});