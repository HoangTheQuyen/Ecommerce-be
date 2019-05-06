const _Supplier = require('../models/supplier')
const {RETURN_CODE} = require('../config/enum')
module.exports = {
    create:(req, res, next)=>{
        const supplier = new _Supplier(req.body)
        supplier
        .save()
        .then(supplier=>{
            console.log(supplier)
            res. status(200).json({
                returncode: RETURN_CODE.SUCCESS,
                supplierId: supplier._id
        })
    })
    }
}