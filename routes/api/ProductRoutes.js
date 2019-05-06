const router = require('express').Router()
const _Product = require('../../controllers/ProductApi')
const _DefaultRoutes = require('../../config/defaultRoutes')



router.post(_DefaultRoutes.PRODUCT.GET_ALL, _Product.getAll)
router.post(_DefaultRoutes.PRODUCT.CREATE, _Product.createOne)
router.post(_DefaultRoutes.PRODUCT.GET_ONE, _Product.getONE)
router.post(_DefaultRoutes.PRODUCT.UPDATE, _Product.update)
router.post(_DefaultRoutes.PRODUCT.REMOVE,_Product.remove)

module.exports = router