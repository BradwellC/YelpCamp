const express = require('express');

const { loggedIn, isAuthor, validateCampground } = require('../middleware/index')
const { campgroundIndex, newCampground, createCampground, showCampground, editCampground, updateCampground, deleteCampground } = require('../controllers/campground')

const { storage } = require('../cloudinary/index');

const multer = require('multer');
const upload = multer({ storage })

const router = express.Router();

router.route('/')
    .get(campgroundIndex)
    // .post(loggedIn, validateCampground, createCampground)
    .post(upload.array('image'), (req, res) => {

    })

router.get('/new', loggedIn, newCampground);

router.route('/:id')
    .get(showCampground)
    .put(loggedIn, isAuthor, validateCampground, updateCampground)
    .delete(loggedIn, isAuthor, deleteCampground)

router.get('/:id/edit', loggedIn, isAuthor, editCampground);

module.exports = router;