import React from "react";
import { Typography, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./backButton.css";
import { useTheme } from "src/providers/theme/themeContext";

const BackButton = ({ text = "Back" }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  console.log({theme})

  return (
    <Box className="back-button" onClick={() => navigate(-1)}>
      <Box className="back-icon-container">
        <ArrowBack className="back-icon" />
      </Box>
      <Typography className={theme === "light" ? "back-text" : "back-text-dark"}>
        {text}
      </Typography>
    </Box>
  );
};

export default BackButton;
