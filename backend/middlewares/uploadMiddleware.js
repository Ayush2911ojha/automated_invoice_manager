const multer = require('multer');

// Custom file filter to allow only certain file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type, only PDF and Excel files are allowed!'), false);
    }
};

const upload = multer({ dest: 'uploads/', fileFilter: fileFilter });

module.exports = upload;
