// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

const DownloadButton = () => {
    const handleDownload = async () => {
      try {
        const response = await axios.get("http://localhost:8000/download", { responseType: "blob" });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "enhanced_data.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Download Error:", error.response?.data || error.message);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            onClick={handleDownload}
        >
            Download Enhanced Data
        </button>
      </div>
    );
};
  
export default DownloadButton;