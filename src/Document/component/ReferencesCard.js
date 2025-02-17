import React from "react";
import { Button, Box, Typography } from "@mui/material";

const ReferencesCard = ({ index, reference }) => {
  const handleReferenceClick = (link) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank");
    } else {
      alert("Not a valid link: " + link);
    }
  };

  return (
    <Box key={index} mt={1} style={{ margin: "4px" }}>
      <Button
        onClick={() => handleReferenceClick(reference)}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography
          style={{
            textDecoration: "underline",
            color: "blue",
            fontWeight: "bold",
            textTransform: "lowercase",
            fontSize: "14px"
          }}
        >
          {reference}
        </Typography>
      </Button>
    </Box>
  );
};

export default ReferencesCard;