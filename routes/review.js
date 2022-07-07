const express = require('express');

const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');

const { reviewSchema } = require('../schemas');

const Campground = require('../models/campground');
const Review = require('../models/review');

const router = express.Router({ mergeParams: true });

const validReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');

        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.post('/', validReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    const review = new Review(req.body.review)

    campground.reviews.push(review)
    await review.save()
    await campground.save()

    req.flash('success', 'Review has been created')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;

    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash('success', 'Review has been deleted!')
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;