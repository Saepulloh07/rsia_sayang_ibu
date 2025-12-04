// src/components/DoctorsSection.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import logo from "../assets/logo.png";
import { doctorService } from "../utils/api";

const DoctorsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getAll();

      if (response.data.success) {
        // Ambil 6 dokter pertama untuk ditampilkan di section
        const doctorsData = response.data.data.slice(0, 6);
        setDoctors(doctorsData);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Gagal memuat data dokter. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const getIconBySpecialty = (specialist) => {
    const specialistLower = specialist.toLowerCase();

    if (
      specialistLower.includes("kandungan") ||
      specialistLower.includes("obstetr") ||
      specialistLower.includes("og")
    ) {
      return <PregnantWomanIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
    } else if (
      specialistLower.includes("anak") ||
      specialistLower.includes("pediatr")
    ) {
      return <ChildFriendlyIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
    }
    return <MedicalServicesIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
  };

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: "#F8F9FA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#F8F9FA" }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#F8F9FA" }}>
      <Helmet>
        <meta
          name="keywords"
          content="dokter spesialis kandungan batusangkar, dokter anak rsia sayang ibu, tim medis maternitas tanah datar, rumah sakit bersalin sumatera barat, jadwal dokter persalinan"
        />
      </Helmet>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Bagian teks */}
          <Box
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 35%" },
              maxWidth: { xs: "100%", md: 400 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                color: "#4CAF50",
                fontWeight: 600,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Tim Dokter Kami
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#555",
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
            >
              Temui dokter ahli kami yang berdedikasi untuk kesehatan ibu dan
              anak. Perawatan terbaik untuk Anda dan keluarga.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/doctors"
              sx={{
                borderRadius: 8,
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Lihat Semua Dokter
            </Button>
          </Box>

          {/* Bagian carousel */}
          <Box
            sx={{
              flex: { xs: "0 0 100%", md: "0 0 65%" },
              width: "100%",
              ".carousel .slider-wrapper": {
                padding: isMobile ? "0 16px" : "0 40px",
              },
              ".carousel .slide": {
                padding: "0 12px",
              },
            }}
          >
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              transitionTime={600}
              showArrows={!isMobile}
              centerMode={!isMobile}
              centerSlidePercentage={isMobile ? 85 : 33}
              swipeable
              emulateTouch
            >
              {doctors.map((doctor, index) => (
                <Box
                  key={doctor.id || index}
                  component={Link}
                  to={`/doctors/${doctor.slug}`}
                  sx={{
                    position: "relative",
                    display: "block",
                    textDecoration: "none",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.03)" },
                    width: "100%",
                    maxWidth: 360,
                    height: 480,
                    backgroundColor: "#FFFFFF",
                    mx: "auto",
                  }}
                >
                  {/* Logo RSIA */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      zIndex: 1,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      p: 0.5,
                    }}
                  >
                    <img
                      src={logo}
                      alt="RSIA Logo"
                      style={{ width: 24, height: 24 }}
                    />
                  </Box>
                  {/* Foto Dokter */}
                  <img
                    src={
                      doctor.photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        doctor.name
                      )}&size=360&background=4CAF50&color=fff`
                    }
                    alt={`${doctor.name} - ${doctor.specialist}`}
                    style={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                  />
                  {/* Konten Card */}
                  <Box sx={{ p: 2.5, textAlign: "center" }}>
                    <Box sx={{ mb: 1 }}>
                      {getIconBySpecialty(doctor.specialist)}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#333",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                      }}
                    >
                      {doctor.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#4CAF50", mb: 1, fontSize: "0.9rem" }}
                    >
                      {doctor.specialist}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {doctor.bio ||
                        `${doctor.name} adalah dokter spesialis ${doctor.specialist} yang berpengalaman di RSIA Sayang Ibu.`}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DoctorsSection;
