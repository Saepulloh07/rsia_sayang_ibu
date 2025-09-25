// src/components/ServicesSection.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { styled } from "@mui/system";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Layanan Persalinan Aman",
    description:
      "Proses persalinan modern dengan pengawasan ketat dokter spesialis dan bidan profesional. Didukung ruang bersalin nyaman serta fasilitas medis terkini untuk keamanan ibu dan bayi.",
    image: "https://picsum.photos/600/400?random=1",
    alt: "Layanan persalinan aman di RSIA Sayang Ibu Batusangkar",
    category: "fasilitas",
    slug: "layanan-persalinan-aman",
    icon: <LocalHospitalIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
  },
  {
    title: "Perawatan Kehamilan Komprehensif",
    description:
      "Program antenatal care menyeluruh: mulai dari konsultasi rutin, pemeriksaan USG 4D, hingga edukasi gaya hidup sehat untuk ibu hamil dan perkembangan janin optimal.",
    image: "https://picsum.photos/600/400?random=2",
    alt: "Perawatan kehamilan profesional di RSIA Sayang Ibu",
    category: "spesialis",
    slug: "perawatan-kehamilan-komprehensif",
    icon: <PregnantWomanIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
  },
  {
    title: "Kesehatan dan Perawatan Anak",
    description:
      "Layanan pediatrik mulai dari imunisasi, pemantauan tumbuh kembang, hingga perawatan intensif neonatal. Ditangani oleh dokter anak berpengalaman dengan fasilitas modern.",
    image: "https://picsum.photos/600/400?random=3",
    alt: "Layanan kesehatan anak di RSIA Sayang Ibu Batusangkar",
    category: "spesialis",
    slug: "kesehatan-dan-perawatan-anak",
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: "#E91E63" }} />,
  },
];

const ServicesGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  margin: "0 auto",
  padding: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

const FilterButtons = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(5),
}));

const ServicesSection = () => {
  const [filter, setFilter] = useState("all");

  const filteredServices =
    filter === "all"
      ? services
      : services.filter((s) => s.category === filter);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: "linear-gradient(180deg,#F8F9FA 0%, #FFFFFF 100%)",
      }}
    >
      <Helmet>
        <meta
          name="keywords"
          content="layanan persalinan aman batusangkar, perawatan kehamilan komprehensif, kesehatan anak tanah datar, rsia sayang ibu, rumah sakit bersalin sumatera barat, maternitas profesional batusangkar"
        />
      </Helmet>
      <Container maxWidth="xl">
        {/* Judul */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 2, md: 3 },
            color: "#4CAF50",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Layanan Unggulan Kami
        </Typography>

        {/* Deskripsi filter */}
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "text.secondary", maxWidth: "700px", mx: "auto" }}
        >
          Pilih kategori layanan untuk melihat fasilitas unggulan, spesialis,
          atau semua layanan yang tersedia di RSIA Sayang Ibu.
        </Typography>

        {/* Filter Button */}
        <FilterButtons>
          <Button
            variant={filter === "fasilitas" ? "contained" : "outlined"}
            color="success"
            onClick={() => setFilter("fasilitas")}
            sx={{ borderRadius: 30, px: 3, py: 1 }}
          >
            Fasilitas Unggulan
          </Button>
          <Button
            variant={filter === "spesialis" ? "contained" : "outlined"}
            color="success"
            onClick={() => setFilter("spesialis")}
            sx={{ borderRadius: 30, px: 3, py: 1 }}
          >
            Spesialis
          </Button>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            color="success"
            onClick={() => setFilter("all")}
            sx={{ borderRadius: 30, px: 3, py: 1 }}
          >
            Lihat Semua
          </Button>
        </FilterButtons>

        {/* Grid Card */}
        <ServicesGrid>
          {filteredServices.map((service, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                borderRadius: 5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
                },
              }}
              role="region"
              aria-label={`Layanan ${service.title}`}
            >
              <CardMedia
                component="img"
                height="220"
                image={service.image}
                alt={service.alt}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, color: "#333", fontWeight: 600 }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  to={`/services/${service.slug}`}
                  sx={{
                    borderRadius: 30,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Selengkapnya
                </Button>
              </Box>
            </Card>
          ))}
        </ServicesGrid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
