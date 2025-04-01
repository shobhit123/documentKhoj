import React from "react";
import { Button, Box, Typography } from "@mui/material";

interface ReferencesCardProps {
  index: number;
  reference: string;
}

const ReferencesCard: React.FC<ReferencesCardProps> = ({ index, reference }) => {
  const handleReferenceClick = (link: string) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      alert("Not a valid link: " + link);
    }
  };

  return (
    <Box key={index} mt={1} sx={{ margin: "4px" }}>
      <Button
        onClick={() => handleReferenceClick(reference)}
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography
          sx={{
            textDecoration: "underline",
            color: "blue",
            fontWeight: "bold",
            textTransform: "lowercase",
            fontSize: "14px",
          }}
        >
          {reference}
        </Typography>
      </Button>
    </Box>
  );
};

export default ReferencesCard;
