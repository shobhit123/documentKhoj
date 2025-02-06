import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import TagInput from "./component/TagInput";
import UploadDocument from "./component/UploadDocument";
import QAGenerator from "./component/QAGenerator";
import { generateMockQA } from "../helper";


const metadata = {
  title: "QNA Creation Utility",
  description:
    "QNA Creation Utility to generate Question and Answer based on uploaded document",
  version: "0.1.0"
};

const DocumentUpload = () => {
  const [pageLink, setPageLink] = useState("");
  const [docName, setDocName] = useState("");
  const [numQA, setNumQA] = useState("");
  const [loading, setLoading] = useState(false);
  const [qaList, setQaList] = useState([]); 
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);


  const handleUploadSuccess = (response) => {
    console.log("Upload response:", response);
    setIsDocumentUploaded(true);
  };

  // Validate form before generating Q&A
  const isFormValid = pageLink && docName;

  // Handle Generate Q&A
  const handleGenerateQA = () => {
    if (!isFormValid) {
      alert("Please fill all the details before generating Q&A.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setQaList(generateMockQA(parseInt(numQA, 10) || 0));
      setLoading(false);
    }, 2000);
  };

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      <div style={{ width: "100%" }}>
        <Typography variant="h4" fontWeight="bold">
          {metadata.title}
        </Typography>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            paddingLeft: "16px",
            gap: "8px"
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            {metadata.description}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            (Version: {metadata.version})
          </Typography>
        </div>
      </div>

      {/* Left Side: Document Upload */}
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
          <Typography variant="h5" gutterBottom>
            Document Details
          </Typography>

          <TextField
            fullWidth
            label="File Name"
            value={pageLink}
            onChange={(e) => setPageLink(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Summary of Document"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            margin="normal"
            multiline
            minRows={3} // Allows it to start with 3 rows and expand as needed
            maxRows={100} // Optional: Limits max expansion
          />

          <UploadDocument onUploadSuccess={handleUploadSuccess} />

          <TagInput />
          <TextField
            fullWidth
            type="number"
            label="No of Q&A"
            value={numQA}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 1 && value <= 10) {
                setNumQA(value);
              }
            }}
            margin="normal"
            inputProps={{
              min: 1,
              max: 10
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading || !isDocumentUploaded}
            onClick={handleGenerateQA}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Q&A"}
          </Button>
          {!isDocumentUploaded && (
            <Typography variant="h10">
              please upload document to enable this action
            </Typography>
          )}
        </Box>
      </Grid>

      {/* Right Side: Q&A Display */}

      {qaList?.length > 0 && <QAGenerator />}
    </Grid>
  );
};

export default DocumentUpload;
