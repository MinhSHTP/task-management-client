import { useState } from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import AvatarIcon from "@mui/icons-material/Person";

import { DashboardMenuItem } from "@types";
import { APP_PATH, INITIAL_DASHBOARD_MENU_ITEMS, getLoggedUser } from "@utils";

import { CustomAppBar } from "../CustomAppBar";
import { CustomDrawer } from "../CustomDrawer";
import { CustomDrawerHeader } from "../CustomDrawerHeader";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

type CommonLayoutProps = {
  children: React.ReactNode;
};

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  const nav = useNavigate();
  const theme = useTheme();

  const loggedUser = getLoggedUser();

  const [open, setOpen] = useState(false);

  const selectedMenuItem = INITIAL_DASHBOARD_MENU_ITEMS.find((item) =>
    window.location.href.includes(item.path)
  ) as DashboardMenuItem;

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

  const handleMenuItemsClick = (menuItem: DashboardMenuItem) => {
    if (menuItem === selectedMenuItem) return;
    nav(menuItem.path);
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
              {selectedMenuItem?.title}
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
                    selectedMenuItem?.path === item.path
                      ? "#1976d2"
                      : "transparent",
                  color: selectedMenuItem?.path === item.path ? "#fff" : "#000",
                  "&.MuiListItem-root:hover": {
                    background: "#1976d2",
                    color: "#fff",
                  },
                }}
                onClick={() => handleMenuItemsClick(item)}
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
          {children}
        </Box>
      </Box>
    </>
  );
};
