const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    image: {
        type: String, 
        required: 'Image is required'
    },
    description: {
        type: String,
        trim: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref:'Product'
    }],
    isdelete:{
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Shop', ShopSchema)
