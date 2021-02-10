const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        min:10
    },
      
    description: {
        type: String,
        required: true,
        min:15
    },
      
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', PostSchema);