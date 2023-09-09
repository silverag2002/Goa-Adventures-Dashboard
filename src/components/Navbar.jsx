import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import { BsGear, BsBell } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../base/hooks/useAuth";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        background: theme.palette.neutral.white,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "10px",
            }}
          >
            <MenuIcon
              sx={{
                fontSize: "25px",
                color: theme.palette.secondary.purple500,
              }}
            />
          </IconButton>
          {!isMobile && (
            <FlexBetween
              backgroundColor={theme.palette.neutral.grey100}
              borderRadius="10px"
              gap="3rem"
              p="0.3rem 1.5rem"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={`${isMobile ? "0.6rem" : "1.5rem"}`}>
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "10px",
            }}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlined
                sx={{
                  fontSize: "25px",
                  color: theme.palette.secondary.purple500,
                }}
              />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "10px",
            }}
          >
            <BsBell
              style={{
                fontSize: "25px",
                color: theme.palette.secondary.purple500,
              }}
            />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "0.5rem",
                backgroundColor: theme.palette.primary.light,
                borderRadius: "50px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px;",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <BsGear
                style={{
                  fontSize: "20px",
                  color: theme.palette.primary.blue500,
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
