// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthContext';
import AppointmentModal from './AppointmentModal';
import LoginModal from './LoginModal';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const menuItems = [
    { text: 'Beranda', path: '/' },
    { text: 'Layanan', path: '/services' },
    { text: 'Tim Dokter', path: '/doctors' },
    { text: 'Hubungi Kami', path: '/contact' },
  ];

  const drawerWidth = '100vw'; 

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 4, height: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Logo RSIA Sayang Ibu" 
              style={{ width: 60, height: 60, marginRight: 10 }} 
            />
            <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 700 }}>
              RSIA Sayang Ibu
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#4CAF50' }} aria-label="close drawer">
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          variant="outlined"
          placeholder="Cari Layanan..."
          fullWidth
          sx={{ mb: 4, borderRadius: 20 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#4CAF50' }} />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path} 
              onClick={handleDrawerToggle} 
              sx={{ 
                justifyContent: 'center', 
                py: 1.5,
                '&:hover': { backgroundColor: '#F5F5F5' },
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 600, color: '#333', fontSize: '1.1rem' }} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        onClick={handleAppointment}
        variant="contained"
        color="primary"
        sx={{ width: '100%', borderRadius: 20, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
      >
        Buat Janji Temu
      </Button>
    </Box>
  );

  const navbarBackground = scrolled || isMobile ? '#FFFFFF' : 'transparent';
  const logoBackground = scrolled || isMobile ? 'transparent' : '#FFFFFF';
  const menuIconColor = scrolled || isMobile ? '#333' : '#FFFFFF';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" // Changed to fixed for scroll following
        sx={{ 
          backgroundColor: navbarBackground, 
          color: '#333', 
          boxShadow: scrolled || isMobile ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: logoBackground, 
            borderRadius: scrolled || isMobile ? 0 : 20, 
            px: scrolled || isMobile ? 0 : 2,
            py: 1,
          }}>
            <img 
              src={logo} 
              alt="Logo RSIA Sayang Ibu" 
              style={{ width: 40, height: 40, marginRight: 10 }} 
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ 
                color: '#4CAF50', 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              RSIA Sayang Ibu
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{ 
                  color: '#18e23aff', 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  '&:hover': { 
                    color: '#4CAF50',
                    backgroundColor: '#F5F5F5',
                    borderRadius: 10,
                  } 
                }}
              >
                {item.text}
              </Button>
            ))}
            <TextField
              variant="outlined"
              placeholder="Cari Layanan..."
              size="small"
              sx={{ 
                width: 200, 
                backgroundColor: scrolled ? '#F5F5F5' : '#FFFFFF', 
                borderRadius: 20,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 20,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#4CAF50' }} />
                  </InputAdornment>
                ),
              }}
            />
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
                fontSize: '1rem',
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
            sx={{ display: { md: 'none' }, color: menuIconColor }}
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
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease-in-out',
          },
        }}
      >
        {drawer}
      </Drawer>
      <AppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Box>
  );
};

export default Navbar;