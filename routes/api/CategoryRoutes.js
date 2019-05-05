const router = require('express').Router()
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Category = require('../../controllers/CategoryApi')

router.post(_DefaultRoutes.CATEGORY.CREATE, _Category.create)

module.exports = router