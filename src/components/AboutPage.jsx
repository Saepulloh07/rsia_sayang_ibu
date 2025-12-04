import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import ComputerIcon from "@mui/icons-material/Computer";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import MosqueIcon from "@mui/icons-material/Mosque";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../assets/logo.png";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const missions = [
    {
      title: "Pelayanan Profesional",
      desc: "Memberikan layanan kesehatan yang bermutu tinggi dengan standar profesionalisme tertinggi.",
      icon: FavoriteIcon,
    },
    {
      title: "SDM Unggul",
      desc: "Membentuk tim yang bertakwa, solid, kompeten, dan produktif untuk pelayanan terbaik.",
      icon: PeopleIcon,
    },
    {
      title: "Efisiensi Teknologi",
      desc: "Menerapkan sistem IT terintegrasi untuk layanan yang efektif dan efisien.",
      icon: ComputerIcon,
    },
    {
      title: "Kenyamanan dan Keamanan",
      desc: "Menjamin pelayanan yang aman dan nyaman bagi perempuan dan anak.",
      icon: ChildCareIcon,
    },
    {
      title: "Budaya Islami",
      desc: "Menerapkan nilai-nilai Islami dalam setiap aspek penampilan dan pelayanan.",
      icon: MosqueIcon,
    },
  ];

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Helmet>
        <title>Tentang Kami - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="RSIA Sayang Ibu Batusangkar adalah rumah sakit ibu dan anak terpercaya di Tanah Datar dengan pelayanan berbasis nilai Islami dan kepemimpinan berpengalaman."
        />
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          bgcolor: "#1B5E20",
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
          py: { xs: 12, md: 15 },
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              width: isMobile ? 140 : 200,
              height: isMobile ? 140 : 200,
              bgcolor: "white",
              borderRadius: "50%",
              mx: "auto",
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: isMobile ? 100 : 150 }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.8rem", md: "4.8rem" },
              fontWeight: 900,
              letterSpacing: { xs: "-0.5px", md: "-1.5px" },
              mb: 2,
            }}
          >
            Tentang Kami
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.92,
              maxWidth: 800,
              mx: "auto",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Rumah sakit ibu dan anak berbasis nilai Islami yang berdedikasi
            penuh untuk keselamatan dan kenyamanan pasien
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* INTRODUCTION */}
        <Box sx={{ mb: { xs: 12, md: 16 }, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#2E7D32",
              fontWeight: 800,
              mb: 4,
              fontSize: { xs: "2.4rem", md: "3.2rem" },
            }}
          >
            Mengenal RSIA Sayang Ibu Batusangkar
          </Typography>
          <Divider
            sx={{
              width: 120,
              mx: "auto",
              mb: 6,
              borderBottomWidth: 4,
              bgcolor: "#4CAF50",
              borderRadius: 2,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              color: "text.secondary",
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.9,
            }}
          >
            RSIA Sayang Ibu Batusangkar adalah rumah sakit khusus ibu dan anak
            yang dioperasikan oleh PT Sayang Ibu, berlokasi di Jalan Hamka No.
            273, Sungai Tarab, Kabupaten Tanah Datar, Sumatera Barat. Dengan
            pendekatan berbasis nilai-nilai Islami, kami mengedepankan pelayanan
            penuh kasih, profesional, aman, dan nyaman bagi seluruh keluarga.
          </Typography>
        </Box>

        {/* VISION */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            py: { xs: 8, md: 10 },
            px: { xs: 4, md: 8 },
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            mb: { xs: 12, md: 16 },
          }}
        >
          <VisibilityIcon sx={{ fontSize: 64, color: "#2E7D32", mb: 3 }} />
          <Typography
            variant="h3"
            sx={{ color: "#2E7D32", fontWeight: 800, mb: 4 }}
          >
            Visi Kami
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              color: "#1B5E20",
              maxWidth: 1000,
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            “Menjadi Rumah Sakit Unggulan yang Islami dan Dipilih oleh
            Masyarakat Tanah Datar dan Sekitarnya pada Tahun 2026”
          </Typography>
        </Box>

        {/* MISI KAMI – BENTUK PENTAGON UNIK (TANPA CARD) */}
        <Box
          sx={{
            position: "relative",
            width: { xs: 340, sm: 460, md: 620, lg: 720 },
            height: { xs: 340, sm: 460, md: 620, lg: 720 },
            mx: "auto",
            my: { xs: 12, md: 20 },
            mb: 10,
            background: "transparent",
          }}
        >
          {/* Judul di Tengah Pentagon */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.8rem", md: "2.6rem" },
                color: "#1B5E20",
                mb: 1,
              }}
            >
              Misi Kami
            </Typography>
            <Divider
              sx={{
                width: 80,
                mx: "auto",
                borderBottomWidth: 4,
                bgcolor: "#4CAF50",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* 5 Poin Misi di Setiap Sudut Pentagon */}
          {missions.map((mission, index) => {
            const Icon = mission.icon;

            // Posisi sudut pentagon (dalam persen dari 0-360°)
            const angles = [90, 162, 234, 306, 18]; // sudut pentagon reguler
            const angleDeg = angles[index];
            const radius = { xs: 42, sm: 44, md: 46, lg: 48 }; // jarak dari pusat (%)

            const x =
              50 +
              radius[
                Object.keys(radius).find(
                  (key) => theme.breakpoints.values[key] >= window.innerWidth
                ) || "lg"
              ] *
                Math.cos(((angleDeg - 90) * Math.PI) / 180);
            const y =
              50 +
              radius[
                Object.keys(radius).find(
                  (key) => theme.breakpoints.values[key] >= window.innerWidth
                ) || "lg"
              ] *
                Math.sin(((angleDeg - 90) * Math.PI) / 180);

            return (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: "translate(-50%, -50%)",
                  width: { xs: 130, sm: 170, md: 210, lg: 240 },
                  textAlign: "center",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translate(-50%, -50%) scale(1.1)",
                    zIndex: 20,
                  },
                }}
              >
                {/* Lingkaran Icon */}
                <Avatar
                  sx={{
                    width: { xs: 70, md: 90 },
                    height: { xs: 70, md: 90 },
                    bgcolor: "#FFFFFF",
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 10px 30px rgba(76,175,80,0.2)",
                    border: "4px solid #4CAF50",
                  }}
                >
                  <Icon
                    sx={{ fontSize: { xs: 36, md: 48 }, color: "#2E7D32" }}
                  />
                </Avatar>

                {/* Judul */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: "#1B5E20",
                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                    mb: 1,
                  }}
                >
                  {mission.title}
                </Typography>

                {/* Deskripsi */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#424242",
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    lineHeight: 1.5,
                    px: 1,
                  }}
                >
                  {mission.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* LOCATION */}
        <Box sx={{ mb: { xs: 12, md: 16 }, textAlign: "center" }}>
          <LocationOnIcon
            sx={{ fontSize: 64, color: "#2E7D32", mb: 3, mt: 10 }}
          />
          <Typography
            variant="h3"
            sx={{ color: "#2E7D32", fontWeight: 800, mb: 4 }}
          >
            Lokasi Kami
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 6, fontSize: "1.1rem" }}
          >
            Jalan Hamka No. 273, Sungai Tarab, Kabupaten Tanah Datar,
            <br />
            Sumatera Barat
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
              height: { xs: 400, md: 500 },
              mx: "auto",
              maxWidth: 1000,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d853.3910584656059!2d100.58733821223458!3d-0.4488980287390125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52d64b08d536d%3A0xfe12094dde21d15f!2sRSIA%20Sayang%20Ibu!5e0!3m2!1sid!2sid!4v1764314340736!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Lokasi RSIA Sayang Ibu"
            />
          </Box>
        </Box>

        {/* CTA */}
        <Box
          sx={{
            bgcolor: "#2E7D32",
            color: "white",
            py: { xs: 10, md: 14 },
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.2rem", md: "3rem" },
              }}
            >
              Keselamatan Ibu dan Anak Adalah Prioritas Kami
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 6, opacity: 0.95, lineHeight: 1.7 }}
            >
              Percayakan kesehatan keluarga Anda kepada tim medis berpengalaman
              dengan fasilitas modern dan sentuhan kasih Islami
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/contact"
              size="large"
              sx={{
                bgcolor: "white",
                color: "#2E7D32",
                fontWeight: 700,
                px: 6,
                py: 2,
                borderRadius: 30,
                fontSize: "1.1rem",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "translateY(-3px)",
                },
              }}
            >
              Hubungi Kami Sekarang
            </Button>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
