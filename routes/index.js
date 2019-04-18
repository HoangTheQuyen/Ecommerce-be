const express = require('express')
const router = express.Router()
const _DefaultRoutes = require('../config/defaultRoutes')
const _ProductAPI  = require('../routes/api/ProductRoutes')
const _AuthenticationAPI = require('../routes/api/AuthenticationRoutes')

router.use(_DefaultRoutes.PRODUCT.ROOT, _ProductAPI)
router.use(_DefaultRoutes.AUTHENTICATION.ROOT, _AuthenticationAPI)

module.exports = router;