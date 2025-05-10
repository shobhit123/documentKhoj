import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { AttachFile, Delete } from "@mui/icons-material";
import "./qaEvaluation.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RatingsBoxTable from "../Ratings";
import withLayout from "src/providers/hoc/withLayout";

const QAEvaluation: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(true);


  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <Typography variant="h6" className="heading">
        QA Evaluation Service
      </Typography>

      <Accordion
        expanded={accordionExpanded}
        onChange={() => setAccordionExpanded(!accordionExpanded)}
        className="accordion-container"
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ color: "#1976d2", transition: "transform 0.3s ease" }}
            />
          }
          sx={{
            minHeight: "48px",
            "&.Mui-expanded": {
              minHeight: "48px",
            },
          }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">
            {!accordionExpanded && selectedFile?.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} className="container">
            <TextField
              label="API Endpoint"
              variant="outlined"
              fullWidth
              value="https://api.bankapp.com/evaluation"
              disabled
              className="apiInput"
            />

            {/* Drag & Drop + Browse Files */}
            <div
              className={`uploadBox ${dragging ? "dragOver" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  className="uploadButton"
                >
                  Browse Files
                </Button>
              </label>
              <Typography variant="body2" className="dragText">
                or Drag & Drop here
              </Typography>

              {/* Show selected file inside upload box */}
              {selectedFile && (
                <div className="fileDetails">
                  <AttachFile className="fileIcon" />
                  <Typography variant="body2" className="fileName">
                    {selectedFile.name}
                  </Typography>
                  <Delete className="deleteIcon" onClick={removeFile} />
                </div>
              )}
            </div>

            {/* Start Evaluation Button */}
            <Button
              variant="contained"
              className="evaluateButton"
              disabled={!selectedFile}
              onClick={() => {
                setOpenFeedback(true);
                setAccordionExpanded(false);
              }}
            >
              Start Evaluation
            </Button>
          </Paper>
        </AccordionDetails>
      </Accordion>

      {openFeedback && <RatingsBoxTable fromExternal={true} />}
    </>
  );
};

export default withLayout(QAEvaluation);
