import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowRight,
  ExpandMore as ExpandMoreIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ThemeToggleButton from "src/providers/theme/themeToggleButton";
import LanguageToggleButton from "src/providers/language/languageToggleButton";
import { useLanguage } from "src/providers/language/languageContext";

type DrawerProps = {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  //   isToggleOn: boolean;
};

const Drawer: React.FC<DrawerProps> = ({
  drawerOpen,
  toggleDrawer,
  //   isToggleOn,
}) => {
  const navigate = useNavigate();
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  return (
    <MUIDrawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          borderRadius: "8px",
          padding: "12px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <List>
        {/* Chat Menu */}
        <ListItem
          onClick={() => {
            navigate("/chat");
            toggleDrawer(false)();
          }}
          sx={{
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <ChatIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Ask a Question or Chat with Us" />
          <KeyboardArrowRight />
        </ListItem>

        {/** Evaluate Section */}
        <ListItem
          onClick={() => {
            navigate("/feedback");
            toggleDrawer(false)();
          }}
          sx={{
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <ThumbUpIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
          <KeyboardArrowRight />
        </ListItem>

        {/** Bulk Upload Section */}
        <ListItem
          onClick={() => {
            navigate("/bulkUpload");
            toggleDrawer(false)();
          }}
          sx={{
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <CloudUploadIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Bulk Upload" />
          <KeyboardArrowRight />
        </ListItem>

        {/* Settings Accordion */}
        <Accordion
          expanded={accordionExpanded}
          onChange={() => setAccordionExpanded(!accordionExpanded)}
          sx={{
            borderRadius: "6px",
            "&:before": { display: "none" },
            boxShadow: "none",
            border: "1px solid #E0E0E0", // Light border for structure
            backgroundColor: "#F8F9FA", // Subtle background
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#004C8F" }} />}
            sx={{
              padding: "8px 16px",
              minHeight: "48px",
              "& .MuiTypography-root": { fontSize: "14px", fontWeight: 500 },
            }}
          >
            <SettingsIcon
              sx={{ fontSize: 20, color: "#004C8F", marginRight: "8px" }}
            />
            <Typography variant="body2">Settings</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: "8px 16px" }}>
            {/* Theme Section */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <PaletteIcon
                  sx={{ fontSize: 18, color: "#004C8F", marginRight: "8px" }}
                />
                <Typography variant="body2">Theme</Typography>
              </Box>
              <ThemeToggleButton compact={true} />
            </Box>

            <Divider sx={{ marginY: "8px" }} />

            {/* Language Section */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <LanguageIcon
                  sx={{ fontSize: 18, color: "#004C8F", marginRight: "8px" }}
                />
                <Typography variant="body2">Language</Typography>
              </Box>
              <LanguageToggleButton
                toggleLanguage={toggleLanguage}
                selectedLanguage={language}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
