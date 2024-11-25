const express = require("express");
const { uploadFile } = require("../controllers/fileUploadController");
const multer = require("multer");

// Configure Multer for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Timestamp + original file name
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only .xlsx files
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      cb(null, true);
    } else {
      cb(new Error("Only .xlsx files are allowed!"));
    }
  },
});

const router = express.Router();

// POST: Upload a file
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
