import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);
  const [parsedData, setParsedData] = useState(null);  // To store parsed Gemini response

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
  
    // Define allowed file extensions
    const allowedExtensions = [".xlsx", ".csv", ".pdf", ".png", ".jpg", ".jpeg"];
  
    // Check file type (only allow supported file types)
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert(`Unsupported file type. Please upload one of the following: ${allowedExtensions.join(", ")}`);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("File uploaded successfully:", data);
        setUploadedData(data.data); // Set the uploaded data to state
        
        // Parse the Gemini response
        const geminiResponse = data.geminiResponse;
        if (geminiResponse && geminiResponse.candidates) {
          const parsedInfo = geminiResponse.candidates[0]?.content?.parts[0]?.text;
          setParsedData(parsedInfo);  // Store parsed structured data
        }
      } else {
        console.error("Error:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div className="p-4 border border-dashed border-gray-400 rounded">
      <h2 className="text-xl font-semibold mb-2">Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleFileUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Upload Files
      </button>
      <p className="mt-2 text-sm text-gray-500">
        Supported formats: Excel, PDF, Images
      </p>

      {file && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Files:</h3>
          <ul>
            <li>{file.name}</li>
          </ul>
        </div>
      )}

      {uploadedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Extracted Data:</h3>
          <pre>{uploadedData.content}</pre>
        </div>
      )}

      {parsedData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Processed Invoice Information:</h3>
          <pre>{parsedData}</pre> {/* This will display structured Gemini response */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
