import React from "react";
import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const AccuracyDisclaimer: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        backgroundColor: "#fcfcfc",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        borderLeft: "6px solid",
        borderImage: "linear-gradient(to bottom, #2e7d32, #ffa726, #d32f2f) 1",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#333",
          fontWeight: 700,
          fontSize: 15,
          mb: 1.5,
        }}
      >
        🔍 Understanding Accuracy Levels of BOT Response:
      </Typography>

      {/* Green - High Accuracy */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: 22, mr: 1 }} />
        <Typography variant="body2" sx={{ fontSize: 13, color: "#444" }}>
          <b>Green Stamp:</b> <span style={{ color: "#2e7d32" }}>High accuracy (90%+).</span> Safe to use directly.
        </Typography>
      </Box>

      {/* Amber - Medium Accuracy */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <WarningAmberIcon sx={{ color: "#ffa726", fontSize: 22, mr: 1 }} />
        <Typography variant="body2" sx={{ fontSize: 13, color: "#444" }}>
          <b>Amber Stamp:</b> <span style={{ color: "#ffa726" }}>Moderate accuracy (50-80%).</span> Compare with official documentation before using.
        </Typography>
      </Box>

      {/* Red - Low Accuracy */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ErrorIcon sx={{ color: "#d32f2f", fontSize: 22, mr: 1 }} />
        <Typography variant="body2" sx={{ fontSize: 13, color: "#444" }}>
          <b>Red Stamp:</b> <span style={{ color: "#d32f2f" }}>Low accuracy (below 50%).</span> Strongly recommended to refer to official documentation.
        </Typography>
      </Box>
    </Box>
  );
};

export default AccuracyDisclaimer;
