// src/components/AboutSection.jsx
import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

const AboutSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#F8F9FA' }}>
      <Helmet>
        <meta
          name="keywords"
          content="tentang rsia sayang ibu batusangkar, profil rumah sakit bersalin, visi misi kesehatan ibu anak tanah datar, fasilitas maternitas sumatera barat"
        />
      </Helmet>
      <Container maxWidth="md">
        {/* Judul Section */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            color: '#4CAF50',
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Tentang Kami
        </Typography>

        {/* Profil */}
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, color: '#333', fontWeight: 600 }}
        >
          Profil RSIA Sayang Ibu Batusangkar
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 5, color: '#555', lineHeight: 1.8 }}
        >
          RSIA Sayang Ibu Batusangkar adalah rumah sakit khusus ibu dan anak
          terkemuka di Tanah Datar, Sumatera Barat. Kami berkomitmen
          menyediakan layanan kesehatan berkualitas tinggi dengan fasilitas
          modern, tim medis profesional, serta pelayanan yang penuh kasih
          sayang untuk keselamatan ibu dan anak.
        </Typography>

        {/* Visi */}
        <Typography
          variant="h5"
          sx={{ mb: 2, color: '#333', fontWeight: 600 }}
        >
          Visi Kami
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: '#555', lineHeight: 1.8 }}
        >
          Menjadi pusat unggulan kesehatan ibu dan anak di Sumatera Barat.
        </Typography>

        {/* Misi */}
        <Typography
          variant="h5"
          sx={{ mb: 2, color: '#333', fontWeight: 600 }}
        >
          Misi Kami
        </Typography>
        <Box
          component="ul"
          sx={{
            mb: 4,
            pl: 3,
            color: '#555',
            lineHeight: 1.8,
          }}
        >
          <li>Memberikan pelayanan yang profesional dan bermutu tinggi.</li>
          <li>
            Membentuk SDM yang bertakwa, solid, kompeten, dan produktif.
          </li>
          <li>
            Menerapkan layanan efektif dan efisien dengan sistem IT
            terintegrasi.
          </li>
          <li>
            Memberikan pelayanan yang aman dan nyaman bagi perempuan dan anak.
          </li>
          <li>
            Menerapkan budaya Islami dalam penampilan dan pelayanan.
          </li>
        </Box>

        {/* Motto */}
        <Typography
          variant="h5"
          sx={{ mb: 2, color: '#333', fontWeight: 600 }}
        >
          Motto Kami
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 5,
            color: '#555',
            lineHeight: 1.8,
            fontStyle: 'italic',
          }}
        >
          “Keselamatan Ibu dan Anak adalah Tujuan Utama Kami.”
        </Typography>

        {/* Tombol di tengah */}
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            href="/contact"
            sx={{
              borderRadius: 20,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            Hubungi Kami
          </Button>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
