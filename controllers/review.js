const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.newReview = catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    const review = new Review(req.body.review)
    review.author = req.user._id;

    campground.reviews.push(review)
    await review.save()
    await campground.save()

    req.flash('success', 'Review has been created')
    res.redirect(`/campgrounds/${campground._id}`)
})

module.exports.deleteReview = catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review has been deleted!')
    res.redirect(`/campgrounds/${id}`);
})