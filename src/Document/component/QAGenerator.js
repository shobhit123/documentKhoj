import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Fab,
  Snackbar,
  Alert,
  InputAdornment
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  QuestionAnswer as QuestionAnswerIcon,
  HelpOutline as HelpOutlineIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Label as LabelIcon,
  Add
} from "@mui/icons-material";
import TagInput from "./TagInput";
import ReferencesCard from "./ReferencesCard";
import JSONToCSVConverter from "./JSONToCSVConverter";
import CSVtoJSONConverter from "./CSVToJSONConverter";

const QAGenerator = ({
  document,
  onQaListChange,
  STRINGS,
  onEditDetails,
  onAddNewQuestionSelected
}) => {
  // const [qaList, setQaList] = useState(document?.qaList || []);
  const [qaList, setQaList] = useState([]);
  const [addNewQuestion, setAddNewQuestion] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentQA, setCurrentQA] = useState({
    question: "",
    answer: "",
    pageNumber: "",
    pageSection: "",
    references: [],
    is_llm_generated: false,
    tags: [],
    question_guidance: ""
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [newReferences, setNewReferences] = useState({});
  const [newReferenceQuestion, setNewReferenceQuestion] = useState("");

  useEffect(() => {
    setQaList(document?.qaList);
  }, [document?.qaList]);

  const handleAddNewQuestion = (qa = null, index = null) => {
    setEditIndex(index);
    setCurrentQA(
      qa || {
        question: "",
        answer: "",
        pageNumber: "",
        pageSection: "",
        references: [],
        is_llm_generated: false,
        tags: [],
        question_guidance: ""
      }
    );
    setAddNewQuestion(true);
  };

  const handleCloseModal = () => {
    setAddNewQuestion(false);
    onAddNewQuestionSelected(false);
  };

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
    onQaListChange("", [], updatedList);
    handleCloseModal();
    onAddNewQuestionSelected(false);
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
      // onQaListChange(true, newTags, []);
      onQaListChange("TAG", newTags, []);
    }
  };

  const handleDeleteQA = (index) => {
    const confirmDelete = window.confirm(STRINGS.sureToDelete);
    if (confirmDelete) {
      const updatedList = qaList.filter((_, i) => i !== index);
      setQaList(updatedList);
      // onQaListChange(false, [], updatedList);
      onQaListChange("", [], updatedList);
    }
  };

  const handleAddQuestion = () => {
    if (addNewQuestion) {
      setShowSnackbar(true);
    } else {
      onAddNewQuestionSelected(true);
      handleAddNewQuestion(true);
    }
  };

  const handleAddReference = (index) => {
    const referenceText = newReferences[index]?.trim();
    if (referenceText) {
      const updatedReferences = [...qaList[index].references, referenceText];

      const updatedList = [...qaList];
      updatedList[index] = {
        ...updatedList[index],
        references: updatedReferences
      };

      setQaList(updatedList);
      setNewReferences({ ...newReferences, [index]: "" });
      onQaListChange("REF", [], updatedList);
    }
  };

  const handleAddReferenceQuestion = () => {
    if (newReferenceQuestion.trim() !== "") {
      setCurrentQA((prevQA) => ({
        ...prevQA,
        references: [...(currentQA.references || []), newReferenceQuestion]
      }));

      setNewReferenceQuestion("");
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", pb: 10 }}>
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
            {STRINGS.generatedQuestion}
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "flex-end"
            }}
          >
            
            <JSONToCSVConverter jsonData={qaList} fileName="Questions" />
            <CSVtoJSONConverter
              STRINGS={STRINGS}
              onQaListChange={(list) => {
                list?.length > 0 && onQaListChange("QA_LIST", [], list);
              }}
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
                <Box width="100%">
                  <TextField
                    fullWidth
                    label={STRINGS.questionLabel}
                    value={qa.question}
                    onChange={(e) => {
                      const updatedList = [...qaList];
                      updatedList[index].question = e.target.value;
                      setQaList(updatedList);
                    }}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label={STRINGS.answerLabel}
                    value={qa.answer}
                    onChange={(e) => {
                      const updatedList = [...qaList];
                      updatedList[index].answer = e.target.value;
                      setQaList(updatedList);
                    }}
                    multiline
                    minRows={3}
                    margin="normal"
                  />
                  {currentQA.pageNumber !== undefined && (
                    <TextField
                      fullWidth
                      label={STRINGS.pageNumber}
                      type="number"
                      value={qa.pageNumber}
                      onChange={(e) => {
                        const updatedList = [...qaList];
                        updatedList[index].pageNumber = e.target.value;
                        setQaList(updatedList);
                      }}
                      margin="normal"
                    />
                  )}
                  {qa.pageSection !== undefined && (
                    <TextField
                      fullWidth
                      label={STRINGS.sectionLabel}
                      value={qa.pageSection}
                      onChange={(e) => {
                        const updatedList = [...qaList];
                        updatedList[index].pageSection = e.target.value;
                        setQaList(updatedList);
                      }}
                      margin="normal"
                    />
                  )}
                  <TextField
                    fullWidth
                    label={STRINGS.referencesLabel}
                    value={newReferences[index] || ""}
                    onChange={(e) => {
                      setNewReferences({
                        ...newReferences,
                        [index]: e.target.value
                      });
                    }}
                    margin="normal"
                    InputProps={{
                      endAdornment: newReferences[index] && (
                        <InputAdornment
                          position="end"
                          style={{
                            backgroundColor: "#1976d2",
                            borderRadius: 4,
                            paddingHorizontal: 8
                          }}
                        >
                          <IconButton
                            onClick={() => handleAddReference(index)}
                            size="small"
                            sx={{
                              color: "white",
                              transition: "transform 0.2s ease-in-out",
                              "&:hover": { transform: "scale(1.15)" }
                            }}
                          >
                            <Add />
                            <Typography>{"Add"}</Typography>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  {qa.references.map((reference, refIndex) => (
                    <ReferencesCard
                      key={refIndex}
                      reference={reference}
                      STRINGS={STRINGS}
                    />
                  ))}
                  <TagInput
                    tagsArray={qa.tags}
                    onTagsChange={(newTags) => {
                      const updatedList = [...qaList];
                      updatedList[index].tags = newTags;
                      setQaList(updatedList);
                    }}
                    STRINGS={STRINGS}
                  />
                </Box>
                <Box display="flex" alignItems="center">
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

      {addNewQuestion && (
        <Box
          sx={{
            p: 4,
            boxShadow: 4,
            borderRadius: 2,
            overflowY: "auto"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
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

          <TextField
            fullWidth
            label={STRINGS.referencesLabel}
            value={newReferenceQuestion}
            onChange={(e) => setNewReferenceQuestion(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{
                    backgroundColor: "#1976d2",
                    borderRadius: 4,
                    paddingHorizontal: 8
                  }}
                >
                  <IconButton
                    onClick={handleAddReferenceQuestion}
                    size="small"
                    sx={{
                      color: "white",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": { transform: "scale(1.15)" }
                    }}
                  >
                    <Add />
                    <Typography>{STRINGS.add}</Typography>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {currentQA?.references?.map((reference, refIndex) => (
            <ReferencesCard
              key={refIndex}
              reference={reference}
              STRINGS={STRINGS}
            />
          ))}

          <TagInput
            tagsArray={currentQA.tags}
            onTagsChange={handleTagsChange}
            STRINGS={STRINGS}
          />
          <Box style={{ display: "flex", gap: 10 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleCloseModal}
            >
              {STRINGS.cancel}
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSaveQA}
            >
              {STRINGS.saveQA}
            </Button>
          </Box>
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 106, right: 16 }}
        onClick={handleAddQuestion}
      >
        <AddIcon />
      </Fab>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="warning">
          Please submit the current question before adding a new one.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QAGenerator;
