const asyncHandler = require('express-async-handler');
const Gig = require('../models/Gig');

// @desc    Get all open gigs with search
// @route   GET /api/gigs
// @access  Public (with optional auth)
const getGigs = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  
  // Build query
  const query = { status: 'open' };
  
  // Add search if provided
  if (search) {
    query.$text = { $search: search };
  }
  
  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // Execute query
  const gigs = await Gig.find(query)
    .populate('ownerId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  
  // Get total count for pagination
  const total = await Gig.countDocuments(query);
  
  res.json({
    gigs,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    total
  });
});

// @desc    Get single gig
// @route   GET /api/gigs/:id
// @access  Public
const getGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id)
    .populate('ownerId', 'name email')
    .populate('hiredFreelancerId', 'name email');
  
  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }
  
  res.json(gig);
});

// @desc    Create a gig
// @route   POST /api/gigs
// @access  Private
const createGig = asyncHandler(async (req, res) => {
  const { title, description, budget } = req.body;
  
  // Validate budget
  if (budget <= 0) {
    res.status(400);
    throw new Error('Budget must be greater than 0');
  }
  
  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user._id
  });
  
  res.status(201).json(gig);
});

// @desc    Update gig
// @route   PUT /api/gigs/:id
// @access  Private (Owner only)
const updateGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  
  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }
  
  // Check ownership
  if (gig.ownerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this gig');
  }
  
  // Can't update if gig is not open
  if (gig.status !== 'open') {
    res.status(400);
    throw new Error('Can only update open gigs');
  }
  
  const updatedGig = await Gig.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json(updatedGig);
});

// @desc    Delete gig
// @route   DELETE /api/gigs/:id
// @access  Private (Owner only)
const deleteGig = asyncHandler(async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  
  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }
  
  // Check ownership
  if (gig.ownerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this gig');
  }
  
  await gig.deleteOne();
  
  res.json({ message: 'Gig removed' });
});

// @desc    Get my gigs (posted by me)
// @route   GET /api/gigs/my-gigs
// @access  Private
const getMyGigs = asyncHandler(async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id })
    .sort({ createdAt: -1 })
    .populate('hiredFreelancerId', 'name email');
  
  res.json(gigs);
});
// @desc    Get gigs I've bid on
// @route   GET /api/gigs/my-bids
// @access  Private
const getGigsIBidOn = asyncHandler(async (req, res) => {
  const Bid = require('../../models/Bid');
  
  const bids = await Bid.find({ freelancerId: req.user._id })
    .populate({
      path: 'gigId',
      populate: {
        path: 'ownerId',
        select: 'name email'
      }
    })
    .sort({ createdAt: -1 });
  
  res.json(bids);
});

module.exports = {
  getGigs,
  getGig,
  createGig,
  updateGig,
  deleteGig,
  getMyGigs,
  getGigsIBidOn
};