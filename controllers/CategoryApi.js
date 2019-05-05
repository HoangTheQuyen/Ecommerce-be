const _ResponseBuilder = require("../config/enum");
const _Category = require("../models/category");

module.exports = {
  create: (req, res, next) => {
    const name = req.body.name;
    const desciption = req.body.desciption;
    const products = req.body.products;
    const suppliers = req.body.suppliers;

    if (!name) {
      return res.status(401).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "Category's name is required"
        }
      });
    }

    if (
      (name && typeof name !== "string") ||
      (desciption && typeof desciption !== "string") ||
      (products && typeof products !== "object") ||
      (suppliers && typeof suppliers !== "object")
    ) {
      return res.status(401).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "Data type invalid"
        }
      });
    }

    _Category
      .findOne({ name: name })
      .then(response => {
        if (response) {
          return res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Category already exists"
            }
          });
        }
        const category = new _Category({
          name: name,
          desciption: desciption,
          products: products,
          suppliers: suppliers
        });

        category
          .save()
          .then(category => {
            if (!category) {
              return res.json(401).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                  message: `Create category don't success`
                }
              });
            }
            res.status(200).json({
              STATUS: {
                returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
                message: "Created category successfully"
              },
              categoryId: category._id
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
