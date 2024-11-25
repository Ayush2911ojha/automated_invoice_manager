// utils/fileHelper.js
const xlsx = require('xlsx');

const processExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet); // Converts sheet to JSON
   

    const excelData = processExcelFile({ path: '"C:\Users\Dell!\Downloads\Copy of Invoice_EInvoices_2024-11-11-2024-11-17.xlsx"' });
    console.log(excelData);
    return data; // Return the extracted data as an array of objects
};

module.exports = { processExcelFile };

// utils/fileHelper.js

