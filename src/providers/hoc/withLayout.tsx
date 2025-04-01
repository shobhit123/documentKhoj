import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "../../components/organisms/Drawer";
import BackButton from "../../components/molecules/BackButton";

const withLayout = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const HOC: React.FC<P> = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
      setDrawerOpen(open);
    };

    return (
      <>
        <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Box sx={{ display: "flex", padding: "12px 0px 0px 12px" }}>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="large" color="primary" />
          </IconButton>
          <BackButton />
        </Box>
        <WrappedComponent {...props} />
      </>
    );
  };

  return HOC;
};

export default withLayout;
