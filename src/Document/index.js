import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  InputAdornment,
  Box,
  IconButton,
  Collapse,
  Grid,
  Backdrop
} from "@mui/material";
import {
  Description as DocumentIcon,
  ExpandLess,
  ExpandMore,
  PictureAsPdf as PdfIcon,
  Save as SaveIcon,
  Summarize,
  Quiz,
  Pages,
  Description
} from "@mui/icons-material";
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
    pageLink: "",
    summary: "",
    numQA: "",
    tags: [],
    fileUploadResponse: null,
    isDocumentUploaded: false,
    qaList: []
  });

  const [updatedDocument, setUpdatedDocument] = useState(documentData || {});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showPDF, setShowPDF] = useState(false);

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

  const handleGenerateQA = async () => {
    const { documentName, summary, pageLink, fileUploadResponse } =
      documentData;
    if (!documentName || !summary || !pageLink) {
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
        setExpanded(false); // Collapse document section after generating questions
      }, 2000);
    }
  };

  const handleOnSubmit = async () => {
    setLoading(true); // Show loader

    try {
      const response = await submitDocument(updatedDocument);
      console.log("response", response);

      if (response?.record_id) {
        setDocumentData({
          documentName: "",
          pageLink: "",
          summary: "",
          numQA: "",
          tags: [],
          fileUploadResponse: null,
          isDocumentUploaded: false,
          qaList: []
        });

        alert(STRINGS.document_submitted_successfully);
        window.location.reload(); // Reload page on success
      } else {
        alert(STRINGS.something_went_wrong_to_upload);
      }
    } catch (error) {
      alert(STRINGS.something_went_wrong_to_upload);
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };

  return (
    <Box container spacing={4} sx={{ p: 3 }}>
      {/* Collapsible Header */}
      {loading && (
        <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          px: 2,
          py: 1
        }}
      >
        <Typography variant="h6" fontWeight={600} color="primary">
          {STRINGS.title}
        </Typography>
        <Box>
          {documentData.fileUploadResponse?.object_path && !expanded && (
            <IconButton onClick={() => setShowPDF(!showPDF)} color="primary">
              <PdfIcon />
            </IconButton>
          )}
          {documentData?.qaList?.length > 0 && (
            <IconButton
              onClick={() => {
                setExpanded(!expanded);
                setShowPDF(false);
              }}
              color="primary"
            >
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>
      </Box>

      {/* PDF Viewer (Toggles on button click) */}
      {showPDF && !expanded && (
        <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
          <iframe
            src={documentData.fileUploadResponse?.object_path}
            title="PDF Viewer"
            width="100%"
            height="400px"
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setShowPDF(false)}
          >
            Close PDF
          </Button>
        </Box>
      )}

      {/* Collapsible Document Details Section */}
      <Collapse in={expanded}>
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            <DocumentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            {STRINGS.documentDetails}
          </Typography>

          <Grid container spacing={1} style={{ alignItems: "center" }}>
            {/* Left Section: Other Inputs */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={STRINGS.fileName}
                placeholder={STRINGS.fileNamePlaceholder}
                value={documentData.documentName}
                onChange={(e) => handleChange("documentName", e.target.value)}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label={STRINGS.pageLink}
                value={documentData.pageLink}
                placeholder={STRINGS.pageLinkPlaceHolder}
                onChange={(e) => handleChange("pageLink", e.target.value)}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pages />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                fullWidth
                label={STRINGS.summary}
                value={documentData.summary}
                placeholder={STRINGS.summaryPlaceHolder}
                onChange={(e) => handleChange("summary", e.target.value)}
                margin="dense"
                multiline
                minRows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Summarize />
                    </InputAdornment>
                  )
                }}
              />

              <TagInput onTagsChange={handleTagsChange} />

              <TextField
                fullWidth
                type="number"
                label={STRINGS.numQA}
                value={documentData.numQA}
                placeholder={STRINGS.questionPlaceHolder}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 1 && value <= 100) {
                    handleChange("numQA", value);
                  }
                }}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Quiz />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                variant="contained"
                fullWidth
                disabled={loading || !documentData.isDocumentUploaded}
                onClick={handleGenerateQA}
                sx={{ mt: 2, py: 1 }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  STRINGS.generateQA
                )}
              </Button>

              {!documentData.isDocumentUploaded && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {STRINGS.uploadWarning}
                </Typography>
              )}
            </Grid>

            {/* Right Section: Upload Document */}
            <Grid item xs={12} md={6}>
              <UploadDocument onUploadSuccess={handleUploadSuccess} />
            </Grid>
          </Grid>
        </Card>
      </Collapse>

      {/* QA Section */}
      {documentData.qaList?.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <QAGenerator
            document={documentData}
            onQaListChange={handleQAListChange}
          />
        </Box>
      )}

      {/* Submit Button */}
      {documentData.qaList?.length > 0 && (
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleOnSubmit}
            sx={{ py: 1, backgroundColor: "#2e7d32" }}
            startIcon={<SaveIcon />}
          >
            {STRINGS.submit}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DocumentUpload;
