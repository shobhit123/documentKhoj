import React from "react";
import {
  Box,
  Typography,
  Chip,
  Rating,
  Button,
  CircularProgress,
  Snackbar,
  Pagination,
  TextField,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import { useRatings } from "./useRatings";
import "./ratingsBoxTable.css";
import { InfoOutlined } from "@mui/icons-material";
import Drawer from "../../components/organisms/Drawer";
import BackButton from "../../components/molecules/BackButton";
import MenuIcon from "@mui/icons-material/Menu";
import CustomTextarea from "../../components/molecules/TextArea";

type RatingsBoxTableProps = {
  fromExternal? : boolean
}

const RatingsBoxTable: React.FC<RatingsBoxTableProps> = ({fromExternal = false}) => {
  const {
    paginatedData,
    ratings,
    sourceGenuineness,
    overallResponse,
    loading,
    snackbarOpen,
    page,
    handleRatingChange,
    handleSourceGenuinenessChange,
    handleOverallResponseChange,
    handleSubmit,
    handlePageChange,
    closeSnackbar,
    totalPages,
    drawerOpen,
    toggleDrawer,
  } = useRatings();

  return (
    <>
      {loading && (
        <Box className="full-page-loader">
          <CircularProgress />
        </Box>
      )}

      {/** This was to restrict the drawer post api resp in upload page */}
      {!fromExternal && (
        <>
          <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <Box sx={{ display: "flex", padding: "12px 0px 0px 12px" }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon fontSize="large" color="primary" />
            </IconButton>
            <BackButton />
          </Box>

          <div className="table-disclaimer">
            <InfoOutlined className="notice-icon" />
            <span>
              Please review and update the ratings for better accuracy of
              results.
            </span>
          </div>
        </>
      )}

      {!loading && (
        <Box className="ratings-container">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <Box key={rowIndex} className="rating-box subtle-card">
                {Object.entries(row).map(([key, value]) => (
                  <Box key={key} className="field-container">
                    {Array.isArray(value) ? (
                      <TextField
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        variant="outlined"
                        fullWidth
                        disabled
                        className="info-field"
                        InputProps={{
                          startAdornment: (
                            <Box className="tags-container">
                              {value.length > 0 ? (
                                value.map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag}
                                    className="tag"
                                  />
                                ))
                              ) : (
                                <Typography
                                  variant="body2"
                                  className="no-tags-text"
                                >
                                  No tags available
                                </Typography>
                              )}
                            </Box>
                          ),
                        }}
                      />
                    ) : (
                      <TextField
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        variant="outlined"
                        fullWidth
                        disabled
                        className="info-field"
                      />
                    )}
                  </Box>
                ))}

                <Box className="rating-group">
                  <CustomTextarea />
                </Box>

                <Box className="rating-group">
                  <Typography variant="body1">Relevance:</Typography>
                  <Rating
                    value={ratings[row.question] ?? 0}
                    onChange={(_, newValue) =>
                      handleRatingChange(row.question, newValue)
                    }
                  />
                  <Box className="rating-progress-container">
                    <Box
                      className="rating-progress-bar"
                      sx={{ width: `${(ratings[row.question] ?? 0) * 20}%` }}
                    />
                  </Box>
                </Box>

                <Box className="rating-group">
                  <Typography variant="body1">Source Genuineness:</Typography>
                  <Rating
                    value={sourceGenuineness[row.question] ?? 0}
                    onChange={(_, newValue) =>
                      handleSourceGenuinenessChange(row.question, newValue)
                    }
                  />
                  <Box className="rating-progress-container">
                    <Box
                      className="rating-progress-bar"
                      sx={{
                        width: `${
                          (sourceGenuineness[row.question] ?? 0) * 20
                        }%`,
                      }}
                    />
                  </Box>
                </Box>

                <Box className="rating-group">
                  <Typography variant="body1">Overall Response:</Typography>
                  <Rating
                    value={overallResponse[row.question] ?? 0}
                    onChange={(_, newValue) =>
                      handleOverallResponseChange(row.question, newValue)
                    }
                  />
                  <Box className="rating-progress-container">
                    <Box
                      className="rating-progress-bar"
                      sx={{
                        width: `${(overallResponse[row.question] ?? 0) * 20}%`,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no-data">No data available</Typography>
          )}

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="pagination"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={closeSnackbar}
            message="Ratings submitted!"
          />
        </Box>
      )}
    </>
  );
};

export default RatingsBoxTable;
