import React from "react";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Close as CloseIcon, Send as SendIcon } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useLanguage } from "src/providers/language/languageContext";
import { getStrings } from "src/helper/strings";

type ChatMessage = {
  text: string;
  isUser: boolean;
};

type ChatWithBotProps = {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (chatInput: string) => void;
  handleChatSend: () => Promise<void>;
};

const ChatWithBot: React.FC<ChatWithBotProps> = ({
  isChatOpen,
  setIsChatOpen,
  chatMessages,
  chatInput,
  setChatInput,
  handleChatSend,
}) => {
  const { language } = useLanguage();

  const STRINGS = getStrings(language);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: isChatOpen ? 320 : 50,
        height: isChatOpen ? 450 : 50,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {isChatOpen ? (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#004a92",
              color: "white",
              p: 1.5,
            }}
          >
            <Typography variant="body1">{STRINGS.chatWithBot}</Typography>
            <IconButton size="small" onClick={() => setIsChatOpen(false)}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>

          {/* Messages Section */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
            }}
          >
            {chatMessages?.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.isUser ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    backgroundColor: msg.isUser ? "#004a92" : "#e0e0e0",
                    color: msg.isUser ? "white" : "black",
                    borderRadius: "12px",
                    maxWidth: "75%",
                  }}
                >
                  {msg.text}
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Input Section */}
          <Box sx={{ display: "flex", p: 1, backgroundColor: "white" }}>
            <TextField
              fullWidth
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
              sx={{ borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleChatSend}>
                    <SendIcon sx={{ color: "#004a92" }} />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      ) : (
        <IconButton
          sx={{ width: "100%", height: "100%" }}
          onClick={() => setIsChatOpen(true)}
        >
          <ChatBubbleOutlineIcon sx={{ color: "#004a92" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default ChatWithBot;
