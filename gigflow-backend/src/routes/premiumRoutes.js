const express = require('express')
const router = express.Router()
const {
  getPremiumPlans,
  subscribeToPremium,
  cancelPremium
} = require('../controllers/premiumController')
const { protect } = require('../middleware/auth')

router.get('/plans', getPremiumPlans)
router.post('/subscribe', protect, subscribeToPremium)
router.post('/cancel', protect, cancelPremium)

module.exports = router