const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/png': '.png'
    }
    const name = uuidv4();
    cb(null, name + mimeExtension[file.mimetype]);
  }
})

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileError = 'Formato incompatible.';
    }
  }
}).single('image');

module.exports = {
  uploadImage
}