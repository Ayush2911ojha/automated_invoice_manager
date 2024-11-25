const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env file

const geminiApiKey = process.env.GEMINI_API_KEY; // Get API key from environment variables

async function sendToGemini(processedData) {
  const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`; // Use the correct endpoint and API key

  try {
    const response = await axios.post(
      geminiEndpoint, // Use geminiEndpoint here
      {
        contents: [
          {
            parts: [
              {
                text: processedData.content, // Send the processed data's content
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json", // Set the appropriate headers
        },
      }
    );

    console.log("Gemini Response:", response.data); // Log the response for debugging
    return response.data; // Return the Gemini response to be used in your Express handler
  } catch (error) {
    console.error("Error sending data to Gemini:", error.response?.data || error.message);
    throw new Error("Failed to send data to Gemini");
  }
}

module.exports = sendToGemini;
