const multer = require('multer');
const path = require('path');

// 1. Storage Configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists in your root directory!
  },
  filename(req, file, cb) {
    // Result: image-1710842400000.jpg
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// 2. File Filter (Only allow images)
const checkFileTypes = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png, webp)'));
  }
};

// 3. The Middleware Export
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Limit: 5MB per image
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

module.exports = upload;