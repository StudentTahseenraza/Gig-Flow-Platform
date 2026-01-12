const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function createIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get models
    const Gig = require('../models/Gig');
    const Bid = require('../models/Bid');
    
    // Create text index for search
    await Gig.collection.createIndex({ title: 'text', description: 'text' });
    console.log('Created text index for Gig');
    
    // Create unique index for bid
    await Bid.collection.createIndex({ gigId: 1, freelancerId: 1 }, { unique: true });
    console.log('Created unique index for Bid');
    
    console.log('All indexes created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating indexes:', error);
    process.exit(1);
  }
}

createIndexes();