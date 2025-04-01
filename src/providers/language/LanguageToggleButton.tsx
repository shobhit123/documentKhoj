import { Box, Paper, Switch, Typography } from "@mui/material";
import React from "react";
import { getStrings } from "src/helper/strings";
import { useTheme } from "../theme/themeContext";
import { useLanguage } from "./languageContext";

type LanguageToggleButtonProps = {
  toggleLanguage: () => void;
  selectedLanguage?: "en" | "hi";
};

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({
  toggleLanguage,
  selectedLanguage = "en",
}) => {
  const { theme } = useTheme();
  const { isToggleOn} = useLanguage();
  const STRINGS = getStrings(selectedLanguage);
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        borderRadius: "20px",
        backgroundColor: theme === "dark" ? "#424242" : "#f5f5f5",
        width: "110px",
        margin: "8px auto",
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body1" fontWeight={100} color={theme === "dark" ? 'white' : 'black'} fontSize={14}>
          {STRINGS?.selectedLanguage}
        </Typography>
        <Switch checked={isToggleOn} onChange={toggleLanguage} />
      </Box>
    </Paper>
  );
};

export default LanguageToggleButton;
