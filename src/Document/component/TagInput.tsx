import React, { useState } from "react";
import { TextField, Chip, Box, InputAdornment } from "@mui/material";
import { Label } from "@mui/icons-material";

type TagInputProps = {
  tagsArray?: string[];
  onTagsChange: (tags: string[]) => void;
  STRINGS: Record<string, string>;
};

const TagInput: React.FC<TagInputProps> = ({ tagsArray = [], onTagsChange, STRINGS }) => {
  const [tags, setTags] = useState<string[]>(tagsArray);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();

      // Allow alphanumeric characters, spaces, and special characters ., _, -, &
      const regex = /^[a-zA-Z0-9 ._\-&]+$/;
      if (!regex.test(inputValue.trim())) {
        alert(STRINGS.special_characters_not_Allowed);
        return;
      }

      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      onTagsChange(newTags);
      setInputValue(""); // Clear input after adding tag
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Add Tags"
        variant="outlined"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.length <= 100) {
            setInputValue(e.target.value);
          }
        }}
        onKeyDown={handleAddTag}
        placeholder={STRINGS.tagPlaceHolder}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Label />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, mb: 2 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#5c6bc0",
              fontWeight: "bold",
              "& .MuiChip-deleteIcon": {
                color: "#5c6bc0",
              },
              "&:hover": {
                backgroundColor: "#e8eaf6",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagInput;