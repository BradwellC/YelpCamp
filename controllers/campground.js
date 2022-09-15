const catchAsync = require('../utilities/catchAsync');

const Campground = require('../models/campground');

const { cloudinary } = require('../cloudinary');

module.exports.campgroundIndex = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

module.exports.newCampground = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.image = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save();

    req.flash('success', 'Campground has been successfully made!');
    res.redirect(`/campgrounds/${campground._id}`);

}

module.exports.showCampground = catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    if (!campground) {
        req.flash('error', 'Could not find campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
})

module.exports.editCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Could not find campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/update', { campground });
})

module.exports.updateCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const img = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.image.push(...img)

    await campground.save()
    req.flash('success', 'Campground has been updated successfully!')
    res.redirect(`/campgrounds/${campground._id}`);
})

module.exports.deleteCampground = catchAsync(async (req, res) => {
    const { id } = req.params;
    Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground has been deleted1')
    res.redirect('/campgrounds');
})