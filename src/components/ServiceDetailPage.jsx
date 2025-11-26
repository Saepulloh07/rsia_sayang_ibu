import React from "react";
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import logo from "../assets/logo.png";
import hero1 from "../assets/hero1.jpg";

const ServiceDetailPage = () => {
  const { slug } = useParams();

  const servicesData = {
    obstetrics: {
      title: "Kebidanan dan Kandungan",
      description:
        "Layanan komprehensif untuk kesehatan reproduksi wanita, kehamilan, dan persalinan",
      heroImage: hero1,
      features: [
        "Konsultasi Kehamilan",
        "USG 2D, 3D, dan 4D",
        "Persalinan Normal",
        "Operasi Caesar",
        "Perawatan Kehamilan Risiko Tinggi",
        "Program Kehamilan",
        "Kontrasepsi dan KB",
        "Pemeriksaan Kesehatan Reproduksi",
      ],
      facilities: [
        "Ruang Bersalin Modern",
        "Ruang Operasi Steril",
        "Ruang Pemulihan Nyaman",
        "Alat USG Canggih",
        "Monitor Janin",
        "Inkubator Bayi",
      ],
      schedule: "Senin - Sabtu: 08.00 - 20.00 WIB, Minggu: 08.00 - 14.00 WIB",
      emergency: "Layanan IGD 24 Jam",
    },
    pediatrics: {
      title: "Dokter Anak",
      description:
        "Pelayanan kesehatan anak dari bayi baru lahir hingga remaja",
      heroImage: hero1,
      features: [
        "Pemeriksaan Tumbuh Kembang",
        "Imunisasi Lengkap",
        "Konsultasi Gizi Anak",
        "Penanganan Penyakit Anak",
        "Pemeriksaan Bayi Baru Lahir",
        "Perawatan Bayi Prematur",
        "Terapi Nebulizer",
        "Konsultasi Laktasi",
      ],
      facilities: [
        "Ruang Pemeriksaan Ramah Anak",
        "Ruang Imunisasi",
        "NICU (Neonatal Intensive Care Unit)",
        "Baby Incubator",
        "Phototherapy Unit",
        "Ruang Observasi Anak",
      ],
      schedule: "Senin - Sabtu: 08.00 - 20.00 WIB, Minggu: 08.00 - 14.00 WIB",
      emergency: "Layanan IGD Anak 24 Jam",
    },
    "internal-medicine": {
      title: "Dokter Penyakit Dalam",
      description: "Diagnosis dan pengobatan penyakit dalam untuk dewasa",
      heroImage: hero1,
      features: [
        "Pemeriksaan Kesehatan Umum",
        "Penanganan Diabetes",
        "Hipertensi",
        "Penyakit Jantung",
        "Gangguan Pencernaan",
        "Gangguan Ginjal",
        "Penyakit Paru",
        "Medical Check Up",
      ],
      facilities: [
        "Ruang Pemeriksaan Lengkap",
        "EKG (Elektrokardiogram)",
        "Spirometri",
        "Lab Klinik",
        "Ruang Observasi",
      ],
      schedule: "Senin - Jumat: 08.00 - 16.00 WIB, Sabtu: 08.00 - 12.00 WIB",
      emergency: "Konsultasi Emergency via IGD 24 Jam",
    },
    surgery: {
      title: "Dokter Bedah",
      description: "Layanan bedah umum dan operasi minor",
      heroImage: hero1,
      features: [
        "Operasi Caesar",
        "Operasi Hernia",
        "Operasi Tumor Jinak",
        "Operasi Minor",
        "Operasi Kista",
        "Circumcision (Sunat)",
        "Konsultasi Pra dan Pasca Operasi",
      ],
      facilities: [
        "Ruang Operasi Modern",
        "Peralatan Bedah Steril",
        "Ruang Pemulihan",
        "ICU",
        "Ruang Rawat Inap VIP",
      ],
      schedule: "Senin - Jumat: 09.00 - 15.00 WIB, By Appointment",
      emergency: "Operasi Darurat via IGD 24 Jam",
    },
    "baby-spa": {
      title: "Pelayanan Baby Spa",
      description: "Perawatan dan terapi relaksasi untuk bayi",
      heroImage: hero1,
      features: [
        "Baby Massage",
        "Baby Swim",
        "Baby Gym",
        "Stimulasi Bayi",
        "Hydrotherapy",
        "Aromatherapy untuk Bayi",
      ],
      facilities: [
        "Ruang Baby Spa Higienis",
        "Kolam Baby Spa",
        "Peralatan Terapi Bayi",
        "Ruang Tunggu Nyaman",
      ],
      schedule: "Senin - Minggu: 09.00 - 17.00 WIB, By Appointment",
      emergency: "Reservasi: (0752) 71234",
    },
    emergency: {
      title: "Pelayanan Gawat Darurat (IGD)",
      description:
        "Layanan darurat 24 jam untuk kondisi kegawatdaruratan ibu dan anak",
      heroImage: hero1,
      features: [
        "Penanganan Kegawatdaruratan Obstetri",
        "Kegawatdaruratan Anak",
        "Stabilisasi Pasien",
        "Rujukan Terkoordinasi",
        "Ambulance Siaga",
        "Tim Medis On Call 24 Jam",
      ],
      facilities: [
        "Ruang IGD Lengkap",
        "Ambulance Modern",
        "Peralatan Life Support",
        "Obat-obatan Emergency",
        "Ruang Observasi",
      ],
      schedule: "Buka 24 Jam Setiap Hari",
      emergency: "Hotline IGD: +62 123 456 7890",
    },
    inpatient: {
      title: "Pelayanan Rawat Inap",
      description: "Ruang rawat inap nyaman dengan berbagai kelas",
      heroImage: hero1,
      features: [
        "Ruang VIP",
        "Ruang Kelas I",
        "Ruang Kelas II",
        "Ruang Kelas III",
        "Suite Room",
        "Ruang Nifas",
        "Ruang Perinatologi",
      ],
      facilities: [
        "AC dan TV",
        "Kamar Mandi Dalam",
        "Tempat Tidur Pasien Elektrik",
        "Nurse Call System",
        "WiFi Gratis",
        "Dapur Mini (VIP)",
        "Sofa Bed Penunggu",
      ],
      schedule: "Kunjungan: 11.00 - 13.00 & 17.00 - 20.00 WIB",
      emergency: "Informasi Rawat Inap: (0752) 71234",
    },
    pharmacy: {
      title: "Pelayanan Farmasi",
      description: "Apotek dengan obat lengkap dan konsultasi farmasi",
      heroImage: hero1,
      features: [
        "Obat Resep",
        "Obat Bebas",
        "Obat Generik",
        "Obat Branded",
        "Vitamin dan Suplemen",
        "Alat Kesehatan",
        "Konsultasi Farmasi",
        "Home Delivery (area tertentu)",
      ],
      facilities: [
        "Apotek Modern",
        "Cold Chain Storage",
        "Sistem Informasi Farmasi",
        "Ruang Konsultasi",
      ],
      schedule: "Senin - Minggu: 07.00 - 21.00 WIB",
      emergency: "Apotek IGD Buka 24 Jam",
    },
    laboratory: {
      title: "Pelayanan Laboratorium",
      description: "Pemeriksaan laboratorium lengkap dan akurat",
      heroImage: hero1,
      features: [
        "Hematologi",
        "Kimia Klinik",
        "Imunologi",
        "Mikrobiologi",
        "Urinalisis",
        "Pemeriksaan Kehamilan",
        "Screening Penyakit",
        "Medical Check Up Paket",
      ],
      facilities: [
        "Laboratorium Terakreditasi",
        "Alat Modern",
        "Phlebotomy Room",
        "Quality Control Ketat",
      ],
      schedule: "Senin - Sabtu: 07.00 - 20.00 WIB, Minggu: 07.00 - 12.00 WIB",
      emergency: "Lab IGD Buka 24 Jam",
    },
    ambulance: {
      title: "Ambulance",
      description: "Layanan ambulance siaga 24 jam",
      heroImage: hero1,
      features: [
        "Ambulance Modern",
        "Peralatan Life Support",
        "Tenaga Medis Terlatih",
        "Oksigen",
        "Alat Resusitasi",
        "Monitor Vital Sign",
        "Layanan Antar Jemput Pasien",
      ],
      facilities: [
        "Ambulance Type A",
        "Ambulance Type B",
        "GPS Tracking",
        "Komunikasi Radio",
      ],
      schedule: "Siaga 24 Jam Setiap Hari",
      emergency: "Call Center Ambulance: +62 123 456 7890",
    },
  };

  const service = servicesData[slug] || servicesData["obstetrics"];

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>{service.title} - RSIA Sayang Ibu Batusangkar</title>
        <meta name="description" content={service.description} />
        <meta
          name="keywords"
          content={`${service.title}, rsia sayang ibu, batusangkar, tanah datar`}
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "50vh", md: "60vh" },
          backgroundImage: `linear-gradient(135deg, rgba(76, 175, 80, 0.9) 0%, rgba(27, 94, 32, 0.8) 100%), url(${service.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 3 }}>
            <Box
              component="img"
              src={logo}
              alt="RSIA Sayang Ibu Logo"
              sx={{
                width: { xs: 60, md: 100 },
                height: { xs: 60, md: 100 },
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
              }}
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3.5rem" },
              mb: 2,
              textShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              maxWidth: 700,
              mx: "auto",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {service.description}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Features */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E0E0E0",
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
                Layanan yang Tersedia
              </Typography>
              <List>
                {service.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: "#4CAF50" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        fontSize: "1.1rem",
                        color: "#333",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Facilities */}
            <Paper
              elevation={0}
              sx={{
                mb: 4,
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E0E0E0",
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
                Fasilitas
              </Typography>
              <Grid container spacing={2}>
                {service.facilities.map((facility, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#E8F5E9",
                        boxShadow: "none",
                        borderRadius: 2,
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalHospitalIcon
                            sx={{ color: "#4CAF50", mr: 1.5, fontSize: 24 }}
                          />
                          <Typography variant="body1" sx={{ color: "#2E7D32" }}>
                            {facility}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Schedule Card */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTimeIcon
                    sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", fontWeight: 700 }}
                  >
                    Jadwal Layanan
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ color: "#333", mb: 2 }}>
                  {service.schedule}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#FFF3E0",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #FFE0B2",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#E65100", fontWeight: 600 }}
                  >
                    {service.emergency}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
                color: "#FFF",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PhoneIcon sx={{ color: "#FFF", mr: 1, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Hubungi Kami
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.3)" }} />
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Telepon: (0752) 71234
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  WhatsApp: +62 812-3456-7890
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to="/contact"
                  fullWidth
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

            {/* Info Card */}
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#2E7D32", fontWeight: 700, mb: 2 }}
                >
                  Informasi Penting
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ p: 0 }}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary="Bawa Kartu Identitas"
                      secondary="KTP/SIM/Passport"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary="Kartu BPJS/Asuransi"
                      secondary="Jika ada"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary="Datang 15 Menit Lebih Awal"
                      secondary="Untuk registrasi"
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            mt: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
            textAlign: "center",
            color: "#FFF",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Butuh Konsultasi Lebih Lanjut?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Tim medis kami siap membantu Anda. Hubungi kami atau buat janji temu
            sekarang.
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
              sx={{
                backgroundColor: "#FFF",
                color: "#4CAF50",
                borderRadius: 30,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            >
              Hubungi Kami
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/doctors"
              sx={{
                borderColor: "#FFF",
                color: "#FFF",
                borderRadius: 30,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#FFF",
                },
              }}
            >
              Lihat Dokter
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ServiceDetailPage;
