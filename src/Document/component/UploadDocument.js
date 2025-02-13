import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFileService } from "../../API/calls/uploadService";
import { styles } from "../common/styles";
import { STRINGS } from "../common/strings";


const UploadDocument = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Allowed file types and size limit
  const ALLOWED_TYPES = ["pdf", "docx", "xls", "css"];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (!ALLOWED_TYPES.includes(fileExtension)) {
      alert(STRINGS.invalidFileType);
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      alert(STRINGS.fileSizeExceeded);
      return;
    }

    setFile(selectedFile);
  };

  // Convert file to Base64 and Upload
  const uploadFile = () => {
    if (!file) {
      alert(STRINGS.selectFileFirst);
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
        const response = await uploadFileService(
          base64Data,
          file.name,
          file.type
        );
        setResponse(response);
        onUploadSuccess(response, file.type);
      } catch (error) {
        alert(STRINGS.uploadFailed);
      } finally {
        setUploading(false);
        setUploadProgress(100);
      }
    };

    reader.onerror = () => {
      alert(STRINGS.fileReadError);
    };
  };

  // Render file preview based on file type
  const renderFilePreview = () => {
    if (!file || !filePreview) return null;
    return (
      <Box sx={styles.previewContainer}>
        <Typography variant="body2">
          {STRINGS.uploadedFile}: {file.name}
        </Typography>
        {file.type.startsWith("image/") ? (
          <img
            src={filePreview}
            alt="Uploaded Preview"
            style={styles.imagePreview}
          />
        ) : file.type === "application/pdf" ? (
          <iframe
            src={filePreview}
            width="100%"
            height="200px"
            title="PDF Preview"
          ></iframe>
        ) : (
          <Typography variant="body2">{STRINGS.previewNotAvailable}</Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={styles.container}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.docx,.xls,.css"
      />      
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={uploadFile}
        sx={styles.uploadButton}
        disabled={uploading}
      >
        {STRINGS.uploadButton}
      </Button>

      {uploading && (
        <CircularProgress variant="determinate" value={uploadProgress} />
      )}

      {response && (
        <>
          {renderFilePreview()}
          <Typography variant="body1" sx={styles.successMessage}>
            ✅ {response.message}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default UploadDocument;
