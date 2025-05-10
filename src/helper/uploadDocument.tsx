import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { uploadFileService } from "../services/uploadService";
import { Delete } from "@mui/icons-material";

type UploadDocumentProps = {
  onUploadSuccess: (response: any, fileType: string) => void;
  STRINGS: Record<string, string>;
};

type UploadResponse = {
  object_path?: string;
};

const UploadDocument: React.FC<UploadDocumentProps> = ({ onUploadSuccess, STRINGS }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [response, setResponse] = useState<UploadResponse | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const ALLOWED_TYPES = ["pdf", "docx", "xls"];
  const MAX_SIZE = 10 * 1024 * 1024;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !ALLOWED_TYPES.includes(fileExtension)) {
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
      const base64Data = (reader.result as string).split(",")[1];
      setUploading(true);
      setUploadProgress(0);
      try {
        const response = await uploadFileService(base64Data, file.name, file.type);
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
    setUploading(false);
  };

  return (
    <Box sx={styles.container}>
      {!filePreview && (
        <Box>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.xls"
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
            </Box>
          )}
        </Box>
      )}
      {uploading && (
        <Box sx={styles.uploadProgressContainer}>
          <CircularProgress variant="determinate" value={uploadProgress} sx={styles.progress} />
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
            {STRINGS.filePath}: <strong>{response?.object_path?.replace("gs://ai-utilities-storage/", "").replace(/\//g, " → ")}</strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const styles = {
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
  successMessage: {
    display: "flex",
    alignItems: "center",
    color: "#388e3c",
    justifyContent: "center",
    marginTop: 1
  }
};

export default UploadDocument;
