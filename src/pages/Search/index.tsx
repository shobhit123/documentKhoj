import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
  Fade,
  Grow,
  Card,
  Link,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import withLayout from "src/providers/hoc/withLayout";
import useChatHook from "../Chat/useChatHook";
import { handleSearch } from "../Chat/chatService";
import { useTheme } from "src/providers/theme/themeContext";
import { isValidURL } from "src/helper";
import Markdown from "react-markdown";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Button from "../../components/atoms/Button";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0c0c0c",
      paper: "#121212",
    },
    text: {
      primary: "#fff",
    },
  },
});

const CopilotUI = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const {
    searchQuery,
    sessionId,
    setChatMessages,
    setSearchResults,
    setSearchQuery,
    setLoading,
    setError,
    setIsChatOpen,
    loading,
    searchResults,
    STRINGS,
    showFullText,
    setShowFullText,
  } = useChatHook();

  const { theme } = useTheme();
  const verifiedStamp = require("../../assets/verified-icon.png");
  const styles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#121212",
    textColor: theme === "light" ? "#004a92" : "white",
    chatBackground: theme === "light" ? "#f5f5f5" : "#1e1e1e",
    messageBg: theme === "light" ? "#e0e0e0" : "#333333",
    userMessageBg: theme === "light" ? "#004a92" : "#00bcd4",
    userMessageColor: theme === "light" ? "white" : "black",
    chipBg: theme === "light" ? "rgba(0, 0, 0, 0.08)" : "white",
  };

  const quickSearchTags = [
    "Write a first draft",
    "Get advice",
    "Learn something new",
    "Create an image",
    "Make a plan",
    "Brainstorm",
    "Practise a language",
    "Take a quiz",
  ];

  const handleSearchEvent = () => {
    if (input.trim() === "") return;
    setSearchQuery(input)
    setMessages([...messages, input]);
    setInput("");
    setHasSearched(true);
    handleSearch(
        input,
      sessionId,
      setChatMessages,
      setSearchResults,
      setLoading,
      setError,
      setIsChatOpen
    );
  };
console.log({searchResults, searchQuery})
  const renderSearchResults = () => {
    const textResult = searchResults.find((result) => result.type === "text");
    const textPreview = textResult?.content?.slice(0, 400);

    return (
      <Box sx={{ textAlign: "left" }}>
        {/* Text Response */}
        {textResult && (
          <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" sx={{ color: "#004a92", mb: 2 }}>
              {textResult.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", fontSize: "14px" }}
            >
              <Markdown>
                {showFullText ? textResult.content : `${textPreview}`}
              </Markdown>
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Button on the left */}
              {textResult?.content?.length > 400 && (
                <Button
                  onClick={() => setShowFullText(!showFullText)}
                  label={showFullText ? "Show Less" : "Show More"}
                />
              )}

              {/* Verified box on the right */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // px: 1.5,
                  // py: 0.5,
                  // borderRadius: 2,
                  // boxShadow: 1,
                }}
              >
                <img
                  src={verifiedStamp}
                  alt="Verified Stamp"
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            </Box>

            {/** Show the disclaimer always irespective of the length of result */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#fff8e1",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                boxShadow: 1,
              }}
            >
              <WarningAmberIcon
                sx={{ color: "#ffa726", fontSize: 20, mr: 1 }}
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500, fontSize: 12 }}
              >
                <b>Disclaimer:</b> This is an AI-generated response and may
                contain inaccuracies. For complete and detailed information,
                refer to the sources below.
              </Typography>
            </Box>

            {/* Metadata */}
            {textResult.metadata && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ color: "#004a92", mb: 1 }}>
                  {STRINGS.references}
                </Typography>
                {Array.isArray(textResult.metadata) &&
                  textResult.metadata.map((meta, index) => (
                    <Card
                      key={index}
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: styles.backgroundColor,
                        color: styles.textColor,
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Page No:</strong> {meta.page_no}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Topic:</strong> {meta.topic || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Sub Topic:</strong> {meta.sub_topic || "N/A"}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Section:</strong> {meta.section}
                      </Typography>
                      {/* <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
                        <strong>Tags:</strong>{" "}
                        {meta?.tags?.map((tag: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={tag}
                            sx={{ mr: 1, background: styles.chipBg }}
                          />
                        ))}
                      </Typography> */}
                      {meta.deep_links && meta.deep_links.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            <strong>Links:</strong>
                          </Typography>
                          {meta.deep_links.map((link: string, idx: number) =>
                            isValidURL(link) ? (
                              <Link
                                key={idx}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ display: "block", mt: 1 }}
                              >
                                {link}
                              </Link>
                            ) : (
                              <Typography key={idx} variant="body2">
                                {link}
                              </Typography>
                            )
                          )}
                        </Box>
                      )}
                      {isValidURL(meta.doc_url) && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong> {STRINGS.source}: </strong>
                          <Link
                            href={meta.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "#004A92" }}
                          >
                            {meta.source}
                          </Link>
                        </Typography>
                      )}
                    </Card>
                  ))}
              </Box>
            )}
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
          p: 3,
          boxSizing: "border-box",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Chat container */}
        {hasSearched && (
          <Fade in={hasSearched}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  mb: 2,
                  mt: 2,
                }}
              >
                {messages.map((msg, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 1.5,
                      my: 1,
                      bgcolor: "#1e1e1e",
                      color: "white",
                      borderRadius: "10px",
                      maxWidth: "250px",
                      textAlign: "right",
                    }}
                  >
                    {msg}
                  </Paper>
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {/* Content wrapper */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: hasSearched ? "flex-end" : "center",
            transition: "all 0.6s ease",
          }}
        >
          {/* Title text before search */}
          {!hasSearched && (
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Hey, what’s on your mind today?
            </Typography>
          )}

          {/* Search bar */}
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchEvent();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "500px",
              p: "8px",
              borderRadius: "25px",
              backgroundColor: "background.paper",
              boxShadow: 2,
            }}
          >
            <IconButton sx={{ color: "white" }}>
              <AddIcon />
            </IconButton>
            <TextField
              variant="standard"
              placeholder="Message Copilot"
              InputProps={{ disableUnderline: true }}
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ ml: 1, color: "white" }}
            />
            <IconButton sx={{ color: "white" }} onClick={handleSearchEvent}>
              <SendIcon />
            </IconButton>
          </Paper>

          {/* Quick tags (only before first search) */}
          {!hasSearched && (
            <Grow in={!hasSearched}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 2,
                  justifyContent: "center",
                }}
              >
                {quickSearchTags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    sx={{
                      bgcolor: "#1e1e1e",
                      color: "white",
                      borderRadius: "15px",
                      px: 1.5,
                    }}
                  />
                ))}
              </Box>
            </Grow>
          )}

          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              {/* Typing Indicator (Pulsing Dots) */}
              <Box sx={{ display: "flex", gap: "6px" }}>
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: "6px",
                      height: "20px",
                      borderRadius: "4px",
                      background: "linear-gradient(180deg, #888, #444)",
                      animation: "wave 1.5s infinite ease-in-out",
                      animationDelay: `${i * 0.2}s`,
                      "@keyframes wave": {
                        "0%": { transform: "scaleY(1)" },
                        "50%": {
                          transform: "scaleY(1.8)",
                          background: "#888",
                        },
                        "100%": { transform: "scaleY(1)" },
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Animated "Generating response..." */}
              <Box
                sx={{
                  mt: 2,
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "gray",
                  letterSpacing: "0.5px",
                }}
              >
                Generating response...
              </Box>
            </Box>
          )}

          {/* Search Results */}
          {!loading && searchResults.length > 0 && renderSearchResults()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CopilotUI;
