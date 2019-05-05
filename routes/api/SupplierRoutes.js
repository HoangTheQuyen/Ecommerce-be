const router = require('express').Router()
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Supplier = require('../../controllers/SupplierApi')

router.post(_DefaultRoutes.SUPPLIER.CREATE, _Supplier.create)

module.exports = router