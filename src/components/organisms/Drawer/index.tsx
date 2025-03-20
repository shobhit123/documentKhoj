import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ThemeToggleButton from "src/providers/theme/ThemeToggleButton";
import LanguageToggleButton from "src/providers/language/LanguageToggleButton";
import { useLanguage } from "src/providers/language/LanguageContext";

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
  const { language, toggleLanguage} = useLanguage()

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

        {/* Settings Accordion */}
        <Accordion
          expanded={accordionExpanded}
          onChange={() => setAccordionExpanded(!accordionExpanded)}
          sx={{
            borderRadius: "8px",
            "&:before": { display: "none" },
            boxShadow: "none",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon>
              <SettingsIcon color="primary" />
            </ListItemIcon>
            <Typography variant="body1">Settings</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingLeft: "16px" }}>
            {/* Theme Menu */}
            <ListItem>
              <ListItemIcon>
                <PaletteIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Theme" />
            </ListItem>
            <ThemeToggleButton compact={true} />

            {/* Language Menu */}
            <ListItem component="div">
              <ListItemIcon>
                <LanguageIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Language" />
            </ListItem>
            <LanguageToggleButton
              toggleLanguage={toggleLanguage}
              selectedLanguage={language}
            />
          </AccordionDetails>
        </Accordion>
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
