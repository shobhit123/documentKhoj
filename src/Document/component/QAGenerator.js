import React, { useState } from "react";
import {
  Box,
  Button,
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
  QuestionAnswer,
  Edit,
  Refresh,
  Add,
  RestartAlt,
  QuestionMark
} from "@mui/icons-material";
import TagInput from "./TagInput";

const QAGenerator = ({
  document,
  onQaListChange,
  STRINGS,
  onEditDetails,
  onReGenerateQA
}) => {
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
    tags: [],
    question_guidance: ""
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
        tags: [],
        question_guidance: ""
      }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveQA = () => {
    if (!currentQA.question || !currentQA.answer) {
      alert(STRINGS.questionAnswerRequired);
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
    setCurrentQA((prevQA) => ({
      ...prevQA,
      tags: newTags
    }));

    if (editIndex !== null) {
      const updatedList = [...qaList];
      updatedList[editIndex] = { ...updatedList[editIndex], tags: newTags };

      setQaList(updatedList);
    }
  };

  const handleDeleteQA = (index) => {
    const confirmDelete = window.confirm(STRINGS.sureToDelete);
    if (confirmDelete) {
      const updatedList = qaList.filter((_, i) => i !== index);
      setQaList(updatedList);
      onQaListChange(false, [], updatedList);
    }
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
            {STRINGS.title}
          </Typography>

          <Box display="flex" flexDirection="row" gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestartAlt />}
              onClick={() => {
                const userConfirmed = window.confirm(
                  STRINGS.confirmation_restart_journey
                );
                if (userConfirmed) {
                  window.location.reload();
                }
              }}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => {
                const userConfirmed = window.confirm(
                  STRINGS.confirmation_EditJourney
                );
                if (userConfirmed) {
                  onEditDetails();
                }
              }}
              sx={{
                padding: "6px 12px",
                fontSize: "14px",
                minWidth: "auto"
              }}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={() => {
                const userConfirmed = window.confirm(
                  STRINGS.confirmation_generateJourney
                );
                if (userConfirmed) {
                  onReGenerateQA();
                }
              }}
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleOpenModal()}
            />
          </Box>
        </Box>

        {qaList.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {STRINGS.noQAgenerated}
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
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      gap: 1
                    }}
                  >
                    <QuestionMark color="action" />
                    <strong>{STRINGS.questionLabel}</strong>{" "}
                    <strong>{qa.question}</strong>
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
                    <strong>{STRINGS.answerLabel}</strong> {qa.answer}
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
                      <strong>{STRINGS.sectionLabel}</strong> {qa.pageSection}
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
                      <LinkIcon color="action" />{" "}
                      <strong>{STRINGS.referencesLabel}</strong>{" "}
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
                    onClick={() => handleDeleteQA(index)}
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
            {editIndex !== null ? STRINGS.editQA : STRINGS.addQA}
          </Typography>
          <TextField
            fullWidth
            label={STRINGS.questionLabel}
            value={currentQA.question}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, question: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label={STRINGS.answer}
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
            label={STRINGS.pageNumber}
            type="number"
            value={currentQA.pageNumber}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, pageNumber: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label={STRINGS.pageSection}
            value={currentQA.pageSection}
            onChange={(e) =>
              setCurrentQA({ ...currentQA, pageSection: e.target.value })
            }
            margin="normal"
          />
          <TagInput
            tagsArray={currentQA.tags}
            onTagsChange={handleTagsChange}
            STRINGS={STRINGS}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveQA}
            sx={{ mt: 2 }}
          >
            {STRINGS.saveQA}
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleCloseModal}
            sx={{ mt: 1 }}
          >
            {STRINGS.cancel}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default QAGenerator;
