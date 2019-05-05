const _ResponseBuilder = require("../config/enum");
const _Supplier = require("../models/supplier");

module.exports = {
  create: (req, res, next) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const categories = req.body.categories;
    const products = req.body.products;

    if (!name || !image) {
      return res.status(401).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "name or image is required"
        }
      });
    }

    if (
      (name && typeof name !== "string") ||
      (image && typeof image !== "string") ||
      (description && typeof description !== "string") ||
      (categories && typeof categories !== "object") ||
      (products && typeof products !== "object")
    ) {
      return res.status(401).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "Data type invalid"
        }
      });
    }

    _Supplier
      .findOne({ name: name })
      .then(response => {
        if (response) {
          return res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Supplier already exits"
            }
          });
        }

        const supplier = new _Supplier({
          name: name,
          image: image,
          description: description,
          categories: categories,
          products: products
        });

        supplier
          .save()
          .then(supplier => {
            if (!supplier) {
              return res.status(401).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                  message: `Create supplier don't success`
                }
              });
            }

            res.status(200).json({
                STATUS:{
                    returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
                    message: 'Created supplier successfully'
                },
                supplierId: supplier._id
            })
          })
          .catch(err => {
            res.status(401).json({
              STATUS: {
                returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                message: err + ""
              }
            });
          });
      })
      .catch(err => {
        res.status(401).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + ""
          }
        });
      });
  }
};
