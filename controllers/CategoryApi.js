const { RETURN_CODE } = require('../config/enum')
const _Category = require('../models/Category')
const _product = require('../models/product')
const _supplier = require('../models/supplier')

module.exports = {
    creatOne: (req, res, next) => {
        const category = new _Category(req.body)
        category
            .save()
            .then(category => {
                res.status(200).json({
                    returncode: RETURN_CODE.SUCCESS,
                    categoryId: category._id
                })
            })
    },
    remove: (req, res, next) =>{
        const categoryid = req.body.categoryId
        _Category.findByIdAndRemove(categoryid)
        .then(response => {
            res.status(200).json({
                returncode: RETURN_CODE.SUCCESS,
                message: "removed a catagory"
            })
        })
    },
    update: (req, res, next) =>{
        const catagoryname = req.body.name
        const categoryId = req.body.categoryId
        const description = req.body.description
        const productId = req.body.productId
        const supplierId = req.body.supplierId
        _Category.findById(categoryId)
        .then(catagory =>{
            catagory.updateOne({
                categoryId: categoryId,
                name: catagoryname,
                description: description,
                productId: productId,
                supplierId:supplierId,
            })
            .then(response =>{
                res.status(200).json({
                    returncode: RETURN_CODE.SUCCESS,
                    message:"updated successfully"
                })
            })
        })
    },
    getAll:(req, res, next) =>{
        const limit = req.body.limit
        const offset = req.body.skip
    _Category
    .find()
    .skip(offset)
    .limit(limit)
    .then(Category => {
        res.status(200).json({
            returncode: RETURN_CODE.SUCCESS,
            Category:Category
        })
    })
    },
    getOne:(req, res, next)=>{
        const catagoryId = req.body.catagoryId
        _Category
        .findById(catagoryId)
        .then(Category =>{
            res.status(200).json({
                Category:{
                    catagoryId:Category._id
                },
                supplier: {
                supplierId:Category.supplier
                }
            })
        })

    }
}
