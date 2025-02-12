// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Chip,
//   Grid,
//   IconButton,
//   TextField,
//   Typography
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { generateMockQA } from "../../helper";
// import TagInput from "./TagInput";

// const tagOptions = ["Important", "General", "Reference", "Critical"];

// const QAGenerator = () => {
//   const [qaList, setQaList] = useState(generateMockQA(3)); // Generate initial mock data
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [newQA, setNewQA] = useState({
//     question: "",
//     answer: "",
//     pageNumber: "",
//     pageSection: "",
//     references: "",
//     tags: []
//   });

//   const handleEditQA = (index) => {
//     setEditingIndex(index);
//     setEditData({ ...qaList[index] });
//   };

//   const handleSaveQA = () => {
//     const updatedList = [...qaList];
//     updatedList[editingIndex] = editData;
//     setQaList(updatedList);
//     setEditingIndex(null);
//   };

//   const handleAddQA = () => {
//     if (!newQA.question || !newQA.answer) {
//       alert("Question and Answer are required!");
//       return;
//     }

//     setQaList([...qaList, newQA]);
//     setNewQA({
//       question: "",
//       answer: "",
//       pageNumber: "",
//       pageSection: "",
//       references: "",
//       tags: []
//     });
//   };


//   return (
//     <Grid item xs={12} md={6}>
//       <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
//         <Typography variant="h5" gutterBottom>
//           Generated Q&A
//         </Typography>

//         {qaList?.length === 0 ? (
//           <Typography variant="body2" color="textSecondary">
//             No Q&A generated yet.
//           </Typography>
//         ) : (
//           qaList?.map((qa, index) => (
//             <Box
//               key={index}
//               sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1, mb: 2 }}
//             >
//               {editingIndex === index ? (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Question"
//                     value={editData.question}
//                     onChange={(e) =>
//                       setEditData({ ...editData, question: e.target.value })
//                     }
//                     margin="dense"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Answer"
//                     value={editData.answer}
//                     onChange={(e) =>
//                       setEditData({ ...editData, answer: e.target.value })
//                     }
//                     margin="dense"
//                     multiline
//                     minRows={3}
//                     maxRows={100}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Page Number"
//                     type="number"
//                     value={editData.pageNumber}
//                     onChange={(e) =>
//                       setEditData({ ...editData, pageNumber: e.target.value })
//                     }
//                     margin="dense"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Page Section"
//                     value={editData.pageSection}
//                     onChange={(e) =>
//                       setEditData({ ...editData, pageSection: e.target.value })
//                     }
//                     margin="dense"
//                   />
//                   <TextField
//                     fullWidth
//                     label="References"
//                     value={editData.references}
//                     onChange={(e) =>
//                       setEditData({ ...editData, references: e.target.value })
//                     }
//                     margin="dense"
//                   />

//                   <TagInput tagsArray={tagOptions} />

//                   <Button
//                     variant="contained"
//                     color="success"
//                     fullWidth
//                     onClick={handleSaveQA}
//                     sx={{ mt: 1 }}
//                   >
//                     Save
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box>
//                       <Typography variant="subtitle1">
//                         <strong>Q{index + 1}:</strong> {qa.question}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         <strong>Ans:</strong> {qa.answer}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>Page:</strong> {qa.pageNumber}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>Section:</strong> {qa.pageSection}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>References:</strong> {qa.references.join(", ")}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>Tags:</strong> {qa.tags.join(", ")}
//                       </Typography>
//                     </Box>
//                     <IconButton
//                       onClick={() => handleEditQA(index)}
//                       sx={{ mt: 1 }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           ))
//         )}

//         {/* Add New Q&A Section */}
//         <Typography variant="h6" sx={{ mt: 4 }}>
//           Add New Q&A
//         </Typography>
//         <TextField
//           fullWidth
//           label="New Question"
//           value={newQA.question}
//           onChange={(e) => setNewQA({ ...newQA, question: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="New Answer"
//           value={newQA.answer}
//           onChange={(e) => setNewQA({ ...newQA, answer: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Page Number"
//           type="number"
//           value={newQA.pageNumber}
//           onChange={(e) => setNewQA({ ...newQA, pageNumber: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Page Section"
//           value={newQA.pageSection}
//           onChange={(e) => setNewQA({ ...newQA, pageSection: e.target.value })}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="References"
//           value={newQA.references}
//           onChange={(e) =>
//             setNewQA({ ...newQA, references: e.target.value.split(",") })
//           }
//           margin="normal"
//         />

//         <TagInput />

//         <Button
//           variant="contained"
//           color="secondary"
//           fullWidth
//           onClick={handleAddQA}
//           sx={{ mt: 2 }}
//         >
//           Submit New Q&A
//         </Button>
//       </Box>
//     </Grid>
//   );
// };

// export default QAGenerator;
