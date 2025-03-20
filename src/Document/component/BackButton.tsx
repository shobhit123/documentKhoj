import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  text = "Back",
  bgColor = "#f7f7f7",
  textColor = "#333",
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: bgColor,
        padding: "10px",
        borderRadius: "12px",
        cursor: "pointer",
        width: "fit-content",
        margin: "16px",
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          backgroundColor: "#e0e0e0",
          transform: "scale(1.05)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
        },
        "&:active": {
          transform: "scale(0.97)",
        },
      }}
      onClick={() => navigate(-1)}
    >
      <IconButton sx={{ color: textColor, padding: "6px" }}>
        <ArrowBack fontSize="medium" />
      </IconButton>
      <Typography sx={{ color: textColor, fontWeight: "600", fontSize: "16px" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default BackButton;
