const { RETURN_CODE} = require('../config/enum')
const _CardItem = require('../models/cardItem')
module.exports = {
    create:(req, res, next)=>{
        const Carditem = new _CardItem(req.body)
        Carditem.save()
        .then(Carditem =>{
            res.status(200).json({
                returncode: RETURN_CODE.SUCCESS,
                Carditem
            })
        })
    }
}