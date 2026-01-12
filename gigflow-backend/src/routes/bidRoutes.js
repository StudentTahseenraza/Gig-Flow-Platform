const express = require('express');
const router = express.Router();
const {
  createBid,
  getBidsForGig,
  hireFreelancer,
  getMyBids
} = require('../controllers/bidController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createBid);
router.get('/my-bids', getMyBids);
router.get('/:gigId', getBidsForGig);
router.patch('/:bidId/hire', hireFreelancer);

module.exports = router;