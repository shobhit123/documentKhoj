import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Modal
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  QuestionAnswer as QuestionAnswerIcon,
  HelpOutline as HelpOutlineIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Label as LabelIcon,
  QuestionAnswer
} from "@mui/icons-material";
import TagInput from "./TagInput";

const QAGenerator = ({ document, onQaListChange }) => {
  const [qaList, setQaList] = useState(document?.qaList || []);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentQA, setCurrentQA] = useState({
    question: "",
    answer: "",
    pageNumber: "",
    pageSection: "",
    references: "",
    is_llm_generated: false,
    tags: []
  });

  const handleOpenModal = (qa = null, index = null) => {
    setEditIndex(index);
    setCurrentQA(
      qa || {
        question: "",
        answer: "",
        pageNumber: "",
        pageSection: "",
        references: "",
        is_llm_generated: false,
        tags: []
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveQA = () => {
    if (!currentQA.question || !currentQA.answer) {
      alert("Question and Answer are required!");
      return;
    }

    const updatedList = [...qaList];
    editIndex !== null
      ? (updatedList[editIndex] = currentQA)
      : updatedList.push(currentQA);

    setQaList(updatedList);
    onQaListChange(false, [], updatedList);
    handleCloseModal();
  };
  
  const handleTagsChange = (newTags) => {
    onQaListChange(true, newTags, []);
  };

  return (
    <Box item xs={12} md={12}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            px: 2,
            py: 1,
            marginBottom: 2
          }}
        >
          <Typography variant="h6" fontWeight={600} color="primary">
            Q&A Generator
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => handleOpenModal()}
            sx={{
              padding: "6px 12px",
              fontSize: "14px",
              minWidth: "auto"
            }}
          >
            Add New Q&A
          </Button>
        </Box>

        {qaList.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            No Q&A generated yet. Click below to add a new Q&A.
          </Typography>
        ) : (
          qaList.map((qa, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                mb: 2,
                bgcolor: "#ffff",
                boxShadow: 2
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <strong>Q{index + 1}:</strong>
                    {qa.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      gap: 1
                    }}
                  >
                    <QuestionAnswer color="action" />
                    <strong>Answer:</strong> {qa.answer}
                  </Typography>
                  {qa.pageSection && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <DescriptionIcon color="action" />{" "}
                      <strong>Section:</strong> {qa.pageSection}
                    </Typography>
                  )}
                  {qa.references?.length > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <LinkIcon color="action" /> <strong>References:</strong>{" "}
                      {qa.references.join(", ")}
                    </Typography>
                  )}
                  {qa.tags?.length > 0 && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1
                      }}
                    >
                      <LabelIcon color="action" />
                      {qa.tags.map((tag, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            bgcolor: "primary.light",
                            borderRadius: 1,
                            fontSize: "0.875rem",
                            fontWeight: 500
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleOpenModal(qa, index)}
                    sx={{
                      color: "#1976d2",
                      "&:hover": { bgcolor: "#e3f2fd" },
                      mr: 1
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#f44336", "&:hover": { bgcolor: "#ffebee" } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 3,
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {editIndex !== null ? "Edit Q&A" : "Add New Q&A"}
          </Typography>
          <TextField
            fullWidth
            label="Question"
            value={currentQA.question}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, question: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Answer"
            value={currentQA.answer}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, answer: e.target.value })
            }
            multiline
            minRows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Page Number"
            type="number"
            value={currentQA.pageNumber}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, pageNumber: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Page Section"
            value={currentQA.pageSection}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, pageSection: e.target.value })
            }
            margin="normal"
          />
          <TagInput
            tagsArray={currentQA.tags}
            onTagsChange={handleTagsChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveQA}
            sx={{ mt: 2 }}
          >
            Save Q&A
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleCloseModal}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default QAGenerator;
