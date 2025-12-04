// src/components/Navbar.jsx
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
  Popper,
  Paper,
  ClickAwayListener,
  MenuItem,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import logo from "../assets/logo.png";
import { serviceService } from "../utils/api";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // State untuk layanan dari API
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { isLoggedIn } = useAuth();

  // Fetch layanan dari API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await serviceService.getAll();

        // Pastikan selalu array, meskipun response bentuknya macam-macam
        let data = [];
        if (response?.data) {
          if (Array.isArray(response.data)) {
            data = response.data;
          } else if (Array.isArray(response.data.data)) {
            data = response.data.data;
          } else if (Array.isArray(response.data.services)) {
            data = response.data.services;
          }
        }

        setServices(data);
      } catch (error) {
        console.error("Gagal mengambil daftar layanan:", error);
        setServices([]); // Tetap array kosong
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleAppointment = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  const openDropdown = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveDropdown(id);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
    setActiveDropdown(null);
  };

  // Daftar item layanan untuk dropdown (selalu array)
  const layananItems = services.map((service) => ({
    text: service.title || "Layanan Tanpa Nama",
    path: `/services/${service.slug}`,
  }));

  // Menu utama
  const menuItems = [
    { text: "Beranda", path: "/" },
    { text: "Temukan Dokter", path: "/doctors" },
    {
      text: "Perusahaan",
      id: "perusahaan",
      items: [
        { text: "Tentang rumah sakit", path: "/about" },
        { text: "Direksi", path: "/management" },
        { text: "Karir", path: "/careers" },
      ],
    },
    {
      text: "Layanan",
      id: "layanan",
      items: layananItems,
      loading: servicesLoading,
    },
    { text: "Informasi", path: "/articles" },
  ];

  // Drawer untuk mobile
  const drawer = (
    <Box
      sx={{
        p: 3,
        height: "100vh",
        bgcolor: "#fff",
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
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 50, height: 50, marginRight: 12 }}
            />
            <Typography variant="h5" sx={{ color: "#4CAF50", fontWeight: 700 }}>
              Rumah Sakit Sayang Ibu
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#4CAF50" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              {item.items ? (
                <>
                  <ListItem sx={{ py: 1.8, borderBottom: "1px solid #eee" }}>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "#333",
                      }}
                    />
                  </ListItem>
                  {item.items.length > 0 ? (
                    item.items.map((sub) => (
                      <ListItem
                        key={sub.text}
                        component={Link}
                        to={sub.path}
                        onClick={handleDrawerToggle}
                        sx={{ pl: 4, py: 1.2 }}
                      >
                        <ListItemText
                          primary={sub.text}
                          primaryTypographyProps={{
                            fontSize: "1rem",
                            color: "#555",
                          }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem sx={{ pl: 4, py: 1.2 }}>
                      <ListItemText
                        primary={
                          servicesLoading ? "Memuat..." : "Belum ada layanan"
                        }
                        primaryTypographyProps={{
                          color: "#999",
                          fontStyle: "italic",
                        }}
                      />
                    </ListItem>
                  )}
                </>
              ) : (
                <ListItem
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{ py: 1.8, borderBottom: "1px solid #eee" }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "1.15rem",
                      color: "#333",
                    }}
                  />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 1, pb: 3 }}>
        <Button
          onClick={handleAppointment}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 20,
            py: 2,
            fontSize: "1.15rem",
            fontWeight: 600,
            bgcolor: "#4CAF50",
            "&:hover": { bgcolor: "#43A047" },
          }}
        >
          Pendaftaran Online
        </Button>
      </Box>
    </Box>
  );

  const navbarBg = scrolled || isMobile ? "#FFFFFF" : "transparent";
  const textColor = scrolled && !isMobile ? "#2E7D32" : "#FFFFFF";
  const iconColor = scrolled || isMobile ? "#333" : "#FFFFFF";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: navbarBg,
          boxShadow:
            scrolled || isMobile ? "0 2px 15px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.35s ease",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 5 },
            minHeight: { xs: 70, md: 90 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: scrolled || isMobile ? "transparent" : "#FFFFFF",
              borderRadius: scrolled || isMobile ? 0 : 30,
              px: scrolled || isMobile ? 0 : 2.5,
              py: 1,
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: 42, height: 42, marginRight: 12 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: { xs: "1.2rem", md: "1.3rem" },
              }}
            >
              Rumah Sakit Sayang Ibu
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 5,
            }}
          >
            {menuItems.map((item) =>
              item.items ? (
                <Box key={item.id}>
                  <Button
                    onClick={(e) => openDropdown(e, item.id)}
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      textTransform: "none",
                      px: 2,
                      "&:hover": { color: "#4CAF50" },
                    }}
                  >
                    {item.text}
                    {item.loading && (
                      <CircularProgress
                        size={16}
                        sx={{ ml: 1, color: "#4CAF50" }}
                      />
                    )}
                  </Button>

                  <Popper
                    open={activeDropdown === item.id}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    sx={{ zIndex: 1400 }}
                  >
                    {() => (
                      <ClickAwayListener onClickAway={closeDropdown}>
                        <Paper
                          elevation={12}
                          sx={{
                            mt: 1,
                            minWidth: 260,
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          }}
                        >
                          {item.items.length > 0 ? (
                            item.items.map((sub) => (
                              <MenuItem
                                key={sub.text}
                                component={Link}
                                to={sub.path}
                                onClick={closeDropdown}
                                sx={{
                                  py: 1.8,
                                  px: 3,
                                  fontSize: "0.98rem",
                                  fontWeight: 500,
                                  "&:hover": {
                                    bgcolor: "#E8F5E9",
                                    color: "#2E7D32",
                                    pl: 4,
                                  },
                                }}
                              >
                                {sub.text}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {servicesLoading
                                  ? "Memuat layanan..."
                                  : "Belum ada layanan tersedia"}
                              </Typography>
                            </MenuItem>
                          )}
                        </Paper>
                      </ClickAwayListener>
                    )}
                  </Popper>
                </Box>
              ) : (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: textColor,
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    textTransform: "none",
                    px: 2,
                    "&:hover": { color: "#4CAF50" },
                  }}
                >
                  {item.text}
                </Button>
              )
            )}

            <Button
              onClick={handleAppointment}
              variant="contained"
              sx={{
                ml: 4,
                borderRadius: 30,
                px: 5,
                py: 1.5,
                fontSize: "1.05rem",
                fontWeight: 700,
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#43A047" },
                boxShadow: "0 6px 20px rgba(76,175,80,0.3)",
              }}
            >
              Pendaftaran
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: iconColor }}
          >
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: "100vw", boxSizing: "border-box" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Modals */}
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
    </>
  );
};

export default Navbar;
