const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['interested', 'ignored', 'accepted', 'rejected'],
        message: '{VALUE} is of incorrect status type',
        required: true
    }
}, {timestamps: true} );


// connectionRequestSchema.index({fromUserId: 1}); // 1 is for ascending order and -1 for desc order, helpful if our API attempts to find 1 id

connectionRequestSchema.index({fromUserId: 1, toUserId: 1}); // Compound indexing to make searching faster for searching from and to combined


connectionRequestSchema.pre('save', function(next) { // Used pre save hook which is used to perform some operations before saving a document
    const connectionRequest = this; // 'this' refers to the connection request document being saved

    // Check if fromUserId and toUserId are the same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('Cannot send connection request to yourself');
    }
    next();
})

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);