import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import AppointmentModal from "./AppointmentModal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";

const ContactSection = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleAppointmentClick = () => {
    if (!isLoggedIn) {
      setLoginOpen(true);
    } else {
      setAppointmentOpen(true);
    }
  };

  const contactInfo = [
    {
      icon: <Phone fontSize="large" />,
      title: "Nomor Telepon",
      detail: "(0752) 71234",
    },
    {
      icon: <Email fontSize="large" />,
      title: "Alamat Email",
      detail: "info@rsiasayangibu.com",
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: "Alamat Kami",
      detail:
        "Jalan Prof. DR. Hamka No.273, Simpuruik, Kec. Sungai Tarab, Kabupaten Tanah Datar 27261",
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FDFDFD" }}>
      <Helmet>
        <meta
          name="keywords"
          content="kontak rsia sayang ibu batusangkar, alamat rumah sakit bersalin tanah datar, buat janji temu maternitas sumatera barat, lokasi rsia sayang ibu"
        />
      </Helmet>
      <Container maxWidth="lg">
        {/* Judul Section */}
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            color: "#4CAF50",
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Hubungi Kami
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: { xs: 5, md: 7 }, color: "#555" }}
        >
          Kami siap membantu Anda dengan layanan terbaik untuk kesehatan ibu dan
          anak
        </Typography>

        {/* Info Kontak */}
        <Grid container spacing={4} justifyContent="center">
          {contactInfo.map((item, index) => (
            <Grid xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  borderRadius: 4,
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <IconButton sx={{ color: "#4CAF50", mt: 1 }}>
                  {item.icon}
                </IconButton>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#333", mb: 1, fontWeight: 600 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.detail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Peta Lokasi */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: "#333", mb: 3, fontWeight: 600 }}
          >
            Lokasi Kami di Peta
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              maxWidth: "100%",
              mx: "auto",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d853.3910584656059!2d100.58733821223458!3d-0.4488980287390125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52d64b08d536d%3A0xfe12094dde21d15f!2sRSIA%20Sayang%20Ibu!5e0!3m2!1sid!2sid!4v1764314340736!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi RSIA Sayang Ibu Batusangkar"
            />
          </Box>
        </Box>

        {/* Tombol Buat Janji */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAppointmentClick}
            size="large"
            sx={{
              borderRadius: 30,
              px: 6,
              py: 1.8,
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#43A047",
                transform: "scale(1.05)",
              },
            }}
          >
            Daftar Sekarang
          </Button>
        </Box>

        {/* Modal */}
        <AppointmentModal
          open={appointmentOpen && isLoggedIn}
          onClose={() => setAppointmentOpen(false)}
        />
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </Container>
    </Box>
  );
};

export default ContactSection;
