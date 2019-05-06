const  router = require('express').Router()
const _Category = require('../../controllers/CategoryApi')
const _DefaultRoutes = require('../../config/defaultRoutes')

router.post(_DefaultRoutes.CATEGORY.CREATE, _Category.creatOne)
router.post(_DefaultRoutes.CATEGORY.REMOVE,_Category.remove)
router.post(_DefaultRoutes.CATEGORY.UPDATE,_Category.update)
router.post(_DefaultRoutes.CATEGORY.GET_ALL,_Category.getAll)
router.post(_DefaultRoutes.CATEGORY.GET_ONE,_Category.getOne)
module.exports = router