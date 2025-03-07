import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Link
} from "@mui/material";
import {
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Mic as MicIcon,
  Chat as ChatIcon,
  SmartToy as BotIcon,
  AccountCircle as UserIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";
import Markdown from "react-markdown";
import { getSearchResults } from "../../API/calls/getSearchResult";
import { generateSessionId, isValidURL } from "../../helper";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/BackButton";
import { getStrings } from "../common/strings";

const ChatBotPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [chatLoading, setChatLoading] = useState(false); // Loading state for chatbot
  const STRINGS = getStrings('en'); //ToDo: Will map this in future with actual locale
  const sessionId = useRef(generateSessionId()).current;
  // Handle search API call
  const handleSearch = async (query) => {
    setChatMessages([]); // clearing the chatbot results for fresh search results
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true); // Show loader
    setError(null); // Reset error state

    try {
      const response = await getSearchResults(query, "search", sessionId);
      if (response) {
        setSearchResults([
          {
            type: "text",
            title: "Search Result",
            content: response.content,
            metadata: response.metadata
              .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
              .slice(0, 5) // Show top 5 results
          }
        ]);
      } else {
        setError("No results found. Please try a different query.");
      }
    } catch (error) {
      setError("An error occurred while fetching results. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle chatbot API call
  const fetchBotResponse = async (message) => {
    try {
      const response = await getSearchResults(message, "chatbot", sessionId);
      return {
        botResponse: response.content,
        source: response?.metadata?.[0]?.doc_url ?? '-',
      }; // Return the bot's response
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };

  // Handle chat send
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    const userMessage = { text: chatInput, isUser: true };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput("");
    const { botResponse, source } = await fetchBotResponse(chatInput);
    setChatMessages((prev) => [...prev, { text: botResponse, isUser: false, source }]);
    setChatLoading(false);
  };

  // Reset search and chat
  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsChatOpen(false);
    setChatMessages([]);
    setError(null); // Clear any errors
  };

  // Render search results
  const renderSearchResults = () => {
    const textResult = searchResults.find((result) => result.type === "text");
    const textPreview = textResult?.content?.slice(0, 400);

    return (
      <Box>
        {/* Text Response */}
        {textResult && (
          <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
            <Typography variant="h6" sx={{ color: "#004a92", mb: 2 }}>
              {textResult.title}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              <Markdown>
                {showFullText ? textResult.content : `${textPreview}`}
              </Markdown>
            </Typography>
            {textResult?.content?.length > 400 && (
              <>
                <Button onClick={() => setShowFullText(!showFullText)}>
                  {showFullText ? "Show Less" : "Show More"}
                </Button>
              </>
            )}

            {/** Show the disclaimer always irespective of the length of result */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                ⚠️ <b>Disclaimer:</b> This is an AI-generated response, which
                might be incorrect or incomplete at times. For a detailed and
                complete response, please refer to the references below.
              </Typography>
            </Box>

            {/* Metadata */}
            {textResult.metadata && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ color: "#004a92", mb: 1 }}>
                  References
                </Typography>
                {textResult.metadata.map((meta, index) => (
                  <Card key={index} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="body2">
                      <strong>Page No:</strong> {meta.page_no}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Topic:</strong> {meta.topic || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sub Topic:</strong> {meta.sub_topic || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Section:</strong> {meta.section}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Tags:</strong>{" "}
                      {meta?.tags?.map((tag, idx) => (
                        <Chip key={idx} label={tag} sx={{ mr: 1 }} />
                      ))}
                    </Typography>
                    {meta.deep_links && meta.deep_links.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          <strong>Links:</strong>
                        </Typography>
                        {meta.deep_links.map((link, idx) =>
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
                      <Typography variant="body2">
                        {STRINGS.source}:{" "}
                        <strong>
                          {meta.doc_url
                            ?.replace("gs://ai-utilities-storage/chunk_job", "")
                            .replace(/\//g, " → ")}
                        </strong>
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
    <>
      <BackButton />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Left Side: Search Bar and Results */}

        <Box sx={{ flex: 1, p: 3, overflow: "auto", backgroundColor: "#fff" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: "#004a92" }}
          >
            <Toolbar>
              <TextField
                fullWidth
                placeholder="Search..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "#004a92", mr: 1 }} />
                  ),
                  endAdornment: (
                    <>
                      <IconButton onClick={() => handleSearch(searchQuery)}>
                        <MicIcon sx={{ color: "#fff" }} />
                      </IconButton>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#ff0000",
                          color: "#fff",
                          ml: 1
                        }}
                        onClick={() => handleSearch(searchQuery)}
                      >
                        Search
                      </Button>
                    </>
                  )
                }}
              />
            </Toolbar>
          </AppBar>
          <Box sx={{ mt: 3 }}>
            {/* Loading State */}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {/* Empty/Error/Initial State */}
            {!loading && searchResults.length === 0 && (
              <Typography
                variant="h6"
                sx={{ color: "#004a92", textAlign: "center", mt: 4 }}
              >
                {error ? (
                  error
                ) : (
                  <>
                    Enter your query above and click{" "}
                    <span style={{ fontWeight: "bold" }}>Search</span>
                  </>
                )}
              </Typography>
            )}

            {/* Search Results */}
            {!loading && searchResults.length > 0 && renderSearchResults()}

            {/* Reset Button */}
            {searchResults.length > 0 && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  position: "fixed",
                  bottom: 20,
                  left: 20
                }}
                startIcon={<RefreshIcon />}
                onClick={resetSearch}
              >
                Reset
              </Button>
            )}

            {/* Chat Button */}
            {searchResults.length > 0 && !isChatOpen && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#004a92",
                  color: "#fff",
                  position: "fixed",
                  bottom: 20,
                  right: 20
                }}
                startIcon={<ChatIcon />}
                onClick={() => setIsChatOpen(true)}
              >
                Chat with Bot
              </Button>
            )}
          </Box>
        </Box>

        {/* Right Side: Chat Window */}
        {isChatOpen && (
          <Box
            sx={{ flex: 1, p: 3, backgroundColor: "#f5f5f5", overflow: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
              }}
            >
              <Typography variant="h6" sx={{ color: "#004a92" }}>
                Chat with Bot
              </Typography>
              <IconButton onClick={() => setIsChatOpen(false)}>
                <CloseIcon sx={{ color: "#004a92" }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                height: "0.1vh",
                overflow: "auto",
                mb: 1,
                backgroundColor: "#004a92"
              }}
            ></Box>
            <Box sx={{ height: "70vh", overflow: "auto", mb: 2 }}>
              {chatMessages?.map((msg, index) => (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isUser ? "flex-end" : "flex-start",
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {!msg?.isUser && <BotIcon sx={{ mr: 1 }} />}
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor: msg.isUser ? "#004a92" : "#e0e0e0",
                          color: msg.isUser ? "white" : "black",
                          borderRadius: 2
                        }}
                      >
                        <Markdown>{msg?.text}</Markdown>
                      </Paper>
                      {msg?.isUser && <UserIcon sx={{ mr: 1 }} />}
                    </Box>
                  </Box>

                  {/** Block to show the chatbot source */}
                  {!msg?.isUser && (
                    <Box sx={{ pl: 2 }}>
                      {" "}
                      <Typography
                        variant="body3"
                        color="text.secondary"
                        component="span"
                      >
                        {STRINGS.source}:{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        component="span"
                        sx={{ ml: 1, textDecoration: msg?.source?.length > 1 ? 'underline' : 'none'  }}
                      >
                        {msg?.source}
                      </Typography>
                    </Box>
                  )}
                </>
              ))}
            </Box>
            {chatLoading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                <Typography>Bot is typing...</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                variant="outlined"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleChatSend}>
                      <SendIcon sx={{ color: "#004a92" }} />
                    </IconButton>
                  )
                }}
              />
              {/* <IconButton>
                <MicIcon sx={{ color: "#004a92" }} />
              </IconButton> */}
            </Box>
          </Box>
        )}

        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ChatBotPage;
