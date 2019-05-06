const CartItemSchema = require('./cardItem')
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.ObjectId,
        ref:'CartItem'
    }],
    customer_name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    customer_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    delivery_address: {
        street: { type: String, required: 'Street is required' },
        city: { type: String, required: 'City is required' },
        state: { type: String },
        zipcode: { type: String, required: 'Zip Code is required' },
        country: { type: String, required: 'Country is required' }
    },
    payment_id: {},
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    isdelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', OrderSchema)
