import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { uploadFileService } from "../../API/calls/uploadService";
import { Delete } from "@mui/icons-material";

const UploadDocument = ({ onUploadSuccess, STRINGS }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const ALLOWED_TYPES = ["pdf", "docx", "xls"];
  const MAX_SIZE = 10 * 1024 * 1024;

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

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    setResponse(null);
    setUploadProgress(0);
    setUploading(false)
  };

  const renderFilePreview = () => {
    if (!file || !filePreview) return null;
    return (
      <Box sx={styles.previewContainer}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
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
            height="400px"
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
      {!filePreview && (
        <Box>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.xls,.css"
            style={{ display: "none" }}
            id="upload-file-input"
          />
          <label htmlFor="upload-file-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<InsertDriveFileIcon />}
              sx={styles.selectFileButton}
            >
              {STRINGS.selectFile}
            </Button>
          </label>

          {file && (
            <Typography variant="body2" sx={styles.uploadingText}>
              {file.name}
            </Typography>
          )}

          {file && (
            <Box>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={uploadFile}
                sx={styles.uploadButton}
                disabled={uploading}
              >
                {STRINGS.uploadButton}
              </Button>
              {/* <Button
                variant="outlined"
                startIcon={<Delete />}
                onClick={removeFile}
                sx={styles.removeButton}
              >
                {STRINGS.removeFile}
              </Button> */}
            </Box>
          )}

          {uploading && (
            <Box sx={styles.uploadProgressContainer}>
              <CircularProgress
                variant="determinate"
                value={uploadProgress}
                sx={styles.progress}
              />
              <Typography variant="body2" sx={styles.uploadingText}>
                {STRINGS.uploading}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {renderFilePreview()}
      {uploading && (
        <Box sx={styles.uploadProgressContainer}>
          <CircularProgress
            variant="determinate"
            value={uploadProgress}
            sx={styles.progress}
          />
          <Typography variant="body2" sx={styles.uploadingText}>
            {STRINGS.uploading}
          </Typography>
        </Box>
      )}
      {response && (
        <Box>
          <Typography variant="body1" sx={styles.successMessage}>
            {STRINGS.documentUploadSuccess}
          </Typography>
          <Typography variant="body2">
            {STRINGS.filePath}:{" "}
            <strong>
              {response?.object_path
                ?.replace("gs://ai-utilities-storage/", "")
                .replace(/\//g, " → ")}
            </strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "10px",
    margin: "auto"
  },
  selectFileButton: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1565c0"
    },
    marginBottom: 1
  },
  uploadingText: {
    fontSize: "14px",
    color: "#888",
    marginTop: "10px"
  },
  uploadButton: {
    padding: "12px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#388e3c"
    }
  },
  uploadProgressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  },
  progress: {
    marginBottom: "10px"
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    width: "90%",
    marginTop: 4
  },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "200px",
    objectFit: "contain"
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    color: "#388e3c",
    justifyContent: "center",
    marginTop: 1
  },
  removeButton: {
    marginLeft: "10px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    marginLeft: "8px",
    "&:hover": {
      backgroundColor: "#b71c1c"
    }
  }
};

export default UploadDocument;
