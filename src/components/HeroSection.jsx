// src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Modal,
  IconButton,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import CloseIcon from '@mui/icons-material/Close';
import heroImage1 from '../assets/hero1.jpg';
import heroImage2 from '../assets/hero2.jpg';
import heroImage3 from '../assets/hero1.jpg';
import ambulanceLogo from '../assets/ambulance.png';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentImage, setCurrentImage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const images = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? '70vh' : '100vh',
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        transition: 'background-image 1s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6))'
            : 'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))',
        },
        mt: isMobile ? 8 : 0,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ zIndex: 1, textAlign: isMobile ? 'center' : 'left' }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          RSIA Sayang Ibu
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 400,
            mb: 4,
            maxWidth: { md: 600 },
            opacity: 0.9,
          }}
        >
          Keselamatan Ibu dan Anak adalah Tujuan Utama Kami
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/appointment"
          sx={{
            borderRadius: 20,
            px: 5,
            py: 1.5,
            fontSize: { xs: '0.9rem', md: '1rem' },
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            '&:hover': { boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)' },
          }}
        >
          Buat Janji Sekarang
        </Button>
      </Container>

      {/* Tombol IGD 24 Jam */}
      <Box
        component="button"
        onClick={handleOpenModal}
        sx={{
          position: 'absolute',
          bottom: isMobile ? 48 : 78,
          right: isMobile ? '50%' : 32,
          transform: isMobile ? 'translateX(50%)' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'transparent',
          border: '2px solid #fff',
          borderRadius: 2,
          p: 1,
          cursor: 'pointer',
          zIndex: 1,
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: '#e94848',
          },
        }}
        aria-label="Layanan IGD 24 Jam"
      >
        <img
          src={ambulanceLogo}
          alt="Ambulance Logo"
          style={{ width: 32, height: 32 }}
        />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#fff',
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          IGD 24 Jam
        </Typography>
      </Box>

      {/* Modal IGD */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="emergency-modal-title"
        aria-describedby="emergency-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            maxWidth: { xs: '90%', md: 500 },
            mx: 'auto',
            position: 'relative',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="Tutup Modal"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="emergency-modal-title"
            variant="h5"
            sx={{ fontWeight: 600, mb: 2, color: '#333' }}
          >
            Layanan IGD 24 Jam
          </Typography>
          <Typography
            id="emergency-modal-description"
            variant="body1"
            sx={{ mb: 3, color: '#555' }}
          >
            Hubungi kami kapan saja untuk keadaan darurat:
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: '#D32F2F', mb: 2 }}
          >
            Nomor IGD: +62 123 456 7890
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontWeight: 500, color: '#333' }}
          >
            Layanan yang Tersedia:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <Typography component="li" variant="body2" sx={{ color: '#555' }}>
              Layanan Gawat Darurat
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: '#555' }}>
              Konsultasi Maternitas
            </Typography>
            <Typography component="li" variant="body2" sx={{ color: '#555' }}>
              Perawatan Neonatal
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            sx={{
              borderRadius: 8,
              px: 4,
              py: 1,
              fontSize: '1rem',
              fontWeight: 600,
              width: { xs: '100%', md: 'auto' },
            }}
          >
            Tutup
          </Button>
        </Box>
      </Modal>

      <Helmet>
        <meta
          name="keywords"
          content="rsia sayang ibu batusangkar, rumah sakit bersalin terpercaya, kesehatan ibu dan anak sumatera barat, perawatan maternitas tanah datar"
        />
      </Helmet>
    </Box>
  );
};

export default HeroSection;
