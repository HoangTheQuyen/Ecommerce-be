const express = require('express')
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Supplier = require('../../controllers/SuppslierApi')

const router = express.Router()

router.post(_DefaultRoutes.SUPPLIER.CREATE,_Supplier.create)

module.exports = router