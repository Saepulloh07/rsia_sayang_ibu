import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";

import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isLoggedIn } = useAuth();

  const [currentImage, setCurrentImage] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // State untuk hero images dari API
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hero images dari API
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/hero-images?activeOnly=true"
        );

        if (response.data.success && response.data.data.length > 0) {
          setHeroImages(response.data.data);
          setError(null);
        } else {
          // Fallback ke gambar default jika tidak ada data
          setHeroImages([]);
        }
      } catch (err) {
        console.error("Error fetching hero images:", err);
        setError(err.message);
        setHeroImages([]); // Fallback ke empty array
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  // Reset index saat ganti device atau data berubah
  useEffect(() => {
    setCurrentImage(0);
  }, [isMobile, heroImages.length]);

  // Carousel otomatis
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleAppointmentClick = () => {
    if (!isLoggedIn) setLoginOpen(true);
    else setAppointmentOpen(true);
  };

  // Get current image URL based on device
  const getCurrentImageUrl = () => {
    if (heroImages.length === 0) {
      // Fallback image jika tidak ada data
      return "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920";
    }

    const currentHeroImage = heroImages[currentImage];
    return isMobile ? currentHeroImage.mobileUrl : currentHeroImage.desktopUrl;
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          pt: { xs: 10, sm: 12, md: 14 },
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          RSIA Sayang Ibu Batusangkar - Rumah Sakit Ibu & Anak Terbaik
        </title>
        <meta
          name="description"
          content="Layanan bersalin premium, dokter kandungan & anak berpengalaman, terakreditasi kemenkes."
        />
      </Helmet>

      {/* HERO SECTION */}
      <Box
        sx={{
          pt: { xs: 10, sm: 12, md: 14 },
          pb: { xs: 8, md: 12 },
          minHeight: { xs: "85vh", md: "90vh" },
          backgroundImage: `
            linear-gradient(to right, 
              rgba(0, 0, 0, 0.65) 0%, 
              rgba(0, 0, 0, 0.45) 0%, 
              rgba(0, 0, 0, 0.15) 0%, 
              rgba(0, 0, 0, 0) 0%
            ),
            url(${getCurrentImageUrl()})
          `,
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "center center" : "center top",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          position: "relative",
          transition: "background-image 1.2s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              height: "100%",
              minHeight: { xs: "80vh", md: "65vh" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              py: { xs: 2, md: 2 },
              maxWidth: { xs: "100%", lg: 680 },
            }}
          >
            {/* Badge atas */}
            <Box sx={{ mt: { xs: -2, md: -6 } }}>
              <Stack direction="row" flexWrap="wrap" gap={1.5}>
                <Chip
                  icon={<LocalHospitalIcon />}
                  label="Standar Kemenkes"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.95)",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="Rumah Sakit Terpercaya"
                  size="small"
                  sx={{
                    bgcolor: "#FFD700",
                    color: "#000",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>

            {/* Spacer */}
            <Box sx={{ mt: 60 }} />

            {/* Teks + Tombol bawah */}
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: "#EEE",
                  fontWeight: 500,
                  fontSize: { xs: "1.05rem", md: "1.25rem", lg: "1.35rem" },
                  lineHeight: 1.7,
                  mb: 2,
                  maxWidth: 640,
                }}
              >
                Ikuti informasi tentang rumah sakit kami, atau informasi lebih
                lanjut dapat menghubungi kami disini!
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  onClick={handleAppointmentClick}
                  sx={{
                    bgcolor: "#FFD700",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    py: 2,
                    px: 5,
                    borderRadius: 3,
                    boxShadow: "0 8px 30px rgba(255,215,0,0.4)",
                    "&:hover": {
                      bgcolor: "#FFC107",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  Pendaftaran Online
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PhoneIcon />}
                  href="tel:075271234"
                  sx={{
                    borderColor: "#FFF",
                    color: "#FFF",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    py: 2,
                    px: 5,
                    borderRadius: 3,
                    borderWidth: 2,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                  }}
                >
                  Hubungi Kami
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>

        {/* Carousel Dots - hanya tampil jika ada lebih dari 1 gambar */}
        {heroImages.length > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1.5,
            }}
          >
            {heroImages.map((_, i) => (
              <Box
                key={i}
                onClick={() => setCurrentImage(i)}
                sx={{
                  width: currentImage === i ? 28 : 9,
                  height: 9,
                  borderRadius: "50%",
                  bgcolor:
                    currentImage === i ? "#FFD700" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </Box>
        )}

        {/* Error message (optional, untuk debugging) */}
        {error && (
          <Box
            sx={{
              position: "absolute",
              top: 100,
              right: 20,
              bgcolor: "error.main",
              color: "white",
              p: 2,
              borderRadius: 2,
              fontSize: "0.875rem",
            }}
          >
            Error loading images: {error}
          </Box>
        )}
      </Box>

      {/* Modals */}
      <AppointmentModal
        open={appointmentOpen && isLoggedIn}
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

export default HeroSection;
