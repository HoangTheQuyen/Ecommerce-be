const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: 'Shop name already exists',
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
    isDelete:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Shop', ShopSchema)
