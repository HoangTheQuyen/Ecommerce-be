const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        unique: 'Supplier already exists',
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
    products: [{
        type: mongoose.Schema.ObjectId,
        ref:'Product'
    }],
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    isDelete:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Supplier',SupplierSchema)
