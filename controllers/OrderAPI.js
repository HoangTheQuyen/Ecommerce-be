const _Oder = require('../models/order')
const {RETURN_CODE} = require('../config/enum')

module.exports = {
    create: (req, res, next) =>{
    const items = req.body.items
    const order = new _Oder(req.body)
    order.save()
    .then(order => {
        res.status(200).json({
            returncode: RETURN_CODE.SUCCESS
        })
    })
    }
}