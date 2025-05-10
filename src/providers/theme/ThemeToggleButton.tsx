import React from "react";
import { useTheme } from "./themeContext";
import { Switch, Paper, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeToggleButton: React.FC<{ variant?: "floating" | "menu", compact?: boolean }> = ({
  variant = "floating",
  compact = false
}) => {
  const { theme, toggleTheme } = useTheme();

  return variant === "floating" ? (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: compact ? "4px 8px" : "8px 12px",
        borderRadius: "20px",
        backgroundColor: theme === "dark" ? "#424242" : "#f5f5f5",
        width: "130px",
        margin: compact ? "8px auto" : "0 auto",
      }}
    >
      <Brightness7 style={{ color: theme === "light" ? "#f9a825" : "#bbb" }} />
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#f9a825",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#f9a825",
          },
          "& .MuiSwitch-track": {
            backgroundColor: theme === "dark" ? "#555" : "#ccc",
          },
        }}
      />
      <Brightness4 style={{ color: theme === "dark" ? "#f9a825" : "#bbb" }} />
    </Paper>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
      }}
    >
      <Brightness7 style={{ color: theme === "light" ? "#f9a825" : "#bbb" }} />
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#f9a825",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#f9a825",
          },
          "& .MuiSwitch-track": {
            backgroundColor: theme === "dark" ? "#555" : "#ccc",
          },
        }}
      />
      <Brightness4 style={{ color: theme === "dark" ? "#f9a825" : "#bbb" }} />
    </Box>
  );
};

export default ThemeToggleButton;
