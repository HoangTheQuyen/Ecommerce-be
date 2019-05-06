const express = require('express')
const _DefaultRoutes = require('../../config/defaultRoutes')
const _CardItem = require('../../controllers/CardItemAPI')

const router = express.Router()

router.post(_DefaultRoutes.CARDITEM.CREATE,_CardItem.create)

module.exports = router