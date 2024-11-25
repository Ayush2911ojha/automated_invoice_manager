const vision = require('@google-cloud/vision');
const language = require('@google-cloud/language');
const xlsx = require('xlsx');
const fs = require('fs');

// Google Vision client
const visionClient = new vision.ImageAnnotatorClient();
const languageClient = new language.LanguageServiceClient();

// Function to extract text from image or pdf using Vision API
async function extractTextFromFile(filePath) {
  const [result] = await visionClient.textDetection(filePath);
  const text = result.textAnnotations[0].description;
  return text;
}

// Function to process Excel files
function extractDataFromExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Assume data is in the first sheet
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
}

// Function to analyze text and extract relevant data
async function analyzeText(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await languageClient.analyzeEntities({ document });
  const entities = result.entities;
  return entities;
}

module.exports = { extractTextFromFile, extractDataFromExcel, analyzeText };
