// src/components/DoctorsSection.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import logo from "../assets/logo.png";
import doctorImage1 from "../assets/doctor1.jpg";
import doctorImage2 from "../assets/doctor1.jpg";
import doctorImage3 from "../assets/doctor1.jpg";

const doctors = [
  {
    name: "dr. Doddy Pratama, Sp.OG",
    specialty: "Spesialis Obstetri dan Ginekologi",
    description:
      "Dengan pengalaman lebih dari 15 tahun, Dr. Andi fokus pada persalinan aman dan perawatan kehamilan di RSIA Sayang Ibu.",
    image: doctorImage1,
    alt: "Dr. Andi Wijaya, Spesialis Kandungan di RSIA Sayang Ibu",
    icon: <PregnantWomanIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
    slug: "andi-wijaya",
  },
  {
    name: "Dr. Budi Santoso, Sp.A",
    specialty: "Spesialis Anak",
    description:
      "Ahli kesehatan anak, imunisasi, dan perawatan neonatal di rumah sakit bersalin RSIA Sayang Ibu Tanah Datar.",
    image: doctorImage2,
    alt: "Dokter Budi Santoso, Spesialis Anak di RSIA Sayang Ibu",
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
    slug: "budi-santoso",
  },
  {
    name: "Dr. Citra Dewi, Sp.OG",
    specialty: "Spesialis Kandungan",
    description:
      "Fokus pada konsultasi maternitas dan USG kehamilan untuk ibu di Sumatera Barat.",
    image: doctorImage3,
    alt: "Dokter Citra Dewi, Spesialis Kandungan di RSIA Sayang Ibu",
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
    slug: "citra-dewi",
  },
];

const DoctorsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
              // Trik spacing antar slide
              ".carousel .slider-wrapper": {
                padding: isMobile ? "0 16px" : "0 40px",
              },
              ".carousel .slide": {
                padding: "0 12px", // jarak antar card
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
                  key={index}
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
                    height: 420,
                    backgroundColor: "#FFFFFF",
                    mx: "auto", // biar card di tengah
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
                    src={doctor.image}
                    alt={doctor.alt}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  {/* Konten Card */}
                  <Box sx={{ p: 2.5, textAlign: "center" }}>
                    <Box sx={{ mb: 1 }}>{doctor.icon}</Box>
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
                      {doctor.specialty}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                    >
                      {doctor.description}
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
