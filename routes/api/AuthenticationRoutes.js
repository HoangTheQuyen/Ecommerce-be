const express = require('express')
const _DefaultRoutes = require('../../config/defaultRoutes')
const _Authentication = require('../../controllers/AuthenticationApi')

const router =  express.Router()

router.post(_DefaultRoutes.AUTHENTICATION.REGISTER, _Authentication.register)


module.exports = router
