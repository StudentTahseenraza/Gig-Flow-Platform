const asyncHandler = require('express-async-handler');
const Bid = require('../models/Bid');
const Gig = require('../models/Gig');
const mongoose = require('mongoose');

// @desc    Create a bid
// @route   POST /api/bids
// @access  Private
const createBid = asyncHandler(async (req, res) => {
  const { gigId, message, price } = req.body;
  
  // Validate gig exists and is open
  const gig = await Gig.findById(gigId);
  
  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }
  
  if (gig.status !== 'open') {
    res.status(400);
    throw new Error('Cannot bid on a gig that is not open');
  }
  
  // Can't bid on your own gig
  if (gig.ownerId.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('You cannot bid on your own gig');
  }
  
  // Check if already bid on this gig
  const existingBid = await Bid.findOne({
    gigId,
    freelancerId: req.user._id
  });
  
  if (existingBid) {
    res.status(400);
    throw new Error('You have already placed a bid on this gig');
  }
  
  // Create bid
  const bid = await Bid.create({
    gigId,
    freelancerId: req.user._id,
    message,
    price
  });
  
  // Populate gig and freelancer details
  const populatedBid = await Bid.findById(bid._id)
    .populate('gigId', 'title budget')
    .populate('freelancerId', 'name email');
  
  res.status(201).json(populatedBid);
});

// @desc    Get bids for a specific gig (Owner only)
// @route   GET /api/bids/:gigId
// @access  Private
const getBidsForGig = asyncHandler(async (req, res) => {
  const { gigId } = req.params;
  
  // Get gig to verify ownership
  const gig = await Gig.findById(gigId);
  
  if (!gig) {
    res.status(404);
    throw new Error('Gig not found');
  }
  
  // Check if user is the owner
  if (gig.ownerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to view bids for this gig');
  }
  
  // Get all bids for this gig
  const bids = await Bid.find({ gigId })
    .populate('freelancerId', 'name email')
    .sort({ createdAt: -1 });
  
  res.json({
    gig,
    bids
  });
});

// @desc    Hire a freelancer (WITH TRANSACTION - Bonus 1)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (Gig owner only)
const hireFreelancer = asyncHandler(async (req, res) => {
  const { bidId } = req.params;
  
  // Start MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Find the bid
    const bid = await Bid.findById(bidId).session(session);
    
    if (!bid) {
      throw new Error('Bid not found');
    }
    
    // Find the gig
    const gig = await Gig.findById(bid.gigId).session(session);
    
    if (!gig) {
      throw new Error('Gig not found');
    }
    
    // Check if user is the gig owner
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error('Not authorized to hire for this gig');
    }
    
    // Check if gig is still open
    if (gig.status !== 'open') {
      throw new Error('Gig is no longer open for hiring');
    }
    
    // Check if bid is pending
    if (bid.status !== 'pending') {
      throw new Error('This bid is no longer available for hiring');
    }
    
    // **ATOMIC OPERATION: Update gig and all bids in transaction**
    
    // 1. Update gig status and hired freelancer
    gig.status = 'assigned';
    gig.hiredFreelancerId = bid.freelancerId;
    await gig.save({ session });
    
    // 2. Update the selected bid to hired
    bid.status = 'hired';
    await bid.save({ session });
    
    // 3. Update all other bids for this gig to rejected
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
        status: 'pending'
      },
      {
        $set: { status: 'rejected' }
      },
      { session }
    );
    
    // Commit transaction
    await session.commitTransaction();
    
    // Populate data for response
    const hiredBid = await Bid.findById(bidId)
      .populate('freelancerId', 'name email')
      .populate('gigId', 'title');
    
    // Get updated gig
    const updatedGig = await Gig.findById(gig._id)
      .populate('hiredFreelancerId', 'name email');
    
    // Emit real-time notification (Bonus 2 - will be integrated with Socket.io)
    req.io?.to(bid.freelancerId.toString()).emit('hired', {
      message: `You have been hired for "${updatedGig.title}"!`,
      gig: updatedGig,
      bid: hiredBid
    });
    
    res.json({
      message: 'Freelancer hired successfully',
      gig: updatedGig,
      hiredBid
    });
    
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    
    res.status(400);
    throw new Error(error.message || 'Failed to hire freelancer');
  } finally {
    session.endSession();
  }
});

// @desc    Get my bids
// @route   GET /api/bids/my-bids
// @access  Private
const getMyBids = asyncHandler(async (req, res) => {
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
  createBid,
  getBidsForGig,
  hireFreelancer,
  getMyBids
};