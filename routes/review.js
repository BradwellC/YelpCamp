const express = require('express');

const { validReview, isReviewAuthor, loggedIn } = require('../middleware/index')
const { newReview, deleteReview } = require('../controllers/review')

const router = express.Router({ mergeParams: true });

router.post('/', loggedIn, validReview, newReview)
router.delete('/:reviewId', loggedIn, isReviewAuthor, deleteReview)

module.exports = router;