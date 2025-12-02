import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { styled, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import {
  FaDownload,
  FaMobileAlt,
  FaComments,
  FaQrcode,
  FaClock,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

import mobileJknMockup from "../assets/mobilejkn-poster.webp";
import telemedicineMockup from "../assets/mobilejkn-poster.webp";

// ==================== BACKGROUND HIJAU ELEGAN ====================
const HeroPromo = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 30%, #A5D6A7 60%, #81C784 100%)`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2366BB6A' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  borderRadius: 32,
  margin: "80px 0",
  boxShadow: "0 20px 60px rgba(76, 175, 80, 0.2)",
  [theme.breakpoints.down("md")]: { margin: "40px 0" },
}));

const ComingSoonChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  fontWeight: 700,
}));

const ServicesSection = () => {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>RSIA Sayang Ibu - Mobile JKN & Telemedicine</title>
      </Helmet>

      <HeroPromo
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
        >
          {/* ================= JUDUL & BENEFIT ================= */}
          <Stack spacing={5} mb={10} alignItems="center" textAlign="center">
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                fontSize: { xs: "2.4rem", md: "3.8rem" },
                background: "linear-gradient(90deg, #1B5E20, #4CAF50)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
            >
              Kesehatan Ibu & Bayi
              <br />
              <Box component="span" sx={{ color: "#2E7D32" }}>
                Kini di Ujung Jari
              </Box>
            </Typography>

            <Typography
              variant="h6"
              color="#1B5E20"
              fontWeight={500}
              sx={{ maxWidth: 800, opacity: 0.95 }}
            >
              Daftar poli, cek jadwal dokter, antrian BPJS, hasil lab, dan
              pantau kehamilan langsung dari smartphone Anda — praktis, cepat,
              dan aman.
            </Typography>

            <Box sx={{ width: "100%", mt: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                {[
                  {
                    icon: <FaMobileAlt size={32} />,
                    text: "Pendaftaran Online",
                  },
                  { icon: <FaQrcode size={32} />, text: "QR Antrian Cepat" },
                  { icon: <FaClock size={32} />, text: "Hemat Waktu" },
                  {
                    icon: <MdHealthAndSafety size={36} />,
                    text: "Data Terjamin Aman",
                  },
                ].map((item, i) => (
                  <Stack key={i} alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        color: "#4CAF50",
                        bgcolor: "rgba(255,255,255,0.7)",
                        p: 2,
                        borderRadius: "50%",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography fontWeight={700} color="#1B5E20">
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ my: 10, borderColor: "rgba(76, 175, 80, 0.3)" }} />

          {/* ================= MOBILE JKN: TULISAN KIRI → GAMBAR KANAN (SELALU) ================= */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 6, md: 8 },
              alignItems: "center",
              mb: 14,
            }}
          >
            {/* TULISAN (Kiri di desktop, atas di mobile) */}
            <Box sx={{ flex: 1, order: { xs: 2, md: 1 } }}>
              <Stack spacing={4}>
                <Typography variant="h4" fontWeight={800} color="#1B5E20">
                  Unduh Mobile JKN <br />
                  <Box component="span" color="#4CAF50">
                    Resmi BPJS Kesehatan
                  </Box>
                </Typography>
                <Typography color="#2E7D32" sx={{ opacity: 0.9 }}>
                  Aplikasi resmi yang terintegrasi langsung dengan sistem RSIA
                  Sayang Ibu.
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FaDownload />}
                    href="https://play.google.com/store/apps/details?id=app.bpjs.mobile"
                    target="_blank"
                    sx={{
                      bgcolor: "#1B5E20",
                      "&:hover": { bgcolor: "#2E7D32" },
                    }}
                  >
                    Play Store
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<FaDownload />}
                    href="https://apps.apple.com/id/app/mobile-jkn/id1442502769"
                    target="_blank"
                    sx={{
                      borderColor: "#1B5E20",
                      color: "#1B5E20",
                      "&:hover": {
                        borderColor: "#2E7D32",
                        bgcolor: "rgba(27,94,32,0.05)",
                      },
                    }}
                  >
                    App Store
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* GAMBAR (Kanan di desktop, bawah di mobile) */}
            <Box sx={{ flex: 1, order: { xs: 1, md: 2 }, textAlign: "center" }}>
              <Box
                component="img"
                src={mobileJknMockup}
                alt="Mobile JKN"
                sx={{
                  width: "100%",
                  maxWidth: { xs: 300, sm: 360, md: 480 },
                  borderRadius: 24,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                  border: "10px solid #fff",
                }}
              />
            </Box>
          </Box>

          {/* ================= TELEMEDICINE: GAMBAR KIRI → TULISAN KANAN (SELALU) ================= */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 6, md: 8 },
              alignItems: "center",
            }}
          >
            {/* GAMBAR (Kiri di desktop, atas di mobile) */}
            <Box sx={{ flex: 1, order: { xs: 1, md: 1 }, textAlign: "center" }}>
              <Box
                component="img"
                src={telemedicineMockup}
                alt="Telemedicine RSIA Sayang Ibu"
                sx={{
                  width: "100%",
                  maxWidth: { xs: 280, sm: 340, md: 460 },
                  borderRadius: 24,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                  border: "10px solid #fff",
                }}
              />
            </Box>

            {/* TULISAN (Kanan di desktop, bawah di mobile) */}
            <Box sx={{ flex: 1, order: { xs: 2, md: 2 } }}>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography variant="h4" fontWeight={800} color="#1B5E20">
                    Telemedicine RSIA Sayang Ibu
                  </Typography>
                  <ComingSoonChip label="COMING SOON" />
                </Stack>
                <Typography color="#2E7D32" sx={{ opacity: 0.9 }}>
                  Konsultasi dokter kandungan & anak via video call, resep
                  digital, dan rekam medis terintegrasi — semua dalam satu
                  aplikasi.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled
                  startIcon={<FaComments />}
                >
                  Segera Hadir
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </HeroPromo>
    </>
  );
};

export default ServicesSection;
