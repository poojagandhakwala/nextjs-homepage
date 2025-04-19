"use client";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const router = useRouter();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setMenuAnchor(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
    setMenuAnchor(null);
  };

  return (
    <div>
      <AppBar
        position="sticky"
        elevation={2}
        // color="rgb(7,34,137)"
        color="primary"
        // color="warning"
      >
        <Toolbar>
          {isMobile ? (
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", ml: 4 }}>
              <Typography
                component={"a"}
                onClick={() => {
                  router.push("/");
                }}
                className="!cursor-pointer"
              >
                Home
              </Typography>
            </Box>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Box
              // sx={{
              //   position: "relative",
              //   width: { sm: "200px", md: "400px", lg: "700px" },
              // }}

              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "700px",
                mx: "auto",
                px: 2,
              }}
              
            >
              <Searchbar />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          Home
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
