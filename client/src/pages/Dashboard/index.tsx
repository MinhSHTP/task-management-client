import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarIcon from "@mui/icons-material/Person";

import { CustomAppBar, CustomDrawer, CustomDrawerHeader } from "./styled";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { APP_PATH, INITIAL_DASHBOARD_MENU_ITEMS, getLoggedUser } from "@utils";

export const Dashboard: React.FC = () => {
  const nav = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const loggedUser = getLoggedUser();

  useEffect(() => {
    setSelectedMenuItem(APP_PATH.DASHBOARD_ROUTE);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Clean up local storage
    localStorage.clear();

    // TODO: Clean up store

    nav(APP_PATH.LOGIN_ROUTE);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
              style={{ outline: "none" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </CustomAppBar>
        <CustomDrawer variant="permanent" open={open}>
          <CustomDrawerHeader>
            <Grid container alignContent="center" justifyContent="center">
              <AvatarIcon />
              {loggedUser.username}
            </Grid>
            <IconButton onClick={handleDrawerClose} style={{ outline: "none" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </CustomDrawerHeader>
          <Divider />
          <List>
            {INITIAL_DASHBOARD_MENU_ITEMS.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "block",
                  background:
                    selectedMenuItem === item.path ? "#1976d2" : "transparent",
                  color: selectedMenuItem === item.path ? "#fff" : "#000",
                  "&.MuiListItem-root:hover": {
                    background: "#1976d2",
                    color: "#fff",
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon && <item.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ListItem
            key="Logout"
            disablePadding
            sx={{ display: "block", position: "absolute", bottom: 0 }}
            onClick={handleLogout}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </CustomDrawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CustomDrawerHeader />
        </Box>
      </Box>
    </>
  );
};
