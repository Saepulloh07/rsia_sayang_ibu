import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PhoneIcon from "@mui/icons-material/Phone";

// Import gambar terpisah untuk desktop & mobile
import hero1ds from "../assets/hero2-ds.jpg";
import hero2ds from "../assets/hero2-ds.jpg";
import hero3ds from "../assets/hero2-ds.jpg";
import hero1mb from "../assets/hero1-mb.jpg";
import hero2mb from "../assets/hero1-mb.jpg";
import hero3mb from "../assets/hero1-mb.jpg";

import promoBanner from "../assets/promo1.png";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // < 900px = mobile
  const { isLoggedIn } = useAuth();

  const [currentImage, setCurrentImage] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Pilih array gambar berdasarkan device
  const desktopImages = [hero1ds, hero2ds, hero3ds];
  const mobileImages = [hero1mb, hero2mb, hero3mb];
  const images = isMobile ? mobileImages : desktopImages;

  // Reset index saat ganti device (opsional, agar tidak "loncat" gambar)
  useEffect(() => {
    setCurrentImage(0);
  }, [isMobile]);

  // Carousel otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]); // dependensi pada panjang array

  const handleAppointmentClick = () => {
    if (!isLoggedIn) setLoginOpen(true);
    else setAppointmentOpen(true);
  };

  const stats = [
    { number: "15+", label: "Tahun Pengalaman" },
    { number: "50.000+", label: "Kelahiran" },
    { number: "98%", label: "Kepuasan Pasien" },
    { number: "Standar", label: "Kemenkes" },
  ];

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
            url(${images[currentImage]})
          `,
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "center center" : "center top",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          position: "relative",
          transition: "background-image 1.2s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7} lg={7}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: { xs: "80vh", md: "65vh" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  py: { xs: 2, md: 2 },
                  maxWidth: { xs: "100%", lg: 680 },
                  mx: "auto",
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

                {/* Banner Promo */}
                {/* <Box
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 280, sm: 550, md: 300, lg: 360 },
                    mx: "left",
                    my: { xs: 2, md: 2 },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    transition: "all 0.4s ease",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <img
                    src={promoBanner}
                    alt="Promo RSIA Sayang Ibu 2025"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </Box> */}
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#EEE",
                      fontWeight: 500,
                      fontSize: { xs: "1.05rem", md: "1.25rem", lg: "1.35rem" },
                      lineHeight: 1.7,
                      mb: 2,
                      mt: 60,
                      maxWidth: 640,
                    }}
                  ></Typography>
                </Box>

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
                    Ikuti informasi tentang rumah sakit kami, atau informasi
                    lebih lanjut dapat menghubungi kami disini!.
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
            </Grid>
          </Grid>
        </Container>

        {/* Carousel Dots */}
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
          {images.map((_, i) => (
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
