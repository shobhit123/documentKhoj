import { IconButton, Typography, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  text = "Back",
  bgColor = "#f0f0f0",
  textColor = "black"
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: bgColor,
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        width: "fit-content"
      }}
      onClick={() => navigate(-1)}
    >
      <IconButton sx={{ color: textColor, padding: 0, mr: 1 }}>
        <ArrowBack />
      </IconButton>
      <Typography sx={{ color: textColor, fontWeight: "bold" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default BackButton;
