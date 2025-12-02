import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../assets/logo.png";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { doctorService } from "../utils/api";

const DoctorProfilePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await doctorService.getAll();

        if (response.data.success) {
          const foundDoctor = response.data.data.find(
            (doc) => doc.slug === slug
          );

          if (foundDoctor) {
            setDoctor(foundDoctor);
            setError(null);
          } else {
            setError("Dokter tidak ditemukan");
          }
        }
      } catch (err) {
        console.error("Error fetching doctor:", err);
        setError("Gagal memuat data dokter. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [slug]);

  const handleAppointmentClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  if (error || !doctor) {
    return (
      <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh", py: 10 }}>
        <Container maxWidth="md">
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/doctors")}
              >
                Kembali
              </Button>
            }
          >
            {error || "Dokter tidak ditemukan"}
          </Alert>
        </Container>
      </Box>
    );
  }

  // Parse schedule if it's a string (format: "Senin - Jumat, 08:00 - 16:00")
  const scheduleItems = doctor.schedule
    ? doctor.schedule.split(",").map((item) => {
        const parts = item.trim().split(" ");
        return {
          day: parts[0],
          time: parts.slice(1).join(" "),
        };
      })
    : [];

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>{doctor.name} - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content={`Profil ${doctor.name}, ${doctor.specialist} di RSIA Sayang Ibu Batusangkar.`}
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
          pt: { xs: 12, md: 15 },
          pb: { xs: 6, md: 8 },
          color: "#FFF",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <Avatar
                  src={
                    doctor.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      doctor.name
                    )}&size=280&background=4CAF50&color=fff`
                  }
                  alt={doctor.name}
                  sx={{
                    width: { xs: 200, md: 280 },
                    height: { xs: 200, md: 280 },
                    border: "8px solid #FFF",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    mx: "auto",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    backgroundColor: "#FFF",
                    borderRadius: "50%",
                    p: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="RSIA Logo"
                    sx={{ width: 40, height: 40 }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                {doctor.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 2,
                  opacity: 0.9,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                {doctor.specialist}
              </Typography>
              <Chip
                label="Dokter Spesialis"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#FFF",
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4.8} precision={0.1} readOnly />
                <Typography sx={{ ml: 1, fontWeight: 600 }}>
                  (Ulasan Pasien)
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleAppointmentClick}
                sx={{
                  backgroundColor: "#FFF",
                  color: "#4CAF50",
                  borderRadius: 30,
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                Buat Janji Temu
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Bio */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E0E0E0",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#2E7D32", fontWeight: 700, mb: 2 }}
              >
                Tentang Dokter
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#333", lineHeight: 1.8 }}
              >
                {doctor.bio ||
                  `${doctor.name} adalah dokter spesialis ${doctor.specialist} yang berpengalaman dan berdedikasi memberikan pelayanan kesehatan terbaik untuk pasien.`}
              </Typography>
            </Paper>

            {/* Schedule */}
            {scheduleItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: "1px solid #E0E0E0",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#2E7D32", fontWeight: 700, mb: 3 }}
                >
                  Jadwal Praktik
                </Typography>
                <List>
                  {scheduleItems.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemText
                        primary={item.day}
                        secondary={item.time}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: "1rem",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Contact Card */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
                color: "#FFF",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
                >
                  Hubungi Rumah Sakit
                </Typography>
                <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">(0752) 71234</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      info@rsiasayangibu.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <LocationOnIcon sx={{ mr: 1, fontSize: 20, mt: 0.5 }} />
                    <Typography variant="body2">
                      Jl. Hamka No. 273, Batusangkar
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAppointmentClick}
                  sx={{
                    backgroundColor: "#FFF",
                    color: "#4CAF50",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                >
                  Buat Janji Temu
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default DoctorProfilePage;
