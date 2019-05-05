const _ResponseBuilder = require("../config/enum");
const _Shop = require("../models/shop");

module.exports = {
  create: (req, res, next) => {
    const name = req.body.name;
    const image = req.body.name;
    const description = req.body.description;
    const ownerId = req.body.ownerId;

    if (!name || !image || !ownerId) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "name or image or ownerId or is required."
        }
      });
    }

    if (
      typeof name !== "string" ||
      typeof image !== "string" ||
      typeof description !== "string" ||
      typeof ownerId !== "string"
    ) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message:
            "name or email or image or description or ownerId are a string."
        }
      });
    }

    _Shop
      .findOne({ name: name })
      .then(response => {
        if (response) {
          return res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: `Shop already exists`
            }
          });
        }
        const shop = new _Shop({
          name: name,
          image: image,
          description: description,
          owner: ownerId
        });

        shop
          .save()
          .then(shop => {
            if (!shop) {
              res.status(401).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                  message: `create shop don't succeess`
                }
              });
            } else {
              res.status(200).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
                  message: "Created shop successfully"
                },
                shopId: shop._id
              });
            }
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
      .catch();
  }
};
