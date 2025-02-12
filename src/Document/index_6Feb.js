// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   Typography,
//   Box,
//   CircularProgress,
//   Grid,
//   IconButton,
//   Chip
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import TagInput from "./component/TagInput";
// import UploadDocument from "./component/UploadDocument";

// const metadata = {
//   title: "QNA Creation Utility",
//   description:
//     "QNA Creation Utility to generate Question and Answer based on uploaded document",
//   version: "0.1.0"
// };

// const DocumentUpload = () => {
//   const [pageLink, setPageLink] = useState("");
//   const [docName, setDocName] = useState("");
//   const [category, setCategory] = useState("Category 1");
//   const [file, setFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [numQA, setNumQA] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [qaList, setQaList] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editQuestion, setEditQuestion] = useState("");
//   const [editAnswer, setEditAnswer] = useState("");
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [summary, setSummary] = useState("");
//   const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);


//   const tagOptions = ["General", "Technical", "FAQ", "Legal", "Financial"];

//   // Handle File Upload
//   const handleFileUpload = (event) => {
//     const uploadedFile = event.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//       setFilePreview(URL.createObjectURL(uploadedFile));
//     }
//   };

//   const handleUploadSuccess = (response) => {
//     setIsDocumentUploaded(true);
//   };

//   // Validate form before generating Q&A
//   const isFormValid = pageLink && docName;


//   // const generateMockQA = (count) => {
//   //   return Array.from({ length: count }, (_, index) => ({
//   //     question: `Sample Question ${index + 1}`,
//   //     answer: `Sample Answer ${index + 1}`,
//   //     pageNumber: index + 1,
//   //     pageSection: `Section ${index + 1}`,
//   //     references: [`Ref ${index + 1}`],
//   //     tags: [`Tag ${index + 1}`]
//   //   }));
//   // };
  

//   // Handle Generate Q&A
//   const handleGenerateQA = () => {
//     if (!isFormValid) {
//       alert("Please fill all the details before generating Q&A.");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       // setQaList(generateMockQA(parseInt(numQA, 10) || 0));
//       setLoading(false);
//     }, 2000);
//   };

//   // Handle Editing Q&A
//   const handleEditQA = (index) => {
//     setEditingIndex(index);
//     setEditQuestion(qaList[index].question);
//     setEditAnswer(qaList[index].answer);
//   };

//   // Save Edited Q&A
//   const handleSaveQA = () => {
//     const updatedQA = [...qaList];
//     updatedQA[editingIndex] = { question: editQuestion, answer: editAnswer };
//     setQaList(updatedQA);
//     setEditingIndex(null);
//   };

//   // Handle Adding New Q&A
//   const handleAddQA = () => {
//     if (!newQuestion || !newAnswer) {
//       alert("Both question and answer are required.");
//       return;
//     }
//     setQaList([
//       ...qaList,
//       { question: newQuestion, answer: newAnswer, tags: selectedTags }
//     ]);
//     setNewQuestion("");
//     setNewAnswer("");
//     setSelectedTags([]);
//     setSummary("");
//   };

//   // Handle Selecting Tags
//   const handleTagClick = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   return (
//     <Grid container spacing={4} sx={{ p: 4 }}>
//       <div style={{ width: "100%" }}>
//         <Typography variant="h4" fontWeight="bold">
//           {metadata.title}
//         </Typography>

//         <div
//           style={{
//             display: "inline-flex",
//             alignItems: "center",
//             paddingLeft: "16px",
//             gap: "8px"
//           }}
//         >
//           <Typography variant="subtitle1" color="textSecondary">
//             {metadata.description}
//           </Typography>
//           <Typography variant="caption" color="textSecondary">
//             (Version: {metadata.version})
//           </Typography>
//         </div>
//       </div>

//       {/* Left Side: Document Upload */}
//       <Grid item xs={12} md={6}>
//         <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
//           <Typography variant="h5" gutterBottom>
//             Document Details
//           </Typography>

//           <TextField
//             fullWidth
//             label="File Name"
//             value={pageLink}
//             onChange={(e) => setPageLink(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Summary of Document"
//             value={docName}
//             onChange={(e) => setDocName(e.target.value)}
//             margin="normal"
//             multiline
//             minRows={3} // Allows it to start with 3 rows and expand as needed
//             maxRows={100} // Optional: Limits max expansion
//           />

//           <UploadDocument onUploadSuccess={handleUploadSuccess}/>      

//           <TagInput />
//           <TextField
//             fullWidth
//             type="number"
//             label="No of Q&A"
//             value={numQA}
//             onChange={(e) => setNumQA(e.target.value)}
//             margin="normal"
//           />

//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading || !isDocumentUploaded}
//             onClick={handleGenerateQA}
//             // disabled={loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Generate Q&A"}
//           </Button>
//         </Box>
//       </Grid>

//       {/* Right Side: Q&A Display */}
//       {qaList?.length > 0 && (
//         <Grid item xs={12} md={6}>
//           <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
//             <Typography variant="h5" gutterBottom>
//               Generated Q&A
//             </Typography>

//             {qaList.length === 0 ? (
//               <Typography variant="body2" color="textSecondary">
//                 No Q&A generated yet.
//               </Typography>
//             ) : (
//               qaList.map((qa, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     p: 2,
//                     border: "1px solid #ddd",
//                     borderRadius: 1,
//                     mb: 2
//                   }}
//                 >
//                   {editingIndex === index ? (
//                     <>
//                       <TextField
//                         fullWidth
//                         label="Question"
//                         value={editQuestion}
//                         onChange={(e) => setEditQuestion(e.target.value)}
//                         margin="dense"
//                       />
//                       <TextField
//                         fullWidth
//                         label="Answer"
//                         value={editAnswer}
//                         onChange={(e) => setEditAnswer(e.target.value)}
//                         margin="dense"
//                       />
//                       <Button
//                         variant="contained"
//                         color="success"
//                         fullWidth
//                         onClick={handleSaveQA}
//                         sx={{ mt: 1 }}
//                       >
//                         Save
//                       </Button>
//                     </>
//                   ) : (
//                     <>
//                       <Box
//                         display="flex"
//                         justifyContent="space-between"
//                         alignItems="center"
//                       >
//                         <Box>
//                           <Typography variant="subtitle1">
//                             <strong>Q{index + 1}:</strong> {qa.question}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             <strong>Ans:</strong> {qa.answer}
//                           </Typography>
//                         </Box>
//                         <IconButton
//                           onClick={() => handleEditQA(index)}
//                           sx={{ mt: 1 }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Box>
//                     </>
//                   )}
//                 </Box>
//               ))
//             )}

//             {/* Add New Q&A Section */}
//             <Typography variant="h6" sx={{ mt: 4 }}>
//               Add New Q&A
//             </Typography>
//             <TextField
//               fullWidth
//               label="New Question"
//               value={newQuestion}
//               onChange={(e) => setNewQuestion(e.target.value)}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="New Answer"
//               value={newAnswer}
//               onChange={(e) => setNewAnswer(e.target.value)}
//               margin="normal"
//             />

//             <Typography variant="body1">Select Tags:</Typography>
//             {tagOptions.map((tag) => (
//               <Chip
//                 key={tag}
//                 label={tag}
//                 onClick={() => handleTagClick(tag)}
//                 color={selectedTags.includes(tag) ? "primary" : "default"}
//                 sx={{ m: 1 }}
//               />
//             ))}

//             <TextField
//               fullWidth
//               label="Summary"
//               value={summary}
//               onChange={(e) => setSummary(e.target.value)}
//               margin="normal"
//             />

//             <Button
//               variant="contained"
//               color="secondary"
//               fullWidth
//               onClick={handleAddQA}
//               sx={{ mt: 2 }}
//             >
//               Submit New Q&A
//             </Button>
//           </Box>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// export default DocumentUpload;
