import React from "react";
import Papa from "papaparse";
import { Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";

const CSVtoJSONConverter = ({ onQaListChange, STRINGS }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results?.data) {
            validateAndProcessData(results?.data);
          } else {
            alert(STRINGS.somethingWentWrong);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
  };

  const validateAndProcessData = (data) => {
    const requiredKeys = [
      "question",
      "answer",
      "pageNumber",
      "pageSection",
      "references",
      "tags"
    ];
    const missingKeysAlert = [];

    const processedData = data
      .filter((item) => item.question !== null)
      .map((item, index) => {
        const missingKeys = requiredKeys.filter((key) => !(key in item));

        if (missingKeys.length > 0) {
          missingKeysAlert.push(
            `Object at index ${index} is missing keys: ${missingKeys.join(
              ", "
            )}`
          );
        }

        return {
          question: item.question || "",
          answer: item.answer || "",
          pageNumber: item.pageNumber || 0,
          pageSection: item.pageSection || "",
          references: Array.isArray(item.references) ? item.references : [],
          tags: Array.isArray(item.tags) ? item.tags : []
        };
      });

    if (missingKeysAlert.length > 0) {
      alert(missingKeysAlert.join("\n"));
    } else {
      onQaListChange(processedData);
    }

    return processedData;
  };

  return (
    <Button
      variant="contained"
      component="label"
      startIcon={<FileDownload />}
      sx={{
        height: 46,
        padding: "10px 20px",
        backgroundColor: "#4CAF82FF",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#4CAF82FF"
        }
      }}
    >
      Import CSV/XLS
      <input type="file" accept=".xls,.csv" hidden onChange={handleFileUpload} />
    </Button>
  );
};

export default CSVtoJSONConverter;
