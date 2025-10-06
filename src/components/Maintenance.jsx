import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import logo from '../assets/logo.png';

const Maintenance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F8F9FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={logo}
            alt="Logo RSIA Sayang Ibu"
            style={{
              width: isMobile ? 80 : 120,
              height: isMobile ? 80 : 120,
            }}
          />
        </Box>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          sx={{
            fontWeight: 700,
            color: '#4CAF50',
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          Mohon maaf Portal RSIA Sayang Ibu dalam Proses Maintenance
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            fontSize: isMobile ? '1rem' : '1.2rem',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          Kami sedang melakukan perawatan sistem untuk meningkatkan layanan.
        </Typography>
      </Container>
    </Box>
  );
};

export default Maintenance;