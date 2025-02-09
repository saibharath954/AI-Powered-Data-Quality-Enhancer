// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import DownloadButton from "./DownloadButton";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false); // Controls Download Button Visibility

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setIsProcessed(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setMessage("Uploading and processing...");
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message || "File uploaded successfully!");
      setSuggestions(response.data.suggestions || []);      
      setIsProcessed(true);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      setMessage("Error uploading file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <h1 className='font-bold text-red-500 text-3xl p-8'>AI-Powered Data Quality Enhancer</h1>
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-200">
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 border border-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-sm">{file ? file.name : "Choose a file"}</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleUpload}
          disabled={!file || isProcessing}
        >
          {isProcessing ? "Processing..." : "Upload"}
        </button>

        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
        {suggestions.length > 0 && (
          <div className="text-sm text-gray-700">
            <p className="font-bold">Suggestions:</p>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {isProcessed && <DownloadButton />}
      </div>
    </div>
  );
};

export default FileUpload;
