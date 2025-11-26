import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
} from "@mui/material";
import { Helmet } from "react-helmet";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import logo from "../assets/logo.png";
import doctor1 from "../assets/doctor1.jpg";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

const DoctorProfilePage = () => {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Data dokter (ini bisa diganti dengan fetch dari API)
  const doctorsData = {
    "andi-wijaya": {
      name: "Dr. Andi Wijaya, Sp.OG",
      specialty: "Obstetri dan Ginekologi",
      subSpecialty: "Fetomaternal",
      image: doctor1,
      rating: 4.8,
      totalReviews: 156,
      experience: "15+ tahun",
      patients: "2000+",
      education: [
        "S1 Kedokteran - Universitas Indonesia (2005)",
        "Spesialis Obstetri dan Ginekologi - Universitas Padjadjaran (2010)",
        "Fellowship Fetomaternal - RSCM Jakarta (2012)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Obstetri dan Ginekologi",
        "Advanced Life Support in Obstetrics (ALSO)",
        "Ultrasonografi dalam Obstetri",
        "Laparoskopi Ginekologi",
      ],
      expertise: [
        "Persalinan Normal dan Caesar",
        "Kehamilan Risiko Tinggi",
        "USG 4D",
        "Program Kehamilan",
        "Operasi Ginekologi",
        "Kontrasepsi dan KB",
        "Gangguan Menstruasi",
        "Endometriosis",
      ],
      languages: ["Indonesia", "Inggris", "Minang"],
      schedule: [
        {
          day: "Senin",
          time: "08.00 - 12.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Selasa",
          time: "14.00 - 18.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Rabu",
          time: "08.00 - 12.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Kamis",
          time: "14.00 - 18.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Jumat",
          time: "08.00 - 12.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Sabtu",
          time: "08.00 - 14.00",
          location: "Poliklinik Kandungan",
        },
      ],
      bio: "Dr. Andi Wijaya adalah dokter spesialis kebidanan dan kandungan dengan pengalaman lebih dari 15 tahun. Beliau memiliki keahlian khusus dalam menangani kehamilan risiko tinggi dan telah membantu ribuan ibu melahirkan dengan selamat. Dr. Andi dikenal dengan pendekatan yang ramah, komunikatif, dan selalu mengutamakan keselamatan ibu dan bayi.",
      awards: [
        "Best Obstetrician Award - POGI Regional Sumbar (2020)",
        "Excellence in Maternal Care - RSIA Sayang Ibu (2019)",
        "Top Rated Doctor - Patient Review (2018-2023)",
      ],
    },
    "budi-santoso": {
      name: "Dr. Budi Santoso, Sp.A",
      specialty: "Anak",
      subSpecialty: "Tumbuh Kembang",
      image: doctor1,
      rating: 4.9,
      totalReviews: 203,
      experience: "12+ tahun",
      patients: "3000+",
      education: [
        "S1 Kedokteran - Universitas Andalas (2008)",
        "Spesialis Anak - Universitas Indonesia (2013)",
        "Fellowship Tumbuh Kembang Anak - RSCM Jakarta (2015)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Anak",
        "Pediatric Advanced Life Support (PALS)",
        "Neonatal Resuscitation Program (NRP)",
        "Konselor Laktasi",
      ],
      expertise: [
        "Tumbuh Kembang Anak",
        "Imunisasi",
        "Nutrisi Anak",
        "Penyakit Infeksi Anak",
        "Alergi Anak",
        "Gangguan Pencernaan",
        "Perawatan Bayi Prematur",
        "Konseling ASI",
      ],
      languages: ["Indonesia", "Inggris", "Minang"],
      schedule: [
        { day: "Senin", time: "09.00 - 13.00", location: "Poliklinik Anak" },
        { day: "Selasa", time: "09.00 - 13.00", location: "Poliklinik Anak" },
        { day: "Rabu", time: "15.00 - 19.00", location: "Poliklinik Anak" },
        { day: "Kamis", time: "09.00 - 13.00", location: "Poliklinik Anak" },
        { day: "Jumat", time: "09.00 - 13.00", location: "Poliklinik Anak" },
        { day: "Sabtu", time: "09.00 - 15.00", location: "Poliklinik Anak" },
      ],
      bio: "Dr. Budi Santoso adalah dokter spesialis anak yang berpengalaman dalam menangani berbagai kondisi kesehatan anak. Dengan pendekatan yang lembut dan penuh perhatian, Dr. Budi sangat disukai oleh anak-anak dan orang tua. Beliau memiliki keahlian khusus dalam bidang tumbuh kembang anak dan konseling ASI.",
      awards: [
        "Pediatrician of the Year - IDAI Sumbar (2021)",
        "Child Healthcare Excellence Award (2020)",
        "Best Patient Communication - RSIA Awards (2019)",
      ],
    },
    "citra-dewi": {
      name: "Dr. Citra Dewi, Sp.OG",
      specialty: "Obstetri dan Ginekologi",
      subSpecialty: "Fertilitas dan Reproduksi",
      image: doctor1,
      rating: 4.7,
      totalReviews: 128,
      experience: "10+ tahun",
      patients: "1500+",
      education: [
        "S1 Kedokteran - Universitas Padjadjaran (2010)",
        "Spesialis Obstetri dan Ginekologi - Universitas Indonesia (2015)",
        "Fellowship Reproduksi - RSIA Bunda Jakarta (2017)",
      ],
      certifications: [
        "Sertifikat Kompetensi Dokter Spesialis Obstetri dan Ginekologi",
        "Reproductive Medicine Specialist",
        "USG Ginekologi",
        "Inseminasi Buatan",
      ],
      expertise: [
        "Program Kehamilan",
        "Infertilitas",
        "USG 4D",
        "Konseling Pra-Nikah",
        "Gangguan Hormon",
        "PCOS",
        "Endometriosis",
        "Kontrasepsi",
      ],
      languages: ["Indonesia", "Inggris"],
      schedule: [
        {
          day: "Senin",
          time: "14.00 - 18.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Rabu",
          time: "14.00 - 18.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Kamis",
          time: "09.00 - 13.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Jumat",
          time: "14.00 - 18.00",
          location: "Poliklinik Kandungan",
        },
        {
          day: "Sabtu",
          time: "10.00 - 14.00",
          location: "Poliklinik Kandungan",
        },
      ],
      bio: "Dr. Citra Dewi adalah dokter spesialis kebidanan dan kandungan dengan fokus khusus pada bidang fertilitas dan reproduksi. Dengan pengalaman lebih dari 10 tahun, beliau telah membantu banyak pasangan mewujudkan impian memiliki anak. Dr. Citra dikenal dengan pendekatan yang empatik dan profesional.",
      awards: [
        "Excellence in Reproductive Medicine (2022)",
        "Patient Choice Award - Fertility Specialist (2021)",
        "Best Practice Award - POGI (2020)",
      ],
    },
  };

  const doctor = doctorsData[slug] || doctorsData["andi-wijaya"];

  const handleAppointmentClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>{doctor.name} - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content={`Profil ${doctor.name}, ${doctor.specialty} di RSIA Sayang Ibu Batusangkar. ${doctor.experience} pengalaman.`}
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
                  src={doctor.image}
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
                {doctor.specialty}
              </Typography>
              <Chip
                label={doctor.subSpecialty}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#FFF",
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={doctor.rating} precision={0.1} readOnly />
                <Typography sx={{ ml: 1, fontWeight: 600 }}>
                  {doctor.rating} ({doctor.totalReviews} ulasan)
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {doctor.experience}
                    </Typography>
                    <Typography variant="body2">Pengalaman</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: "center",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {doctor.patients}
                    </Typography>
                    <Typography variant="body2">Pasien</Typography>
                  </Paper>
                </Grid>
              </Grid>
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
                {doctor.bio}
              </Typography>
            </Paper>

            {/* Education */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E0E0E0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <SchoolIcon sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }} />
                <Typography
                  variant="h5"
                  sx={{ color: "#2E7D32", fontWeight: 700 }}
                >
                  Pendidikan
                </Typography>
              </Box>
              <List>
                {doctor.education.map((edu, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={edu}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Certifications */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E0E0E0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <WorkIcon sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }} />
                <Typography
                  variant="h5"
                  sx={{ color: "#2E7D32", fontWeight: 700 }}
                >
                  Sertifikasi
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {doctor.certifications.map((cert, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#E8F5E9",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="body2" sx={{ color: "#2E7D32" }}>
                          {cert}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Expertise */}
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
                Keahlian Khusus
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {doctor.expertise.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "#FFF",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Awards */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid #E0E0E0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <EmojiEventsIcon
                  sx={{ color: "#FFD700", mr: 1, fontSize: 28 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "#2E7D32", fontWeight: 700 }}
                >
                  Penghargaan
                </Typography>
              </Box>
              <List>
                {doctor.awards.map((award, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <StarIcon sx={{ color: "#FFD700", mr: 2 }} />
                    <ListItemText
                      primary={award}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Schedule */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarMonthIcon
                    sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", fontWeight: 700 }}
                  >
                    Jadwal Praktik
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Hari</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Jam</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctor.schedule.map((sched, index) => (
                        <TableRow key={index}>
                          <TableCell>{sched.day}</TableCell>
                          <TableCell>{sched.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: "#FFF3E0",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#E65100" }}>
                    *Jadwal dapat berubah sewaktu-waktu
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LanguageIcon
                    sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", fontWeight: 700 }}
                  >
                    Bahasa
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {doctor.languages.map((lang, index) => (
                    <Chip
                      key={index}
                      label={lang}
                      size="small"
                      sx={{
                        backgroundColor: "#E8F5E9",
                        color: "#2E7D32",
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Contact */}
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
