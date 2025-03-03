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
  Backdrop,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  Description,
  ModelTraining,
  Topic,
  Article,
} from "@mui/icons-material";
import TagInput from "./component/TagInput";
import UploadDocument from "./component/UploadDocument";
import QAGenerator from "./component/QAGenerator";
import { generateRealQA } from "../helper";
import { generateQA } from "../API/calls/generateQA";
import { getStrings } from "./common/strings";
import { submitDocument } from "../API/calls/submitDocument";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";

const DocumentUpload = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const [documentData, setDocumentData] = useState({
    documentName: "",
    pageLink: "",
    summary: "",
    numQA: "",
    tags: [],
    fileUploadResponse: null,
    isDocumentUploaded: false,
    qaList: [],
    question_guidance: "",
    topic: "",
    subTopic: "",
  });

  const navigate = useNavigate();
  const [updatedDocument, setUpdatedDocument] = useState(documentData || {});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
  const [isLocale, setIsLocale] = useState("en");
  const [isToggleOn, setIsToggleOff] = useState(false);
  const [isAddNewQuestionSelected, setIsAddNewQuestionSelected] =
    useState(false);

  const toggleLanguage = () => {
    if (isLocale === "en") {
      setIsLocale("hi");
    } else {
      setIsLocale("en");
    }
    setIsToggleOff(!isToggleOn);
  };

  const STRINGS = getStrings(isLocale);

  const handleUploadSuccess = (response, fileType) => {
    setDocumentData((prevData) => ({
      ...prevData,
      fileUploadResponse: {
        object_path: response?.object_path,
        mimeType: fileType,
      },
      isDocumentUploaded: true,
    }));
  };

  const handleChange = (field, value) => {
    setDocumentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleTagsChange = (newTags) => {
    setDocumentData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleQAListChange = (type, newTags, qnaList) => {
    if (type === "TAG") {
      setUpdatedDocument({
        ...documentData,
        tags: newTags,
      });
    } else if (type === "REF") {
      setUpdatedDocument({
        ...documentData,
        qaList: qnaList,
      });
    } else if (type === "QA_LIST") {
      setTimeout(() => {
        setDocumentData((prevData) => {
          const updatedData = { ...prevData, qaList: qnaList };
          setUpdatedDocument(updatedData);
          return updatedData;
        });
      });
    } else {
      setUpdatedDocument({
        ...documentData,
        qaList: qnaList,
      });
    }
  };

  const handleGenerateQA = async () => {
    const {
      documentName,
      summary,
      pageLink,
      fileUploadResponse,
      question_guidance,
      numQA,
      topic,
      subTopic,
    } = documentData;
    let missingFields = [];

    // Check for missing fields
    if (!documentName) missingFields.push("Document Name");
    if (!summary) missingFields.push("Summary");
    if (!pageLink) missingFields.push("Reference Link");
    if (!question_guidance) missingFields.push("Question Guidance");
    if (!topic) missingFields.push("Topic"); 
    if (!subTopic) missingFields.push("SubTopic");

    if (missingFields.length > 0) {
      const missingFieldsText = missingFields.join(", ");
      alert(
        `${STRINGS.formValidationMessage}: ${missingFieldsText} are required.`
      );
      return;
    }

    setLoading(true);
    const response = await generateQA(
      fileUploadResponse?.object_path,
      fileUploadResponse?.mimeType,
      question_guidance,
      numQA
    );

    if (response?.qna_response?.length) {
      const generatedQA = generateRealQA(response.qna_response);

      setTimeout(() => {
        setDocumentData((prevData) => {
          const updatedData = { ...prevData, qaList: generatedQA };
          setUpdatedDocument(updatedData);
          return updatedData;
        });

        setLoading(false);
        setExpanded(false); // Collapse document section after generating questions
      }, 2000);
    }
  };

  const handleOnSubmit = async () => {
    setLoading(true); // Show loader
    try {
      const response = await submitDocument(updatedDocument);
      if (response?.record_id) {
        setDocumentData({
          documentName: "",
          pageLink: "",
          summary: "",
          numQA: "",
          tags: [],
          fileUploadResponse: null,
          isDocumentUploaded: false,
          qaList: [],
          question_guidance: "",
          topic: "", 
          subTopic: "", 
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

  const handleOnAddNewQuestionClick = (state) => {
    setIsAddNewQuestionSelected(state);
  };

  return (
    <Box container spacing={4} sx={{ p: 3 }}>
      {/* Collapsible Header */}
      {loading && (
        <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ ml: 2, color: "#fff" }}>
            {STRINGS.processing_request}
          </Typography>
        </Backdrop>
      )}

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem
            button
            onClick={() => {
              navigate("/chat");
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <ChatIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Ask a Question or Chat with Us" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          px: 2,
          py: 1,
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" color="primary" />
        </IconButton>
        <Typography variant="h6" fontWeight={600} color="primary">
          {STRINGS.title}
        </Typography>

        <Box display="flex">
          {/* <Box display="flex" alignItems="center">
            <Typography variant="body1" fontWeight={100} color="primary">
              {STRINGS.selectedLanguage}
            </Typography>
            <Switch checked={isToggleOn} onChange={toggleLanguage} />
          </Box> */}
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
              {/* Topic Field */}
              <TextField
                fullWidth
                label="Topic"
                placeholder="Enter Topic"
                value={documentData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Topic />
                    </InputAdornment>
                  ),
                }}
              />

              {/* SubTopic Field */}
              <TextField
                fullWidth
                label="SubTopic"
                placeholder="Enter SubTopic"
                value={documentData.subTopic}
                onChange={(e) => handleChange("subTopic", e.target.value)}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Article />
                    </InputAdornment>
                  ),
                }}
              />

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
                  ),
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
                  ),
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
                  ),
                }}
              />

              <TagInput onTagsChange={handleTagsChange} STRINGS={STRINGS} />

              <TextField
                fullWidth
                type="number"
                label={STRINGS.numQA}
                value={documentData.numQA}
                placeholder={STRINGS.questionPlaceHolder}
                onChange={(e) => {
                  let value = e.target.value;

                  if (value === "") {
                    handleChange("numQA", "");
                    return;
                  }

                  let numValue = parseInt(value, 10);

                  if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
                    handleChange("numQA", numValue);
                  }
                }}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Quiz />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label={STRINGS.question_guidance}
                value={documentData.question_guidance}
                placeholder={STRINGS.question_guidancePlaceHolder}
                onChange={(e) =>
                  handleChange("question_guidance", e.target.value)
                }
                margin="dense"
                multiline
                minRows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ModelTraining />
                    </InputAdornment>
                  ),
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
              <UploadDocument
                onUploadSuccess={handleUploadSuccess}
                STRINGS={STRINGS}
              />
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
            STRINGS={STRINGS}
            onEditDetails={() => setExpanded(!expanded)}
            onReGenerateQA={handleGenerateQA}
            onAddNewQuestionSelected={handleOnAddNewQuestionClick}
          />
        </Box>
      )}

      {/* Submit Button */}
      {documentData.qaList?.length > 0 && (
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            disabled={isAddNewQuestionSelected}
            onClick={handleOnSubmit}
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