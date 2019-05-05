const router = require('express').Router()
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Shop = require('../../controllers/ShopApi')

router.post(_DefaultRoutes.SHOP.CREATE, _Shop.create)

module.exports = router