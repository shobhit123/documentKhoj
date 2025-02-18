import {  FileUpload } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const convertToCSV = (objArray) => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  // Add headers
  const headers = Object.keys(array[0]);
  str += headers.join(",") + "\r\n";

  // Add rows
  array.forEach((item) => {
    const row = headers.map((header) => {
      return `"${item[header]}"`;
    });
    str += row.join(",") + "\r\n";
  });

  return str;
};

const JSONToCSVConverter = ({ jsonData, fileName }) => {
  const downloadCSV = () => {
    if (!jsonData || jsonData.length === 0) {
      alert("No data to export!");
      return;
    }

    const csvData = convertToCSV(jsonData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const finalFileName = `${timestamp}_${fileName || "Questions"}.csv`;

    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", finalFileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<FileUpload />}
      onClick={downloadCSV}
      sx={{
        height: 46,
        padding: "10px 20px",
        backgroundColor: "#AF4C7DFF",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#AF4C7DFF"
        }
      }}
    >
      Export CSV/XLS 
    </Button>
  );  
};

export default JSONToCSVConverter;
