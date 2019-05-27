import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype.match(/jpe|jpeg|png|jpg$i/)) {
    cb(null, true);
  } else {
    const error = new Error('Only JPG/PNG images are allowed');
    error.status = 422;
    error.success = false;
    cb(error, false);
  }
};

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

export default upload;
