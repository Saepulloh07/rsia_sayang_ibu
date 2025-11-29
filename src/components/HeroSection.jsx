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
import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.jpg";
import heroImage3 from "../assets/hero3.jpeg";
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

  const images = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

      {/* HERO SECTION - Tidak Tertutup Navbar */}
      <Box
        sx={{
          pt: { xs: 10, sm: 12, md: 14 }, // Jarak aman dari navbar tetap (asumsi navbar height ~64-80px)
          pb: { xs: 8, md: 12 },
          minHeight: { xs: "85vh", md: "90vh" },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed", // Efek paralaks halus di desktop
          position: "relative",
          transition: "background-image 1.2s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            {/* Kiri: Teks Utama */}
            <Grid item xs={12} md={7} lg={7}>
              <Box sx={{ maxWidth: { xs: "100%", lg: 680 } }}>
                {/* Badge Akreditasi */}
                <Stack direction="row" flexWrap="wrap" gap={1.5} mb={2.5}>
                  <Chip
                    icon={<LocalHospitalIcon />}
                    label="Standar Kemenkes"
                    size="small"
                    sx={{ bgcolor: "rgba(255,255,255,0.95)", fontWeight: 600 }}
                  />
                  <Chip
                    label="Rumah Sakit Terpercaya"
                    size="small"
                    sx={{ bgcolor: "#FFD700", color: "#000", fontWeight: 600 }}
                  />
                </Stack>

                {/* Judul Utama - Ukuran dikecilkan & super responsif */}
                <Typography
                  variant="h1"
                  sx={{
                    color: "#FFF",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 2,
                    fontSize: {
                      xs: "clamp(2.2rem, 7vw, 3.2rem)",
                      sm: "clamp(2.8rem, 6.5vw, 3.8rem)",
                      md: "clamp(3.2rem, 6vw, 4.5rem)",
                      lg: "clamp(3.5rem, 5.5vw, 4.8rem)",
                    },
                  }}
                >
                  Kehamilan & Kelahiran
                  <Box component="span" sx={{ color: "#FFD700" }}>
                    {" "}
                    Aman dan Nyaman
                  </Box>
                </Typography>

                {/* Subjudul */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#EEE",
                    fontSize: { xs: "1rem", md: "1.15rem", lg: "1.2rem" },
                    lineHeight: 1.7,
                    mb: 4,
                    maxWidth: 620,
                  }}
                >
                  Dokter spesialis kandungan dan anak berpengalaman, fasilitas
                  modern, serta perawatan penuh kasih untuk ibu dan buah hati di
                  Batusangkar.
                </Typography>

                {/* Tombol CTA */}
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
                      fontSize: "1.05rem",
                      py: 1.8,
                      px: 4.5,
                      borderRadius: 3,
                      boxShadow: "0 6px 20px rgba(255,215,0,0.3)",
                      "&:hover": {
                        bgcolor: "#FFC107",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Buat Janji Temu
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="tel:075271234"
                    sx={{
                      borderColor: "#FFF",
                      color: "#FFF",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      py: 1.8,
                      px: 4.5,
                      borderRadius: 3,
                      borderWidth: 2,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderColor: "#FFF",
                      },
                    }}
                  >
                    Hubungi Kami
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* Kanan: Stats Card - Lebih kecil & rapi */}
            {!isMobile && (
              <Grid item md={5} lg={5}>
                <Grid container spacing={2}>
                  {stats.map((stat, i) => (
                    <Grid item xs={6} key={i}>
                      <Card
                        sx={{
                          bgcolor: "rgba(255,255,255,0.14)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 3,
                          textAlign: "center",
                          py: 2.5,
                          height: "100%",
                          transition: "0.3s",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.22)",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            sx={{
                              color: "#FFD700",
                              fontWeight: 800,
                              fontSize: { md: "1.9rem", lg: "2.1rem" },
                              lineHeight: 1,
                            }}
                          >
                            {stat.number}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#FFF",
                              fontWeight: 500,
                              fontSize: "0.95rem",
                            }}
                          >
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
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
