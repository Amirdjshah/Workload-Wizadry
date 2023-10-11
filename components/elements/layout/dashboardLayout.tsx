"use client";

import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Drawer as MobileDrawer } from "@mui/material";
import styles from "./style.module.scss";
import { Drawer, DrawerHeader } from "./styled";
import { DrawerChildren } from "./drawerComponent";
import { Header } from "../header";
import { DRAWER_WIDTH } from "@config/sideNavMenuConfig";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}
export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <MobileDrawer
        container={container}
        anchor="left"
        variant="temporary"
        open={open}
        sx={{ display: { xs: "block", sm: "none" }, width: DRAWER_WIDTH }}
        onClose={handleDrawerClose}
      >
        <DrawerChildren open={open} handleDrawerClose={handleDrawerClose} />
      </MobileDrawer>
      <Drawer
        variant="permanent"
        open={open}
        className={styles.drawer}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <DrawerChildren open={open} handleDrawerClose={handleDrawerClose} />
      </Drawer>
      <Box
        style={{ background: "#fff" }}
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
