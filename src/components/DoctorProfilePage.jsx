import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Rating,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
        setError("Gagal memuat data dokter.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [slug]);

  const handleAppointmentClick = () => {
    !isLoggedIn ? setLoginOpen(true) : setAppointmentOpen(true);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#FAFAFA",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );

  if (error || !doctor)
    return (
      <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh", py: 10 }}>
        <Container maxWidth="md">
          <Alert
            severity="error"
            action={
              <Button onClick={() => navigate("/doctors")}>Kembali</Button>
            }
          >
            {error || "Dokter tidak ditemukan"}
          </Alert>
        </Container>
      </Box>
    );

  // URUTAN HARI INDONESIA
  const hariUrut = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  // PARSER YANG BENAR-BENAR SESUAI DATA KAMU
  const parseSchedule = (schedule) => {
    if (!schedule || !schedule.trim()) return [];

    const result = [];

    // Pisahkan jika ada multiple jadwal (jarang, tapi aman)
    const parts = schedule
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    parts.forEach((part) => {
      // Format 1: "Senin, Selasa, & Kamis : 08.00 - 11.00"
      // Format 2: "Senin-Jumat: 14:30-19:00"
      // Format 3: "Selasa dan Jumat : 14.30 - 16.00"
      const match =
        part.match(/^(.+?)\s*[:]\s*(.+)$/i) ||
        part.match(/^(.+?)\s*[:]\s*(.+)$/);
      if (!match) return;

      let daysStr = match[1].trim();
      let timeStr = match[2].trim().replace(/[-–]/g, "–");

      // Normalisasi pemisah hari
      daysStr = daysStr
        .replace(/&/g, ",")
        .replace(/ dan /gi, ",")
        .replace(/\s+/g, " ");

      let days = [];

      if (daysStr.includes("-") && !daysStr.includes(",")) {
        // Format: Senin-Jumat atau Sabtu-Senin
        const rangeMatch = daysStr.match(
          /^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)-?(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu)?$/i
        );
        if (rangeMatch) {
          let start = rangeMatch[1];
          let end = rangeMatch[2] || (start === "Sabtu" ? "Senin" : "Jumat"); // Sabtu-Senin = weekend + Senin

          // Handle wrap-around: Sabtu → Minggu → Senin
          if (start === "Sabtu" && end === "Senin") {
            days = ["Sabtu", "Minggu", "Senin"];
          } else {
            const startIdx = hariUrut.indexOf(start);
            const endIdx = hariUrut.indexOf(end);
            if (startIdx !== -1 && endIdx !== -1) {
              for (let i = startIdx; i <= endIdx; i++) {
                days.push(hariUrut[i]);
              }
            }
          }
        }
      } else {
        // Format daftar biasa: Senin, Selasa, Kamis
        days = daysStr
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
      }

      days.forEach((day) => {
        if (hariUrut.includes(day)) {
          result.push({ day, time: timeStr });
        }
      });
    });

    // Gabungkan sesi per hari
    const merged = {};
    result.forEach(({ day, time }) => {
      if (!merged[day]) merged[day] = new Set();
      merged[day].add(time);
    });

    // Urutkan sesuai hari dalam seminggu
    return hariUrut
      .map((day) => ({
        day,
        time: merged[day] ? Array.from(merged[day]).sort().join(" & ") : null,
      }))
      .filter((item) => item.time !== null);
  };

  const scheduleItems = parseSchedule(doctor.schedule);
  const todayName = new Date().toLocaleString("id-ID", { weekday: "long" });

  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>{doctor.name} - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content={`Profil dokter ${doctor.name}, ${doctor.specialist}`}
        />
      </Helmet>

      {/* Hero */}
      <Box
        sx={{
          bgcolor: "#4CAF50",
          pt: { xs: 12, md: 15 },
          pb: { xs: 6, md: 8 },
          color: "#FFF",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={
                    doctor.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      doctor.name
                    )}&background=4CAF50&color=fff&size=280`
                  }
                  alt={doctor.name}
                  sx={{
                    width: { xs: 200, md: 280 },
                    height: { xs: 200, md: 280 },
                    border: "8px solid #FFF",
                    boxShadow: 3,
                    mx: "auto",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    bgcolor: "#FFF",
                    borderRadius: "50%",
                    p: 1,
                    boxShadow: 3,
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {doctor.name}
              </Typography>
              <Chip
                label="Dokter Spesialis"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#FFF",
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
                {doctor.specialist}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating value={4.8} readOnly precision={0.1} />
                <Typography sx={{ ml: 1, fontWeight: 600 }}>
                  (128 ulasan)
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleAppointmentClick}
                sx={{
                  bgcolor: "#FFF",
                  color: "#4CAF50",
                  borderRadius: 30,
                  px: 5,
                  py: 1.5,
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#F5F5F5" },
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
          {/* Main */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 3, border: "1px solid #E0E0E0", mb: 4 }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#2E7D32", fontWeight: 700, mb: 2 }}
              >
                Tentang Dokter
              </Typography>
              <Typography sx={{ color: "#333", lineHeight: 1.8 }}>
                {doctor.bio ||
                  `${doctor.name} adalah dokter spesialis ${doctor.specialist} di RSIA Sayang Ibu Batusangkar.`}
              </Typography>
            </Paper>

            {/* Jadwal */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #E0E0E0",
                overflow: "hidden",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CalendarMonthIcon
                  sx={{ color: "#2E7D32", mr: 1.5, fontSize: 32 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "#2E7D32", fontWeight: 700 }}
                >
                  Jadwal Praktik
                </Typography>
              </Box>

              {scheduleItems.length > 0 ? (
                <TableContainer
                  sx={{ border: "1px solid #C8E6C9", borderRadius: 2 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#4CAF50" }}>
                        <TableCell sx={{ color: "#FFF", fontWeight: 600 }}>
                          Hari
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: 600 }}>
                          Jam Praktik
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ color: "#FFF", fontWeight: 600 }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduleItems.map((item, i) => {
                        const isToday = item.day === todayName;
                        return (
                          <TableRow
                            key={i}
                            sx={{
                              bgcolor: i % 2 === 0 ? "#F9FBF9" : "#FFF",
                              "&:hover": { bgcolor: "#E8F5E9" },
                            }}
                          >
                            <TableCell
                              sx={{ fontWeight: 600, color: "#2E7D32" }}
                            >
                              {item.day}
                              {isToday && (
                                <Chip
                                  label="Hari Ini"
                                  size="small"
                                  color="success"
                                  sx={{ ml: 1 }}
                                />
                              )}
                            </TableCell>
                            <TableCell>{item.time}</TableCell>
                            <TableCell align="center">
                              <Chip
                                label="Tersedia"
                                color="success"
                                variant="outlined"
                                size="small"
                                sx={{
                                  bgcolor: "#E8F5E9",
                                  color: "#2E7D32",
                                  borderColor: "#4CAF50",
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info">Jadwal praktik belum tersedia.</Alert>
              )}

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="success"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  onClick={handleAppointmentClick}
                  sx={{
                    borderRadius: 30,
                    px: 5,
                    py: 1.5,
                    fontWeight: 700,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: "rgba(76,175,80,0.08)",
                    },
                  }}
                >
                  Buat Janji Temu Sekarang
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar - Tetap Hijau Solid */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                bgcolor: "#4CAF50",
                color: "#FFF",
                boxShadow: "0 8px 32px rgba(76,175,80,0.3)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, textAlign: "center", mb: 3 }}
                >
                  Hubungi Kami
                </Typography>
                <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3 }} />
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PhoneIcon sx={{ mr: 2 }} />
                    <Typography>(0752) 71234</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon sx={{ mr: 2 }} />
                    <Typography>info@rsiasayangibu.com</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <LocationOnIcon sx={{ mr: 2, mt: 0.5 }} />
                    <Typography>Jl. Hamka No. 273, Batusangkar</Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleAppointmentClick}
                  sx={{
                    mt: 4,
                    bgcolor: "#FFF",
                    color: "#4CAF50",
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 30,
                    "&:hover": { bgcolor: "#F5F5F5" },
                  }}
                >
                  Daftar Online
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <AppointmentModal
        open={appointmentOpen && isLoggedIn}
        onClose={() => setAppointmentOpen(false)}
        doctor={doctor}
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
