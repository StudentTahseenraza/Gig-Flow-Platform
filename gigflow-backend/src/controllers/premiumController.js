const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// @desc    Get premium plans
// @route   GET /api/premium/plans
// @access  Public
const getPremiumPlans = asyncHandler(async (req, res) => {
  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      price: 9,
      period: 'month',
      features: [
        'Up to 10 active bids',
        'Basic gig visibility',
        'Email support',
        'Standard profile',
        '5 gig posts/month'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      features: [
        'Unlimited active bids',
        '10x gig visibility boost',
        'Priority support',
        'Verified badge',
        'Unlimited gig posts',
        'Advanced analytics',
        'Custom portfolio',
        'Direct client access'
      ]
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 99,
      period: 'month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'White-label solutions',
        'Dedicated account manager',
        'Premium placement',
        'Custom contract templates'
      ]
    }
  ]
  
  res.json(plans)
})

// @desc    Subscribe to premium
// @route   POST /api/premium/subscribe
// @access  Private
const subscribeToPremium = asyncHandler(async (req, res) => {
  const { planId, paymentMethod } = req.body
  const userId = req.user._id

  // In production, integrate with Stripe/PayPal here
  const plan = {
    'basic': { months: 1 },
    'pro': { months: 1 },
    'agency': { months: 1 }
  }[planId]

  if (!plan) {
    res.status(400)
    throw new Error('Invalid plan selected')
  }

  // Calculate expiry date
  const expiryDate = new Date()
  expiryDate.setMonth(expiryDate.getMonth() + plan.months)

  // Update user
  const user = await User.findByIdAndUpdate(
    userId,
    {
      isPremium: true,
      premiumPlan: planId,
      premiumSince: new Date(),
      premiumExpiresAt: expiryDate,
      $inc: { gigBoost: planId === 'pro' ? 10 : planId === 'agency' ? 15 : 1 }
    },
    { new: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Premium subscription activated successfully',
    user,
    expiresAt: expiryDate
  })
})

// @desc    Cancel premium subscription
// @route   POST /api/premium/cancel
// @access  Private
const cancelPremium = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      isPremium: false,
      premiumPlan: null,
      premiumExpiresAt: null
    },
    { new: true }
  ).select('-password')

  res.json({
    success: true,
    message: 'Premium subscription cancelled',
    user
  })
})

module.exports = {
  getPremiumPlans,
  subscribeToPremium,
  cancelPremium
}