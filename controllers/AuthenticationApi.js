const _ResponseBuilder = require("../config/enum");
const _User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require('../config/JWTConfig')

module.exports = {
  register: (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body.AccountType;
    const phone = req.body.phone;
    const image = req.body.image;

    if (!name || !email || !password || !image) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "name or email or password or is required."
        }
      });
    }

    if (password.length < 6) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "Password must be at least 6 characters."
        }
      });
    }

    if (
      accountType.length > 0 &&
      accountType != "USER" &&
      accountType != "ADMIN"
    ) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "accountType is USER or ADMIN."
        }
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof image !== "string"
    ) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "name or email or password or image are a string."
        }
      });
    }

    _User
      .findOne({ email: email })
      .then(response => {
        if (!response) {
          const user = new _User({
            name: name,
            email: email,
            phone: phone,
            image: image,
            password: password,
            AccountType: accountType
          });

          user
            .save()
            .then(user => {
              if (!user) {
                return res.status("401").json({
                  STATUS: {
                    returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                    message: "Create user don't success"
                  }
                });
              }
              res.status(200).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
                  message: "Created user successfully"
                },
                userName: user.name
              });
            })
            .catch(err => {
              res.status(200).json({
                STATUS: {
                  returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
                  message: err + '' 
                }
              });
            });
        } else {
          res.status(200).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Email already exists"
            }
          });
        }
      })
      .catch(err => {
        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + '' 
          }
        });
      });
  },

  login: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "email or password or is required."
        }
      });
    }

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(200).json({
        STATUS: {
          returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
          message: "email or password are a string."
        }
      });
    }

    _User
      .findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status("401").json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
              message: "User not Found"
            }
          });
        }
        if (!user.authenticate(password)) {
          res.status(401).json({
            STATUS: {
              returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
              message: "Email and password don't match."
            }
          });
        }
        

        const token = jwt.sign(
          {
            _id: user._id,
            accountType: user.accountType
          },
          config.jwtSecret
        );

        res.cookie("t", token, {
          expire: new Date() + 9999 
        });

        return res.status(200).json({
          STATUS:{
            returnCode: _ResponseBuilder.RETURN_CODE.SUCCESS,
            message: 'login successfully'
          },
          token: token
        })
      })
      .catch(err => {
        res.status(200).json({
          STATUS: {
            returnCode: _ResponseBuilder.RETURN_CODE.FAILURE,
            message: err + '' 
          }
        });
      });
  }
};
