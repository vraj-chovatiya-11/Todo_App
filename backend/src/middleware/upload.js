const multer = require('multer');
const path = require('path');
const fs = require('fs');

exports.upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
}).single("profileImage");