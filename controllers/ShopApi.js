const _Shop = require('../models/shop')
const {RETURN_CODE} = require('../config/enum')
module.exports= {
    create: (req, res, next) => {
        const shop = new _Shop(req.body)
    
        shop.save()
        .then(shop => {
            res.status(200).json({
                returncode: RETURN_CODE.SUCCESS,
                shopId: shop._id
            })
        })

    }
}