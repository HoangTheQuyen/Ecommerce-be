const { RETURN_CODE } = require('../config/enum');

module.exports = {
    getAll: (req, res, next) =>{
        console.log('aaaaaaaa')
        res.status(200).json('sjadgashd')
    },

    createOne: (req, res) =>{
        const productId = req.body.productId
        const shopId = req.body.shopId
    }
}