import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import logo from "../assets/logo.png";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [perusahaanAnchorEl, setPerusahaanAnchorEl] = useState(null);
  const [layananAnchorEl, setLayananAnchorEl] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAppointment = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  const handlePerusahaanMenuOpen = (event) => {
    setPerusahaanAnchorEl(event.currentTarget);
  };

  const handlePerusahaanMenuClose = () => {
    setPerusahaanAnchorEl(null);
  };

  const handleLayananMenuOpen = (event) => {
    setLayananAnchorEl(event.currentTarget);
  };

  const handleLayananMenuClose = () => {
    setLayananAnchorEl(null);
  };

  const menuItems = [
    { text: "Temukan Dokter", path: "/doctors" },
    {
      text: "Perusahaan",
      dropdown: [
        { text: "Tentang rumah sakit Sayang Ibu", path: "/about" },
        { text: "Manajemen Kami", path: "/management" },
        { text: "Karir", path: "/careers" },
      ],
    },
    {
      text: "Layanan",
      dropdown: [
        { text: "Kebidanan dan Kandungan", path: "/services/obstetrics" },
        { text: "Dokter Anak", path: "/services/pediatrics" },
        { text: "Dokter Penyakit Dalam", path: "/services/internal-medicine" },
        { text: "Dokter Bedah", path: "/services/surgery" },
        { text: "Pelayanan Baby Spa", path: "/services/baby-spa" },
        { text: "Pelayanan Gawat Darurat (IGD)", path: "/services/emergency" },
        { text: "Pelayanan Rawat Inap", path: "/services/inpatient" },
        { text: "Pelayanan Farmasi", path: "/services/pharmacy" },
        { text: "Pelayanan Laboratorium", path: "/services/laboratory" },
        { text: "Ambulance", path: "/services/ambulance" },
      ],
    },
    { text: "Hubungi Kami", path: "/contact" },
  ];

  const drawerWidth = "100vw";

  const drawer = (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo rumah sakit Sayang Ibu"
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Typography variant="h5" sx={{ color: "#4CAF50", fontWeight: 700 }}>
              Rumah Sakit Sayang Ibu
            </Typography>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: "#4CAF50" }}
            aria-label="close drawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.dropdown ? (
                <>
                  <ListItem
                    sx={{
                      py: 1.5,
                      borderBottom: "1px solid #E0E0E0",
                      "&:hover": { backgroundColor: "#F5F5F5" },
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        color: "#333",
                        fontSize: "1.1rem",
                      }}
                    />
                  </ListItem>
                  {item.dropdown.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      component={Link}
                      to={subItem.path}
                      onClick={handleDrawerToggle}
                      sx={{
                        pl: 4,
                        py: 1,
                        "&:hover": { backgroundColor: "#F5F5F5" },
                      }}
                    >
                      <ListItemText
                        primary={subItem.text}
                        primaryTypographyProps={{
                          fontWeight: 400,
                          color: "#333",
                          fontSize: "1rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </>
              ) : (
                <ListItem
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{
                    py: 1.5,
                    borderBottom: "1px solid #E0E0E0",
                    "&:hover": { backgroundColor: "#F5F5F5" },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "1.1rem",
                    }}
                  />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 1 }}>
        <Button
          onClick={() => {
            setLoginOpen(true);
            setMobileOpen(false);
          }}
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            borderRadius: 20,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#43A047" },
          }}
        >
          Login
        </Button>
        <Button
          onClick={handleAppointment}
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            borderRadius: 20,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#43A047" },
          }}
        >
          Buat Janji Temu
        </Button>
      </Box>
    </Box>
  );

  const navbarBackground = scrolled || isMobile ? "#FFFFFF" : "transparent";
  const logoBackground = scrolled || isMobile ? "transparent" : "#FFFFFF";
  const menuIconColor = scrolled || isMobile ? "#333" : "#FFFFFF";
  const menuTextColor = scrolled ? "#2E7D32" : "#FFFFFF";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: navbarBackground,
          color: "#333",
          boxShadow:
            scrolled || isMobile ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: logoBackground,
              borderRadius: scrolled || isMobile ? 0 : 20,
              px: scrolled || isMobile ? 0 : 2,
              py: 1,
            }}
          >
            <img
              src={logo}
              alt="Logo rumah sakit Sayang Ibu"
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Rumah Sakit Sayang Ibu
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.dropdown ? (
                  <>
                    <Button
                      onClick={
                        item.text === "Perusahaan"
                          ? handlePerusahaanMenuOpen
                          : handleLayananMenuOpen
                      }
                      sx={{
                        color: menuTextColor,
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        "&:hover": {
                          color: "#4CAF50",
                          backgroundColor: scrolled
                            ? "#F5F5F5"
                            : "rgba(255,255,255,0.1)",
                          borderRadius: 10,
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                    <Menu
                      anchorEl={
                        item.text === "Perusahaan"
                          ? perusahaanAnchorEl
                          : layananAnchorEl
                      }
                      open={Boolean(
                        item.text === "Perusahaan"
                          ? perusahaanAnchorEl
                          : layananAnchorEl
                      )}
                      onClose={
                        item.text === "Perusahaan"
                          ? handlePerusahaanMenuClose
                          : handleLayananMenuClose
                      }
                      PaperProps={{
                        sx: {
                          borderRadius: "4px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <MenuItem
                          key={subIndex}
                          component={Link}
                          to={subItem.path}
                          onClick={
                            item.text === "Perusahaan"
                              ? handlePerusahaanMenuClose
                              : handleLayananMenuClose
                          }
                          sx={{
                            color: "#333",
                            "&:hover": {
                              backgroundColor: "#E8F5E9",
                              color: "#4CAF50",
                            },
                          }}
                        >
                          {subItem.text}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: menuTextColor,
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      "&:hover": {
                        color: "#4CAF50",
                        backgroundColor: scrolled
                          ? "#F5F5F5"
                          : "rgba(255,255,255,0.1)",
                        borderRadius: 10,
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                )}
              </React.Fragment>
            ))}
            <Button
              onClick={() => setLoginOpen(true)}
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                borderRadius: 20,
                px: 4,
                py: 1,
                fontWeight: 600,
                fontSize: "1rem",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#43A047" },
              }}
            >
              Login
            </Button>
            <Button
              onClick={handleAppointment}
              variant="contained"
              color="primary"
              sx={{
                ml: 2,
                borderRadius: 20,
                px: 4,
                py: 1,
                fontWeight: 600,
                fontSize: "1rem",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#43A047" },
              }}
            >
              Buat Janji Temu
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: menuIconColor }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {drawer}
      </Drawer>
      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => {
          setLoginOpen(false);
          setAppointmentOpen(true);
        }}
      />
    </Box>
  );
};

export default Navbar;
