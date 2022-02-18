const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('jpeg') ||
    file.mimetype.includes('png') ||
    file.mimetype.includes('jpg')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage,
  limits: {
    fileSize: 5000 * 1024 * 1024
  },
  fileFilter
});
upload = upload.fields([
  { name: 'avatarImage', maxCount: 1 },
  { name: 'clinicImage', maxCount: 1 },
  { name: 'licenseImage', maxCount: 1 },
  { name: 'certificateImage', maxCount: 1 },
]);

module.exports = {
  upload
};
