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
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal"; // KEMBALI DI-IMPORT
import logo from "../assets/logo.png";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // DIBALIKKAN
  const [scrolled, setScrolled] = useState(false);

  // Dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { isLoggedIn } = useAuth();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Pendaftaran → kalau belum login, buka LoginModal dulu
  const handleAppointment = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  // Dropdown handlers
  const openDropdown = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveDropdown(id);
  };
  const closeDropdown = () => {
    setAnchorEl(null);
    setActiveDropdown(null);
  };

  // Menu items (Beranda ditambah, Hubungi Kami & Login button dihapus)
  const menuItems = [
    { text: "Beranda", path: "/" },
    { text: "Temukan Dokter", path: "/doctors" },
    {
      text: "Perusahaan",
      id: "perusahaan",
      items: [
        { text: "Tentang rumah sakit Sayang Ibu", path: "/about" },
        { text: "Manajemen Kami", path: "/management" },
        { text: "Karir", path: "/careers" },
      ],
    },
    {
      text: "Layanan",
      id: "layanan",
      items: [
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
  ];

  // Mobile drawer (sama seperti sebelumnya)
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
              style={{ width: 50, height: 50, mr: 1.5 }}
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
                  {item.items.map((sub) => (
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
                  ))}
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

  // Warna berdasarkan scroll
  const navbarBg = scrolled || isMobile ? "#FFFFFF" : "transparent";
  const logoBg = scrolled || isMobile ? "transparent" : "#FFFFFF";
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
              bgcolor: logoBg,
              borderRadius: scrolled || isMobile ? 0 : 30,
              px: scrolled || isMobile ? 0 : 2.5,
              py: 1,
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: 42, height: 42, mr: 1.5 }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: "#4CAF50",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", md: "1.6rem" },
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
                  </Button>

                  <Popper
                    open={activeDropdown === item.id}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                    disablePortal
                    modifiers={[
                      { name: "offset", options: { offset: [0, 8] } },
                    ]}
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
                            transform: "none !important",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                          }}
                        >
                          {item.items.map((sub) => (
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
                          ))}
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

            {/* Hanya tombol Pendaftaran */}
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

          {/* Mobile hamburger */}
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

      {/* Modals – KEDUANYA TETAP ADA */}
      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => {
          setLoginOpen(false);
          setAppointmentOpen(true); // Setelah login berhasil langsung buka pendaftaran
        }}
      />
    </>
  );
};

export default Navbar;
