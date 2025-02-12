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
import EditIcon from "@mui/icons-material/Edit";
import TagInput from "./TagInput";

// const generateMockQA = (count) => {
//   return Array.from({ length: count }, (_, index) => ({
//     question: `Sample Question ${index + 1}`,
//     answer: `Sample Answer ${index + 1}`,
//     pageNumber: index + 1,
//     pageSection: `Section ${index + 1}`,
//     references: [`Ref ${index + 1}`],
//     tags: [`Tag ${index + 1}`]
//   }));
// };

const QAGenerator = ({questionList}) => {
  // const [qaList, setQaList] = useState(generateMockQA(3));
  console.log('QUESTION LIST', questionList);
  const [qaList, setQaList] = useState(questionList);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentQA, setCurrentQA] = useState({
    question: "",
    answer: "",
    pageNumber: "",
    pageSection: "",
    references: "",
    tags: []
  });

  const handleOpenModal = (qa = null, index = null) => {
    setEditIndex(index);
    setCurrentQA(
      qa
        ? { ...qa }
        : {
            question: "",
            answer: "",
            pageNumber: "",
            pageSection: "",
            references: "",
            tags: []
          }
    );
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveQA = () => {
    if (!currentQA.question || !currentQA.answer) {
      alert("Question and Answer are required!");
      return;
    }

    const updatedList = [...qaList];
    if (editIndex !== null) {
      updatedList[editIndex] = currentQA; // Editing existing Q&A
    } else {
      updatedList.push(currentQA); // Adding new Q&A
    }

    setQaList(updatedList);
    handleCloseModal();
  };

  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h5" gutterBottom>
          Generated Q&A
        </Typography>

        {qaList.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No Q&A generated yet.
          </Typography>
        ) : (
          qaList.map((qa, index) => (
            <Box
              key={index}
              sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle1">
                    <strong>Q{index + 1}:</strong> {qa.question}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleOpenModal(qa, index)}
                  sx={{ mt: 1 }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleOpenModal()}
          sx={{ mt: 2 }}
        >
          Add New Q&A
        </Button>
      </Box>

      {/* Modal for Editing & Adding */}
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
            borderRadius: 2,
            width: 700,
            maxHeight: "90vh", // Set max height for scroll
            overflowY: "auto"
          }}
        >
          <Typography variant="h6">
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
            minRows={3}
            maxRows={100}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Page Number"
            type="number"
            value={currentQA.pageNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 1 && value <= 10) {
                setCurrentQA({ ...currentQA, pageNumber: value });
              }
            }}
            margin="normal"
            inputProps={{
              min: 1,
              max: 100
            }}
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
          <TextField
            fullWidth
            label="References"
            value={currentQA.references}
            onChange={(e) =>
              setCurrentQA({
                ...currentQA,
                references: e.target.value.split(",")
              })
            }
            margin="normal"
          />

          <TagInput tagsArray={currentQA.tags} />

          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSaveQA}
            sx={{ mt: 2 }}
          >
            {editIndex !== null ? "Save Changes" : "Add Q&A"}
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
    </Grid>
  );
};

export default QAGenerator;
