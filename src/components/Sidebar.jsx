import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  PublicOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ScubaDivingOutlined,
  CategoryOutlined,
  ManageAccountsOutlined,
  VerifiedUserOutlined,
  ArticleOutlined,
  SummarizeOutlined,
  AddLocationAltOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import goaAdventureLogo from "assets/goaadventure_color_logo.svg";
import goaAdventureWhite from "assets/goaadventure_white_logo.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Bookings",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Instant Quotation",
    icon: <SummarizeOutlined />,
  },
  {
    text: "Products",
    icon: <ScubaDivingOutlined />,
  },
  {
    text: "Category",
    icon: <CategoryOutlined />,
  },
  {
    text: "Sub Category",
    icon: <CategoryOutlined />,
  },
  {
    text: "Location",
    icon: <AddLocationAltOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Manage Staff",
    icon: <ManageAccountsOutlined />,
  },
  {
    text: "Privacy Policy",
    icon: <VerifiedUserOutlined />,
  },
  {
    text: "Terms Conditions",
    icon: <ArticleOutlined />,
  },
  {
    text: "Business Analytics",
    icon: null,
  },
  {
    text: "Geography",
    icon: <ArticleOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.neutral.grey700,
              backgroundColor: theme.palette.background.default,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              padding: "5px",
            },
          }}
        >
          <Box width="100%">
            <Box m="0.5rem">
              <FlexBetween color={theme.palette.secondary.purple50}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  {/* <Typography variant="h5" fontWeight="semibold">
                    GOA ADVENTURE
                  </Typography> */}
                  {theme.palette.mode === "light" ? (
                    <img
                      src={goaAdventureLogo}
                      alt=""
                      loading="lazy"
                      width="200px"
                      height="auto"
                    />
                  ) : (
                    <img
                      src={goaAdventureWhite}
                      alt=""
                      loading="lazy"
                      width="200px"
                      height="auto"
                    />
                  )}
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List
              sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
            >
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase().split(" ").join("-");

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.main
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary.purple600
                            : theme.palette.neutral.grey700,
                        fontWeight: active === lcText ? "bold" : "500",
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.secondary.purple600
                              : theme.palette.neutral.grey700,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="1rem">
            <Divider variant="middle" />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary.purple50 }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary.purple200 }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary.purple500,
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
