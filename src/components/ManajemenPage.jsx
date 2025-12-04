import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Helmet } from "react-helmet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import logo from "../assets/logo.png";

const ManagementPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // DATA (tetap sama)
  const commissioners = [
    {
      name: "Dr. H. Ahmad Syahrial, Sp.OG",
      position: "Komisaris Utama",
      desc: "Spesialis Obstetri dan Ginekologi dengan pengalaman lebih dari 25 tahun di bidang kesehatan maternal dan tata kelola korporasi.",
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Hj. Siti Rahma, S.E., M.M.",
      position: "Komisaris",
      desc: "Ahli manajemen strategis dan keuangan korporasi dengan pengalaman lebih dari 20 tahun.",
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const directors = [
    {
      name: "Dr. H. Basuki Rahmanto, Sp.A",
      position: "Direktur Utama",
      desc: "Spesialis Anak dengan pengalaman 22+ tahun dalam manajemen rumah sakit dan pelayanan kesehatan anak.",
      img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Hj. Fatimah Azzahra, Sp.OG",
      position: "Direktur Medis",
      desc: "Spesialis Obstetri dan Ginekologi, fokus pada quality assurance dan pelayanan medis berkualitas tinggi.",
      img: "https://images.unsplash.com/photo-1594824475704-b8b47ea8f8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ir. Muhammad Fadli, M.M.",
      position: "Direktur Operasional",
      desc: "Ahli operasional rumah sakit dan sistem informasi manajemen dengan pengalaman 15+ tahun.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const hospitalDirector = {
    name: "Dr. dr. Rina Susanti, Sp.OG(K), MARS",
    position: "Direktur Rumah Sakit",
    desc: "Dokter spesialis obstetri dan ginekologi konsultan dengan gelar Master Administrasi Rumah Sakit. Memimpin seluruh operasional RSIA Sayang Ibu Batusangkar untuk menjamin pelayanan ibu dan anak yang bermutu, aman, dan berorientasi pada pasien.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  const PersonItem = ({ person, color }) => (
    <Box
      sx={{
        textAlign: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        transition: "transform 0.4s ease",
        "&:hover": { transform: "translateY(-10px)" },
      }}
    >
      {/* Foto Lingkaran */}
      <Box sx={{ position: "relative", mb: 4, display: "inline-block" }}>
        <Avatar
          src={person.img}
          alt={person.name}
          sx={{
            width: { xs: 180, md: 220 },
            height: { xs: 180, md: 220 },
            border: `8px solid ${color}22`,
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            mx: "auto",
          }}
        />
        {/* Overlay nama & jabatan */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0,0,0,0.65)",
            color: "white",
            py: 1.5,
            borderRadius: "0 0 50% 50%",
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {person.name}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {person.position}
          </Typography>
        </Box>
      </Box>

      {/* Deskripsi */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 420,
          mx: "auto",
          lineHeight: 1.8,
          fontSize: { xs: "0.95rem", md: "1rem" },
        }}
      >
        {person.desc}
      </Typography>
    </Box>
  );

  const Section = ({ title, icon: Icon, color, children }) => (
    <Box sx={{ mb: { xs: 10, md: 16 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
        <Icon sx={{ fontSize: { xs: 48, md: 64 }, color, mb: 2 }} />
        <Typography
          variant="h3"
          component="h2"
          fontWeight={800}
          color={color}
          sx={{ fontSize: { xs: "2.2rem", md: "3rem" } }}
        >
          {title}
        </Typography>
        <Divider
          sx={{
            width: 120,
            mx: "auto",
            mt: 3,
            borderBottomWidth: 4,
            bgcolor: color,
            borderRadius: 2,
          }}
        />
      </Box>

      {children}
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Helmet>
        <title>Manajemen - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Profil lengkap jajaran manajemen RSIA Sayang Ibu Batusangkar"
        />
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          bgcolor: "#1B5E20",
          background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
          py: { xs: 12, md: 18 },
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              width: isMobile ? 140 : 140,
              height: isMobile ? 140 : 140,
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
              style={{ width: isMobile ? 100 : 120 }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.8rem", md: "4.8rem" },
              fontWeight: 600,
              letterSpacing: { xs: "-0.5px", md: "-1.5px" },
              mb: 2,
            }}
          >
            Jajaran Manajemen
          </Typography>
          <Typography
            variant="h5"
            sx={{ opacity: 0.92, maxWidth: 600, mx: "auto", fontWeight: 200 }}
          >
            Kepemimpinan berpengalaman yang berdedikasi untuk memberikan
            pelayanan kesehatan ibu dan anak terbaik
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* PEMILIK / DEWAN KOMISARIS */}
        <Section
          title="Dewan Komisaris"
          icon={AccountBalanceIcon}
          color="#D81B60"
        >
          <Grid container spacing={{ xs: 6, md: 8 }} justifyContent="center">
            {commissioners.map((person, i) => (
              <Grid item xs={12} md={6} key={i}>
                <PersonItem person={person} color="#D81B60" />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* DEWAN DIREKSI */}
        <Section
          title="Dewan Direksi"
          icon={BusinessCenterIcon}
          color="#2E7D32"
        >
          <Grid container spacing={{ xs: 6, md: 8 }} justifyContent="center">
            {directors.map((person, i) => (
              <Grid item xs={12} md={4} key={i}>
                <PersonItem person={person} color="#2E7D32" />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* DIREKTUR RUMAH SAKIT */}
        <Section title="Direktur Rumah Sakit" icon={GroupsIcon} color="#1565C0">
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <PersonItem person={hospitalDirector} color="#1565C0" />
            </Grid>
          </Grid>
        </Section>
      </Container>
    </Box>
  );
};

export default ManagementPage;
