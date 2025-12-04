// src/components/ServiceDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Chip,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import logo from "../assets/logo.png";
import { serviceService } from "../utils/api";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function untuk parse JSON string
  const parseJsonField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      return JSON.parse(field);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return [];
    }
  };

  // Fetch data service dari API berdasarkan slug
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await serviceService.getBySlug(slug);

        let serviceData = null;
        if (response?.data?.data) {
          serviceData = response.data.data;
        } else if (response?.data) {
          serviceData = response.data;
        }

        if (serviceData) {
          const parsedService = {
            ...serviceData,
            features: parseJsonField(serviceData.features),
            facilities: parseJsonField(serviceData.facilities),
          };
          setService(parsedService);
          setError(null);
        } else {
          setError("Layanan tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Belum tersedia informasi");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          pt: 10,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Container sx={{ mt: 15, mb: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Layanan tidak ditemukan"}
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
          Kembali ke Beranda
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Helmet>
        <title>{service.title} - RSIA Sayang Ibu Batusangkar</title>
        <meta name="description" content={service.description} />
        <meta
          name="keywords"
          content={`${service.title}, rsia sayang ibu, batusangkar, tanah datar`}
        />
      </Helmet>

      {/* Hero Section - Banner Hijau */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)",
          py: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="RSIA Sayang Ibu Logo"
              sx={{
                width: { xs: 80, md: 110 },
                height: { xs: 80, md: 110 },
                backgroundColor: "rgba(255,255,255,0.98)",
                borderRadius: "50%",
                p: 1.5,
                mb: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              }}
            />
            <Chip
              label="Layanan Unggulan"
              icon={<StarIcon />}
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "#FFF",
                fontWeight: 600,
                mb: 2,
                backdropFilter: "blur(10px)",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3.5rem" },
                color: "#FFFFFF",
                textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                mb: 2,
              }}
            >
              {service.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Chip
                icon={<VerifiedUserIcon />}
                label="Tersertifikasi"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<PeopleIcon />}
                label="Tim Profesional"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Deskripsi Utama */}
      <Container maxWidth="lg" sx={{ mt: -4, position: "relative", zIndex: 2 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 10,
            borderRadius: 3,
            backgroundColor: "#FFFFFF",
            mb: 5,
            border: "1px solid #E8F5E9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <MedicalServicesIcon
              sx={{ color: "#4CAF50", fontSize: 32, mr: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2E7D32" }}>
              Tentang Layanan
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.9,
              color: "#424242",
              textAlign: "justify",
              letterSpacing: "0.3px",
            }}
          >
            {service.description}
          </Typography>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Gambar Layanan */}
            {service.imageUrl && (
              <Paper
                elevation={3}
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={service.imageUrl}
                  alt={service.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 450,
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    color: "#FFF",
                    p: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Fasilitas {service.title} - Rumah Sakit Sayang Ibu
                  </Typography>
                </Box>
              </Paper>
            )}

            {/* Keunggulan Layanan */}
            <Paper
              elevation={2}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                border: "2px solid #E8F5E9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: 2,
                    p: 1.5,
                    mr: 2,
                  }}
                >
                  <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 32 }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Keunggulan Layanan Kami
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#F1F8E9",
                      boxShadow: "none",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <StarIcon sx={{ color: "#FBC02D", mr: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2E7D32" }}
                      >
                        Standar Pelayanan Tinggi
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Layanan berkualitas dengan standar nasional
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#F1F8E9",
                      boxShadow: "none",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <PeopleIcon sx={{ color: "#4CAF50", mr: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2E7D32" }}
                      >
                        Tim Medis Berpengalaman
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Ditangani oleh tenaga medis profesional
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#F1F8E9",
                      boxShadow: "none",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <SecurityIcon sx={{ color: "#4CAF50", mr: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2E7D32" }}
                      >
                        Keamanan Terjamin
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Prosedur medis yang aman dan teruji
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      backgroundColor: "#F1F8E9",
                      boxShadow: "none",
                      p: 2,
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AccessTimeIcon sx={{ color: "#4CAF50", mr: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: "#2E7D32" }}
                      >
                        Layanan Cepat
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Penanganan yang efisien dan tepat waktu
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <Paper
                elevation={2}
                sx={{
                  mb: 4,
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Jenis Layanan yang Tersedia
                </Typography>
                <List>
                  {service.features.map((feature, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        px: 0,
                        py: 1.5,
                        borderBottom:
                          index < service.features.length - 1
                            ? "1px solid #F0F0F0"
                            : "none",
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            backgroundColor: "#E8F5E9",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleIcon
                            sx={{ color: "#4CAF50", fontSize: 24 }}
                          />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Facilities */}
            {service.facilities && service.facilities.length > 0 && (
              <Paper
                elevation={2}
                sx={{
                  mb: 4,
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Fasilitas Penunjang
                </Typography>
                <Grid container spacing={2}>
                  {service.facilities.map((facility, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card
                        sx={{
                          backgroundColor: "#FAFAFA",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 4px 16px rgba(76, 175, 80, 0.2)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                backgroundColor: "#E8F5E9",
                                borderRadius: 2,
                                p: 1,
                                mr: 2,
                              }}
                            >
                              <LocalHospitalIcon
                                sx={{ color: "#4CAF50", fontSize: 28 }}
                              />
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{ color: "#2E7D32", fontWeight: 600 }}
                            >
                              {facility}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}

            {/* FAQ Section */}
            <Paper
              elevation={2}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#2E7D32",
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Pertanyaan Umum
              </Typography>
              <Accordion
                sx={{ mb: 1, boxShadow: "none", border: "1px solid #E0E0E0" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Apakah layanan ini menerima BPJS?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Ya, kami menerima BPJS Kesehatan dan berbagai asuransi
                    kesehatan lainnya. Silakan hubungi bagian administrasi untuk
                    informasi lebih lanjut.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ mb: 1, boxShadow: "none", border: "1px solid #E0E0E0" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Bagaimana cara membuat janji?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Anda dapat membuat janji melalui telepon, WhatsApp, atau
                    datang langsung ke bagian pendaftaran. Kami sarankan untuk
                    membuat janji terlebih dahulu agar tidak perlu menunggu
                    lama.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{ boxShadow: "none", border: "1px solid #E0E0E0" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Apa yang harus dibawa saat berkunjung?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    Bawa kartu identitas (KTP/SIM), kartu BPJS/asuransi (jika
                    ada), dan rekam medis sebelumnya jika ada. Datang 15 menit
                    lebih awal untuk proses administrasi.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Payment & Insurance */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#E8F5E9",
                      borderRadius: 2,
                      p: 1,
                      mr: 2,
                    }}
                  >
                    <AttachMoneyIcon sx={{ color: "#4CAF50", fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", fontWeight: 700 }}
                  >
                    Metode Pembayaran
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Chip
                      label="BPJS"
                      size="small"
                      sx={{ width: "100%", backgroundColor: "#E8F5E9" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip
                      label="Tunai"
                      size="small"
                      sx={{ width: "100%", backgroundColor: "#E8F5E9" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip
                      label="Debit"
                      size="small"
                      sx={{ width: "100%", backgroundColor: "#E8F5E9" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip
                      label="Kredit"
                      size="small"
                      sx={{ width: "100%", backgroundColor: "#E8F5E9" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Chip
                      label="Asuransi Swasta"
                      size="small"
                      sx={{ width: "100%", backgroundColor: "#E8F5E9" }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                border: "2px solid #E8F5E9",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "#E8F5E9",
                      borderRadius: 2,
                      p: 1,
                      mr: 2,
                    }}
                  >
                    <InfoIcon sx={{ color: "#4CAF50", fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", fontWeight: 700 }}
                  >
                    Persiapan Kunjungan
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ px: 0, py: 1.5, alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: "#4CAF50", fontSize: 20 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Bawa Kartu Identitas"
                      secondary="KTP/SIM/Passport yang masih berlaku"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                      secondaryTypographyProps={{
                        fontSize: "0.85rem",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 1.5, alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: "#4CAF50", fontSize: 20 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Kartu BPJS/Asuransi"
                      secondary="Jika memiliki jaminan kesehatan"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                      secondaryTypographyProps={{
                        fontSize: "0.85rem",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 1.5, alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: "#4CAF50", fontSize: 20 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Datang Lebih Awal"
                      secondary="15-30 menit sebelum jadwal untuk registrasi"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                      secondaryTypographyProps={{
                        fontSize: "0.85rem",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 1.5, alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: "#4CAF50", fontSize: 20 }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Rekam Medis"
                      secondary="Bawa hasil pemeriksaan sebelumnya jika ada"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                      secondaryTypographyProps={{
                        fontSize: "0.85rem",
                      }}
                    />
                  </ListItem>
                </List>
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Harap konfirmasi jadwal janji temu Anda sebelum datang
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Paper
          elevation={4}
          sx={{
            mt: 6,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)",
            textAlign: "center",
            color: "#FFF",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.5rem", md: "2.2rem" },
              }}
            >
              Siap Mendapatkan Layanan Terbaik?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                opacity: 0.95,
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
              }}
            >
              Tim medis profesional kami siap memberikan pelayanan kesehatan
              terbaik untuk Anda dan keluarga. Hubungi kami sekarang untuk
              konsultasi atau membuat janji temu.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                component={Link}
                to="/contact"
                size="large"
                sx={{
                  backgroundColor: "#FFF",
                  color: "#4CAF50",
                  borderRadius: 30,
                  px: 5,
                  py: 1.8,
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Hubungi Kami!
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Trust Indicators */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#FAFAFA",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
              }}
            >
              <VerifiedUserIcon
                sx={{ fontSize: 48, color: "#4CAF50", mb: 1 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2E7D32" }}
              >
                Tersertifikasi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Standar layanan nasional
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#FAFAFA",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
              }}
            >
              <PeopleIcon sx={{ fontSize: 48, color: "#4CAF50", mb: 1 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2E7D32" }}
              >
                Tim Profesional
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tenaga medis berpengalaman
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#FAFAFA",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 48, color: "#4CAF50", mb: 1 }} />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2E7D32" }}
              >
                24/7 Emergency
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Layanan darurat siaga
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: "#FAFAFA",
                boxShadow: "none",
                border: "1px solid #E0E0E0",
              }}
            >
              <LocalHospitalIcon
                sx={{ fontSize: 48, color: "#4CAF50", mb: 1 }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#2E7D32" }}
              >
                Fasilitas Lengkap
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Peralatan medis modern
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
