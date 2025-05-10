import React from "react";
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
  // Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButtonGroup,
  ToggleButton,
  Divider
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
  KeyboardArrowRight
} from "@mui/icons-material";
import TagInput from "../../helper/tagInput";
import UploadDocument from "../../helper/uploadDocument";
import QAGenerator from "../../helper/qaGenerator";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import PaletteIcon from "@mui/icons-material/Palette";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { handleGenerateQA } from "src/pages/DocumentUpload/documentUploadService";
import useDocumentUploadHook from "./useDocumentUploadHook";
import ThemeToggleButton from "src/providers/theme/themeToggleButton";
import LanguageToggleButton from "src/providers/language/languageToggleButton";
import Drawer from "../../components/organisms/Drawer";

const DocumentUpload = () => {

  const {
    drawerOpen,
    setDrawerOpen,
    toggleDrawer,
    navigate,
    loading,
    expanded,
    setExpanded,
    showPDF,
    setShowPDF,
    isAddNewQuestionSelected,
    toggleLanguage,
    handleUploadSuccess,
    handleChange,
    handleTagsChange,
    handleQAListChange,
    handleOnSubmit,
    handleOnAddNewQuestionClick,
    STRINGS,
    documentData,
    setDocumentData,
    setLoading,
    setUpdatedDocument,
    isToggleOn,
    setAccordionExpanded,
    accordionExpanded

  } = useDocumentUploadHook();

  return (
    // <Box container spacing={4} sx={{ p: 3 }}> //todo
    <Box sx={{ p: 3 }}>
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
      <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>

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
                onClick={() =>
                  handleGenerateQA(
                    documentData,
                    STRINGS,
                    setLoading,
                    setExpanded,
                    setDocumentData,
                    setUpdatedDocument
                  )
                }
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
            // onReGenerateQA={handleGenerateQA} todo: //
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
