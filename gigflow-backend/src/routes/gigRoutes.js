const express = require('express');
const router = express.Router();
const {
  getGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
  getMyGigs,
  getGigsIBidOn
} = require('../controllers/gigController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes (optional auth for personalized experience)
router.get('/', optionalAuth, getGigs);
router.get('/:id', getGig);

// Protected routes
router.use(protect);
router.post('/', createGig);
router.put('/:id', updateGig);
router.delete('/:id', deleteGig);
router.get('/my-gigs', protect, getMyGigs);
router.get('/my-bids', protect, getGigsIBidOn);

module.exports = router;