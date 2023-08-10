const bcryptService = require("./bcrypt.service");
const queryService = require("./query.service");
const jwtService = require("./jwt.service");
const multerService = require("./multer.service");
const { sendMail } = require("./mail");

module.exports = {
  jwtService,
  queryService,
  bcryptService,
  multerService,
  sendMail,
};
