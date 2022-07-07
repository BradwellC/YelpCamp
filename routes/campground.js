const express = require('express');

const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const { campgroundSchema } = require('../schemas');

const Campground = require('../models/campground');

const router = express.Router();

const validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');

        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
});

router.get('/new', (req, res) => {
    res.render('campgrounds/new');
});

router.post('/', catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();

    req.flash('success', 'Campground has been successfully made!');
    res.redirect(`/campgrounds/${campground._id}`);

}))

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        req.flash('error', 'Could not find campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        req.flash('error', 'Could not find campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/update', { campground });
}));

router.put('/:id', validateCampground, catchAsync(async (req, res) => {

    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });

    req.flash('success', 'Campground has been updated successfully!')
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    Campground.findByIdAndDelete(id);

    req.flash('success', 'Campground has been deleted1')

    res.redirect('/campgrounds');
}))

module.exports = router;