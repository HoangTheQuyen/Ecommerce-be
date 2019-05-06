const express = require('express')
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Order = require('../../controllers/OrderAPI')

const router = express.Router()

router.post(_DefaultRoutes.ORDER.CREATE,_Order.create)


module.exports = router