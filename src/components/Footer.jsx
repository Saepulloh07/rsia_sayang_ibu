// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Button, IconButton, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#2C3E50', color: '#FFF', py: 6 }}>
      <Helmet>
        <meta name="keywords" content="rsia sayang ibu batusangkar, rumah sakit bersalin, kesehatan ibu dan anak, maternitas tanah datar, sumatera barat, kontak rsia" />
      </Helmet>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2 }}>
              RSIA Sayang Ibu
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Pusat kesehatan ibu dan anak terdepan di Batusangkar, menyediakan layanan persalinan, antenatal, dan pediatrik dengan standar tinggi.
            </Typography>
            <Typography variant="body2">
              Jalan Hamka No. 273 Batusangkar Kecamatan Sungai Tarab, Kabupaten Tanah Datar, Provinsi Sumatera Barat.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2 }}>
              Navigasi
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" underline="none" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>
              Beranda
            </Link>
            <Link component={RouterLink} to="/services" color="inherit" underline="none" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>
              Layanan
            </Link>
            <Link component={RouterLink} to="/doctors" color="inherit" underline="none" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>
              Tim Dokter
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" underline="none" display="block" sx={{ mb: 1, '&:hover': { color: '#4CAF50' } }}>
              Hubungi Kami
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2 }}>
              Kontak Kami
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Telepon: (0752) 71234</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Email: info@rsiasayangibu.com</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>WhatsApp: +62 812-3456-7890</Typography>
            <Button variant="contained" color="primary" component={RouterLink} to="/appointment" sx={{ borderRadius: 20, px: 4 }}>
              Buat Janji
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2 }}>
              Ikuti Kami
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton href="https://instagram.com" sx={{ color: '#FFF', '&:hover': { color: '#4CAF50' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://wa.me/6281234567890" sx={{ color: '#FFF', '&:hover': { color: '#4CAF50' } }}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton href="mailto:info@rsiasayangibu.com" sx={{ color: '#FFF', '&:hover': { color: '#4CAF50' } }}>
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="body2">
            &copy; 2025 RSIA Sayang Ibu Batusangkar. Hak Cipta Dilindungi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;