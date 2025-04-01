import React from "react";
import TextField from "@mui/material/TextField";

export default function CustomTextarea() {
  return (
    <TextField
      label="Comments"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      sx={{ width: "100%", height: "150px" }}
    />
  );
}
