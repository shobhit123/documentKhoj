import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Stack,
  Divider
} from "@mui/material";
import TagInput from "./component/TagInput";
import UploadDocument from "./component/UploadDocument";
import QAGenerator from "./component/QAGenerator";
import { generateRealQA } from "../helper";
import { generateQA } from "../API/calls/generateQA";
import { STRINGS } from "./common/strings";
import { submitDocument } from "../API/calls/submitDocument";

const DocumentUpload = () => {
  const [documentData, setDocumentData] = useState({
    documentName: "",
    summary: "",
    numQA: "",
    tags: [],
    fileUploadResponse: null,
    isDocumentUploaded: false,
    qaList: []
  });

  const [updatedDocument, setUpdatedDocument] = useState(documentData || {});
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (response, fileType) => {
    setDocumentData((prevData) => ({
      ...prevData,
      fileUploadResponse: {
        object_path: response?.object_path,
        mimeType: fileType
      },
      isDocumentUploaded: true
    }));
  };

  const handleChange = (field, value) => {
    setDocumentData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleTagsChange = (newTags) => {
    setDocumentData((prevData) => ({
      ...prevData,
      tags: newTags
    }));
  };

  const handleGenerateQA = async () => {
    const { documentName, summary, fileUploadResponse } = documentData;
    if (!documentName || !summary) {
      alert(STRINGS.formValidationMessage);
      return;
    }

    setLoading(true);
    const response = await generateQA(
      fileUploadResponse?.object_path,
      fileUploadResponse?.mimeType
    );
    if (response?.qna_response?.length) {
      setTimeout(() => {
        setDocumentData((prevData) => ({
          ...prevData,
          qaList: generateRealQA(response.qna_response)
        }));
        setLoading(false);
      }, 2000);
    }
  };

  const handleOnSubmit = async () => {
    const response = await submitDocument(updatedDocument);
    if (response?.qna_response?.length) {
      setTimeout(() => {
        setDocumentData((prevData) => ({
          ...prevData,
          qaList: generateRealQA(response.qna_response)
        }));
        setLoading(false);
      }, 2000);
    }
  };

  const handleQAListChange = (isTags, newTags, qnaList) => {
    if (isTags) {
      setUpdatedDocument({
        ...documentData,
        tags: newTags
      });
    } else {
      setUpdatedDocument({
        ...documentData,
        qaList: qnaList
      });
    }
  };

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {/* Header */}
      <Grid item xs={12} textAlign="center">
        <Typography variant="h3" fontWeight="bold" color="primary">
          {STRINGS.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {STRINGS.description} - <strong>{STRINGS.version}</strong>
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Grid>

      {/* Left Panel - Document Upload */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom color="secondary">
            {STRINGS.documentDetails}
          </Typography>
          <TextField
            fullWidth
            label={STRINGS.fileName}
            value={documentData.documentName}
            onChange={(e) => handleChange("documentName", e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label={STRINGS.summary}
            value={documentData.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            margin="dense"
            multiline
            minRows={3}
          />
          <UploadDocument onUploadSuccess={handleUploadSuccess} />
          <TagInput onTagsChange={handleTagsChange} />
          <TextField
            fullWidth
            type="number"
            label={STRINGS.numQA}
            value={documentData.numQA}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 1 && value <= 10) {
                handleChange("numQA", value);
              }
            }}
            margin="dense"
            inputProps={{ min: 1, max: 10 }}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={loading || !documentData.isDocumentUploaded}
            onClick={handleGenerateQA}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#1976d2",
              ":hover": { backgroundColor: "#1565c0" }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : STRINGS.generateQA}
          </Button>
          {!documentData.isDocumentUploaded && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {STRINGS.uploadWarning}
            </Typography>
          )}
        </Card>
      </Grid>

      {/* Right Panel - Generated Q&A */}
      {documentData.qaList.length > 0 && (
        <Grid item xs={12} md={6}>
          <QAGenerator document={documentData} onQaListChange={handleQAListChange} />
        </Grid>
      )}

      {documentData.qaList.length > 0 && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOnSubmit}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#2e7d32",
              ":hover": { backgroundColor: "#1b5e20" }
            }}
          >
            {STRINGS.submit}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default DocumentUpload;
