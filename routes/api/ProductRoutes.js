const express = require('express')
const _Product = require('../../controllers/ProductApi')
const _DefaultRoutes = require('../../config/defaultRoutes')

const router = express.Router()

router.get(_DefaultRoutes.PRODUCT.GET_ALL, _Product.getAll)

module.exports = router