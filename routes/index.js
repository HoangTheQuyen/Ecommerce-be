const express = require("express");
const router = express.Router();
const _DefaultRoutes = require("../config/defaultRoutes");
const _ProductAPI = require("../routes/api/ProductRoutes");
const _AuthenticationAPI = require("../routes/api/AuthenticationRoutes");
const _ShopAPI = require("../routes/api/ShopRoutes");
const _CategoryAPI = require("../routes/api/CategoryRoutes");
const _Supplier = require("../routes/api/SupplierRoutes");

router.use(_DefaultRoutes.PRODUCT.ROOT, _ProductAPI);
router.use(_DefaultRoutes.AUTHENTICATION.ROOT, _AuthenticationAPI);
router.use(_DefaultRoutes.SHOP.ROOT, _ShopAPI);
router.use(_DefaultRoutes.CATEGORY.ROOT, _CategoryAPI);
router.use(_DefaultRoutes.SUPPLIER.ROOT, _Supplier);

module.exports = router;
