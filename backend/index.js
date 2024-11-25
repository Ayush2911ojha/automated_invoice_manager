const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const XLSX = require("xlsx");



const sendToGemini = require("./utils/geminiService"); // Import the actual Gemini service function

const app = express();
const upload = multer({ dest: "uploads/" }); // Upload files to 'uploads/' directory

app.post("/api/files/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const fileType = req.file.mimetype;

  let processedData = { content: null };

  try {
    if (fileType === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      processedData.content = data.text;
    } else if (fileType.startsWith("image/")) {
      const result = await Tesseract.recognize(filePath, "eng");
      processedData.content = result.data.text;
    } else if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      const workbook = XLSX.readFile(filePath);
      const sheetsData = {};
      workbook.SheetNames.forEach((sheetName) => {
        sheetsData[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      });
      processedData.content = sheetsData;
    } else {
      throw new Error("Unsupported file type");
    }

    fs.unlinkSync(filePath); // Cleanup uploaded file

    // Send data to Gemini
    const geminiResponse = await sendToGemini(processedData);

    // Respond with processed data and Gemini response
    return res.status(200).json({
      message: `${fileType} processed successfully`,
      data: processedData,
      geminiResponse,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return res.status(500).json({ message: "Error processing file" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
