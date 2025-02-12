import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFileService } from "../../API/calls/uploadService.js";

const UploadDocument = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const [filePreview, setFilePreview] = useState(null);

  // Allowed file types
  const allowedTypes = ["pdf", "docx", "xls", "css"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      alert("Invalid file type. Only PDF, DOCX, XLS, and CSS are allowed.");
      return;
    }

    if (selectedFile.size > maxSize) {
      alert("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
  };

  // Convert file to Base64 and Upload
  const uploadFile = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setFilePreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1];
      setUploading(true);
      setUploadProgress(0);
      try {
        const response = await uploadFileService(base64Data, file.name, file.type);                    
        setResponse(response);        
        onUploadSuccess(response, file.type);
      } catch (error) {
        alert("Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(100);
      }
    };

    reader.onerror = () => {
      alert("Failed to read file.");
    };
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.docx,.xls,.css"
      />
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={uploadFile}
        style={{ margin: "10px" }}
        disabled={uploading}
      >
        Upload
      </Button>

      {/* Upload Progress */}
      {uploading && (
        <CircularProgress variant="determinate" value={uploadProgress} />
      )}

      {/* Show Response */}
      {response && (
        <>
          {filePreview && (
            <Box
              sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
            >
              <Typography variant="body2">Uploaded: {file.name}</Typography>
              {file.type.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="Uploaded Preview"
                  style={{ width: "100%", borderRadius: 4 }}
                />
              ) : file.type === "application/pdf" ? (
                <iframe
                  src={filePreview}
                  width="100%"
                  height="200px"
                  title="PDF Preview"
                ></iframe>
              ) : (
                <Typography variant="body2">Preview not available</Typography>
              )}
            </Box>
          )}
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            ✅ {response.message}
          </Typography>         
        </>
      )}
    </div>
  );
};

export default UploadDocument;
