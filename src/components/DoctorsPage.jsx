import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Pagination,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchIcon from "@mui/icons-material/Search";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import logo from "../assets/logo.png";
import { doctorService } from "../utils/api";

const DoctorsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [page, setPage] = useState(1);
  const doctorsPerPage = 6;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await doctorService.getAll();
        if (response.data.success) {
          setDoctors(response.data.data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Gagal memuat data dokter. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specialties = [...new Set(doctors.map((doc) => doc.specialist))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSpecialty = specialty ? doctor.specialist === specialty : true;
    return matchesSearch && matchesSpecialty;
  });

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * doctorsPerPage,
    page * doctorsPerPage
  );

  const getIconBySpecialty = (specialist) => {
    if (
      specialist.toLowerCase().includes("kandungan") ||
      specialist.toLowerCase().includes("obstetr")
    ) {
      return <PregnantWomanIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
    } else if (
      specialist.toLowerCase().includes("anak") ||
      specialist.toLowerCase().includes("pediatr")
    ) {
      return <ChildFriendlyIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
    }
    return <MedicalServicesIcon sx={{ fontSize: 40, color: "#E91E63" }} />;
  };

  const DoctorCard = ({ doctor }) => (
    <Box
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
        <img src={logo} alt="RSIA Logo" style={{ width: 24, height: 24 }} />
      </Box>

      <img
        src={doctor.photo || "https://via.placeholder.com/360x200?text=Doctor"}
        alt={doctor.name}
        style={{
          width: "100%",
          height: 270,
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />

      <Box sx={{ p: 2.5, textAlign: "center" }}>
        <Box sx={{ mb: 1 }}>{getIconBySpecialty(doctor.specialist)}</Box>

        <Typography
          variant="h6"
          sx={{ color: "#333", fontWeight: 600, fontSize: "1.2rem" }}
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
          {doctor.bio}
        </Typography>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#F8F9FA",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Helmet>
        <title>Temukan Dokter - RSIA Sayang Ibu Batusangkar</title>
      </Helmet>

      {/* ✅ BANNER HEADER */}
      <Box
        sx={{
          height: { xs: 300, md: 440 },
          background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mt: 10,
              mb: 1,
              fontSize: { xs: "1.8rem", md: "2.6rem" },
            }}
          >
            Cari Dokter Terbaik Untuk Keluarga Anda
          </Typography>

          <Typography
            sx={{
              opacity: 0.9,
              mb: 3,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
            }}
          >
            Spesialis kandungan, anak, dan layanan kesehatan terpercaya
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#2E7D32",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                backgroundColor: "#E8F5E9",
              },
            }}
            onClick={() => {
              document.getElementById("doctor-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Cari Dokter Sekarang
          </Button>
        </Container>
      </Box>

      {/* ✅ KONTEN UTAMA */}
      <Box id="doctor-section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              color: "#4CAF50",
              fontWeight: 600,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Temukan Dokter Kami
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* SEARCH & FILTER */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Cari Dokter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: { xs: "100%", md: 300 },
                backgroundColor: "#FFFFFF",
                borderRadius: 2,
              }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "#4CAF50", mr: 1 }} />,
              }}
            />

            <FormControl sx={{ width: { xs: "100%", md: 200 } }}>
              <InputLabel>Spesialis</InputLabel>
              <Select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                label="Spesialis"
              >
                <MenuItem value="">Semua Spesialis</MenuItem>
                {specialties.map((spec, index) => (
                  <MenuItem key={index} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* LIST DOKTER */}
          <Grid container spacing={3} justifyContent="center">
            {paginatedDoctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DoctorCard doctor={doctor} />
              </Grid>
            ))}
          </Grid>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default DoctorsPage;
