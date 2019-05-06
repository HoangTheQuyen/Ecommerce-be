const express = require('express')
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Shop = require('../../controllers/ShopApi')

const router = express.Router()

router.post(_DefaultRoutes.SHOP.CREATE, _Shop.create)

module.exports = router