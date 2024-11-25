const uploadFile = (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      res.status(200).json({
        message: "File uploaded successfully",
        filePath: req.file.path,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { uploadFile };
  