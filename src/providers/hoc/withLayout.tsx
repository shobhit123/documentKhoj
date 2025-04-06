import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "../../components/organisms/Drawer";
import BackButton from "../../components/molecules/BackButton";

type WithLayoutProps = {
  hideBackButton?: boolean; // Marking it optional
};

const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithLayoutProps>
) => {
  const HOC: React.FC<P & WithLayoutProps> = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const khojLogo = require("../../assets/khoj-logo.png");
    const brandLogo = require("../../assets/brand-logo.png");

    const toggleDrawer = (open: boolean) => () => {
      setDrawerOpen(open);
    };

    return (
      <>
        <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 16px",
            height: 40,
            boxSizing: "border-box",
            margin: "16px 0px",
          }}
        >
          {/* LEFT SIDE: Hamburger + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                height: 40,
                width: 40,
                padding: 0,
                minWidth: 0,
                minHeight: 0,
              }}
            >
              <MenuIcon sx={{ fontSize: 35 }} color="primary" />
            </IconButton>

            <Box sx={{ height: 130 }}>
              <img src={khojLogo} alt="Left Logo" style={{ height: "100%" }} />
            </Box>
          </Box>

          {/* RIGHT SIDE: Logo */}
          <Box sx={{ height: 80 }}>
            <img src={brandLogo} alt="Right Logo" style={{ height: "100%" }} />
          </Box>
        </Box>
        <WrappedComponent {...props} />
      </>
    );
  };

  return HOC;
};

export default withLayout;
