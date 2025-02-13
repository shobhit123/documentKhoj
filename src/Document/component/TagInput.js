import React, { useState } from "react";
import { TextField, Chip, Box } from "@mui/material";

const TagInput = ({ tagsArray, onTagsChange }) => {
  const [tags, setTags] = useState(tagsArray || []);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (event) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue(""); // Clear input after adding tag
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    const updatedTags = tags?.filter((tag) => tag !== tagToDelete)
    setTags(updatedTags)
    onTagsChange(updatedTags);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Add Tags"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Type and press Enter to add a tag"
        margin="normal"
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        {tags?.map((tag, index) => (
          <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
        ))}
      </Box>
    </Box>
  );
};

export default TagInput;
