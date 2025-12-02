import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import ComputerIcon from "@mui/icons-material/Computer";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import MosqueIcon from "@mui/icons-material/Mosque";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import logo from "../assets/logo.png";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const missionItems = [
    {
      title: "Pelayanan Profesional",
      description:
        "Memberikan layanan kesehatan yang bermutu tinggi dengan standar profesionalisme tertinggi.",
      icon: <FavoriteIcon sx={{ fontSize: 48, color: "#4CAF50" }} />,
    },
    {
      title: "SDM Unggul",
      description:
        "Membentuk tim yang bertakwa, solid, kompeten, dan produktif untuk pelayanan terbaik.",
      icon: <PeopleIcon sx={{ fontSize: 48, color: "#4CAF50" }} />,
    },
    {
      title: "Efisiensi Teknologi",
      description:
        "Menerapkan sistem IT terintegrasi untuk layanan yang efektif dan efisien.",
      icon: <ComputerIcon sx={{ fontSize: 48, color: "#4CAF50" }} />,
    },
    {
      title: "Kenyamanan dan Keamanan",
      description:
        "Menjamin pelayanan yang aman dan nyaman bagi perempuan dan anak.",
      icon: <ChildCareIcon sx={{ fontSize: 48, color: "#4CAF50" }} />,
    },
    {
      title: "Budaya Islami",
      description:
        "Menerapkan nilai-nilai Islami dalam setiap aspek penampilan dan pelayanan.",
      icon: <MosqueIcon sx={{ fontSize: 48, color: "#4CAF50" }} />,
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>Tentang Kami - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="RSIA Sayang Ibu Batusangkar adalah rumah sakit ibu dan anak terpercaya di Tanah Datar, Sumatera Barat, dengan fokus pada kesehatan ibu dan anak serta pelayanan berbasis nilai Islami."
        />
        <meta
          name="keywords"
          content="tentang rsia sayang ibu, rumah sakit ibu dan anak batusangkar, kesehatan ibu dan anak tanah datar, rumah sakit islami sumatera barat"
        />
      </Helmet>

      {/* Hero Section with Enhanced Design */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "70vh", md: "80vh" },
          backgroundImage: `linear-gradient(135deg, rgba(76, 175, 80, 0.85) 0%, rgba(27, 94, 32, 0.75) 100%), url('https://img.freepik.com/free-photo/modern-hospital-building-with-glass-windows_1267452-2157.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#FFFFFF",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            animation: "shimmer 3s infinite",
          },
          "@keyframes shimmer": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              animation: "fadeInUp 1s ease-out",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(50px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: 100, md: 140 },
                  height: { xs: 100, md: 140 },
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "50%",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
                    "50%": { transform: "translate(-50%, -50%) scale(1.05)" },
                  },
                }}
              />
              <Box
                component="img"
                src={logo}
                alt="RSIA Sayang Ibu Logo"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                }}
              />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.8rem", md: "4.5rem", lg: "5rem" },
                mb: 2,
                color: "#FFFFFF",
                textShadow:
                  "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
                letterSpacing: "-0.02em",
              }}
            >
              Tentang RSIA Sayang Ibu
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 300,
                fontSize: { xs: "1.4rem", md: "1.8rem" },
                mb: 4,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.4,
              }}
            >
              Keselamatan Ibu dan Anak adalah Tujuan Utama Kami
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 4,
                backgroundColor: "#FFFFFF",
                mx: "auto",
                borderRadius: 2,
                opacity: 0.8,
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Introduction Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 6,
              background: "linear-gradient(90deg, #4CAF50 0%, #81C784 100%)",
            },
          }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={8}>
              <Typography
                variant="h3"
                sx={{
                  color: "#2E7D32",
                  fontWeight: 700,
                  mb: 4,
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  lineHeight: 1.2,
                }}
              >
                Mengenal RSIA Sayang Ibu
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#424242",
                  lineHeight: 1.8,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                  mb: 4,
                }}
              >
                RSIA Sayang Ibu Batusangkar adalah rumah sakit ibu dan anak
                terkemuka yang berdedikasi untuk kesehatan ibu dan anak.
                Berlokasi di Jalan Hamka No. 273, Sungai Tarab, Kabupaten Tanah
                Datar, Sumatera Barat, kami dioperasikan oleh PT. Sayang Ibu.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#424242",
                  lineHeight: 1.8,
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                }}
              >
                Dengan pendekatan berbasis nilai Islami, kami menawarkan
                perawatan penuh kasih yang mengutamakan keselamatan dan
                kenyamanan, menjadikan kami pilihan utama masyarakat Tanah Datar
                dan sekitarnya.
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  position: "relative",
                  height: 300,
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Hospital Interior"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Vision Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 6, md: 10 },
            borderRadius: 4,
            background:
              "linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 50%, #FFFFFF 100%)",
            textAlign: "center",
            border: "1px solid #C8E6C9",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <VisibilityIcon sx={{ fontSize: 48, color: "#2E7D32", mr: 2 }} />
            <Typography
              variant="h3"
              sx={{
                color: "#2E7D32",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Visi Kami
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "#1B5E20",
              fontWeight: 600,
              fontSize: { xs: "1.6rem", md: "2rem", lg: "2.2rem" },
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.4,
              textAlign: "center",
              fontStyle: "italic",
              position: "relative",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                width: 60,
                height: 2,
                backgroundColor: "#4CAF50",
                transform: "translateY(-50%)",
              },
              "&::before": { left: -80 },
              "&::after": { right: -80 },
            }}
          >
            "Menjadi Rumah Sakit Unggulan yang Islami dan Dipilih oleh
            Masyarakat Tanah Datar dan Sekitarnya pada Tahun 2024"
          </Typography>
        </Paper>

        {/* Mission Section */}
        <Box sx={{ mb: 10 }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <AssignmentIcon sx={{ fontSize: 48, color: "#2E7D32", mr: 2 }} />
              <Typography
                variant="h3"
                sx={{
                  color: "#2E7D32",
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Misi Kami
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#666",
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Lima pilar utama yang menjadi fondasi pelayanan kesehatan terbaik
              kami
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {missionItems.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                xl={2.4}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    maxWidth: 320,
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    border: "1px solid #E8F5E9",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: "0 12px 40px rgba(76, 175, 80, 0.15)",
                      "& .mission-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                      "&::before": {
                        opacity: 1,
                      },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background:
                        "linear-gradient(90deg, #4CAF50 0%, #81C784 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Box
                        className="mission-icon"
                        sx={{
                          mb: 3,
                          transition: "transform 0.3s ease",
                          p: 2,
                          borderRadius: "50%",
                          backgroundColor: "#F1F8E9",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#2E7D32",
                          fontWeight: 700,
                          mb: 2,
                          fontSize: { xs: "1.2rem", md: "1.3rem" },
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        lineHeight: 1.7,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Location Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <LocationOnIcon sx={{ fontSize: 48, color: "#2E7D32", mr: 2 }} />
            <Typography
              variant="h3"
              sx={{
                color: "#2E7D32",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Lokasi Kami
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.1rem", md: "1.2rem" },
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Jalan Hamka No. 273, Sungai Tarab, Kabupaten Tanah Datar, Sumatera
            Barat
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              height: { xs: 350, md: 450 },
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d853.3910584656059!2d100.58733821223458!3d-0.4488980287390125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52d64b08d536d%3A0xfe12094dde21d15f!2sRSIA%20Sayang%20Ibu!5e0!3m2!1sid!2sid!4v1764314340736!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="RSIA Sayang Ibu Location"
            />
          </Box>
        </Paper>

        {/* Governance Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#2E7D32",
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Tata Kelola Kami
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: "#F8F9FA",
                  border: "1px solid #E9ECEF",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                  }}
                >
                  Struktur Organisasi
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#424242",
                    lineHeight: 1.7,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  RSIA Sayang Ibu Batusangkar dikelola oleh PT. Sayang Ibu
                  dengan tata kelola yang terstruktur sesuai Peraturan Internal
                  Korporasi. Direktur Rumah Sakit, yang diangkat untuk masa
                  jabatan minimal satu tahun, memimpin semua aspek operasional,
                  dari pelayanan medik hingga keperawatan, dengan penuh tanggung
                  jawab.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: "#F1F8E9",
                  border: "1px solid #C8E6C9",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                  }}
                >
                  Jaminan Kualitas
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#424242",
                    lineHeight: 1.7,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  Profesionalisme kami dijaga oleh Komite Medik dan Komite
                  Keperawatan, yang bertugas memastikan kredensial, mutu
                  profesi, serta disiplin dan etika staf. Didukung oleh panitia
                  adhoc dari mitra bestari, kami menjamin pelayanan yang
                  konsisten dan berkualitas tinggi.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 6, md: 10 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
            textAlign: "center",
            color: "#FFFFFF",
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
                "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Keselamatan Ibu dan Anak adalah Tujuan Utama Kami
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: "1.1rem", md: "1.2rem" },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Bergabunglah dengan ribuan keluarga yang telah mempercayakan
              kesehatan ibu dan anak kepada kami
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/contact"
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#2E7D32",
                borderRadius: 30,
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Hubungi Kami Sekarang
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutPage;
