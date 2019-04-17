const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: 'Name is required'
    },
    description: {
        type: String,
        trim: true
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref:'Product'
    }],
    suppliers:[{
        type: mongoose.Schema.ObjectId,
        ref:'Supplier'
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    isdelete:{
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Category', CategorySchema)
