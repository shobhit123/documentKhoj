import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const STRINGS = {
  referencesLabel: "Add Reference",
};

const ReferencesCard = ({ qa, index, qaList, setQaList }) => {
  const [newReference, setNewReference] = useState("");

  // Handle adding a new reference
  const handleAddReference = () => {
    if (newReference.trim() === "") return;

    const updatedList = [...qaList];
    updatedList[index].references = [...(qa.references || []), newReference];
    setQaList(updatedList);
    setNewReference("");
  };

  // Handle clicking a reference button
  const handleReferenceClick = (link) => {
    window.open(link, "_blank"); // Open link in a new tab
  };

  return (
    <Box>
      {/* TextField to add new references */}
      <TextField
        fullWidth
        label={STRINGS.referencesLabel}
        value={newReference}
        onChange={(e) => setNewReference(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleAddReference}>
        Add Reference
      </Button>

      {/* Display references as buttons */}
      {qa.references && qa.references.length > 0 && (
        <Box mt={2}>
          {qa.references.map((ref, refIndex) => (
            <Button
              key={refIndex}
              variant="outlined"
              onClick={() => handleReferenceClick(ref)}
              style={{ margin: "4px" }}
            >
              Reference {refIndex + 1}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReferencesCard;