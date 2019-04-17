const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    image:{
        type: String,
        require:'Image is required'
    },
    description:{
        type: String,
        trim: true
    },
    categories:[{
        type: mongoose.Schema.ObjectId,
        ref:'Category'
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
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

module.exports = mongoose.model('Supplier',SupplierSchema)
