const _ResponseBuilder = require("../config/enum");
const _Product = require("../models/product");

module.exports = {
  getAll: (req, res, next) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const shopId = req.body.shopId;
    const keyword = req.body.keyword;
    const categoryId = req.body.categoryId;
    const supplierId = req.body.supplierId;
    const price = req.body.price;
    const weight = req.body.weight;

    if (
      limit === undefined ||
      offset === undefined ||
      limit === null ||
      offset === null ||
      limit === "" ||
      limit === ""
    ) {
      return res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "limit or offset is required"
        }
      });
    }

    if (
      typeof limit !== "number" ||
      typeof offset !== "number" ||
      typeof shopId !== "string" ||
      typeof keyword !== "string" ||
      typeof categoryId !== "string" ||
      typeof supplierId !== "string" ||
      typeof price !== "object" ||
      typeof price.from !== "number" ||
      typeof price.to !== "number" ||
      typeof weight !== "object" ||
      typeof weight.from !== "number" ||
      typeof weight.to !== "number"
    ) {
      return res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "typeof invalid"
        }
      });
    }

    _Product
      .find({ shop: shopId })
      .then(products => {
        if (!products) {
          return res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "get all products don't success"
            }
          });
        }

        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
            message: "get all products successfully"
          },
          totalItems: products.length,
          shopId: shopId,
          products: products.map(product => ({
            productId: product._id,
            productName: product.name,
            price: product.price,
            quantity: product.quantity,
            images: product.images
          }))
        });
      })
      .catch(err => {
        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + ""
          }
        });
      });
  },

  getOne: (req, res) => {
    const productId = req.body.productId;
    const shopId = req.body.shopId;

    if (!productId || !shopId) {
      return res.status(401).json({
        status: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "productId or shopId are required"
        }
      });
    }

    if (
      (productId && typeof productId !== "string") ||
      (shopId && typeof shopId !== "string")
    ) {
      return res.status(401).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "productId or shopId are a objectId"
        }
      });
    }

    _Product
      .findOne({
        shop: shopId,
        _id: productId
      })
      .populate('shop')
      .populate('Category')
      .populate('Supplier')
      .then(product => {
        if (!product) {
          return res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Product not found"
            }
          });
        }

        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
            message: "Find product successfully"
          },
          product: {
            productId: product._id,
            shop:{
              shopId: product.shop._id,
              shopName: product.shop.name
            },
            category:{
              // cateogryId: product.Category._id,
              // categoryName: product.Category.name
            },
            supplier:{
              // supplierId: product.supplier._id,
              // supplierName: product.supplier.name
            },
            productName: product.name,
            price: product.price,
            quantity: product.quantity,
            images: product.images,
            description: product.description,
            packageInfo: {
              packageHeight: product.packageInfo.packageHeight,
              packageLength: product.packageInfo.packageLength,
              packageWidth: product.packageInfo.packageWidth,
              packageWeight: product.packageInfo.packageWeight,
              packageContent: product.packageInfo.packageContent
            },
            createdAt: product.created,
            updatedAt: product.updated,
            isDeleted: product.isDelete
          }
        });
      })
      .catch(err => {
        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + ""
          }
        });
      });
  },

  createOne: (req, res) => {
    const name = req.body.name;
    const images = req.body.images;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const packageInfo = req.body.packageInfo;
    const supplierId = req.body.supplierId;
    const categoryId = req.body.categoryId;
    const shopId = req.body.shopId;

    if (
      !name ||
      !images ||
      !quantity ||
      !price ||
      !packageInfo ||
      !packageInfo.packageHeight ||
      !packageInfo.packageLength ||
      !packageInfo.packageWidth ||
      !packageInfo.packageWeight ||
      !packageInfo.packageContent
    ) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message:
            "name or images or quantity or price or packageInfo is required"
        }
      });
    }

    if (
      typeof name !== "string" ||
      typeof images !== "object" ||
      typeof quantity !== "number" ||
      typeof price !== "number" ||
      typeof packageInfo !== "object" ||
      typeof packageInfo.packageHeight !== "number" ||
      typeof packageInfo.packageLength !== "number" ||
      typeof packageInfo.packageWidth !== "number" ||
      typeof packageInfo.packageWeight !== "number" ||
      typeof packageInfo.packageContent !== "string" ||
      typeof supplierId !== "string" ||
      typeof categoryId !== "string" ||
      typeof shopId !== "string"
    ) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "type invalid"
        }
      });
    }

    _Product
      .findOne({
        name: name
      })
      .then(response => {
        if (response) {
          return res.status(200).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Product already exitsts"
            }
          });
        } else {
        }

        const product = new _Product({
          name: name,
          images: images,
          description: description,
          quantity: quantity,
          price: price,
          packageInfo: packageInfo,
          supplier: supplierId,
          category: categoryId,
          shop: shopId
        });

        product
          .save()
          .then(product => {
            if (!product) {
              return res.status(401).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                  message: "Create product don't success"
                }
              });
            }
            res.status(200).json({
              STATUS: {
                returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
                message: "Created product successfully"
              },
              productId: product._id
            });
          })
          .catch(err => {
            res.status(200).json({
              STATUS: {
                returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                message: err + ""
              }
            });
          });
      })
      .catch(err => {
        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + ""
          }
        });
      });
  }
};
