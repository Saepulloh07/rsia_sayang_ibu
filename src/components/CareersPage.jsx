import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
  Fade,
} from "@mui/material";
import { Helmet } from "react-helmet";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import logo from "../assets/logo.png";
import { jobService } from "../utils/api";

const CareersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cvFile: null,
  });

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await jobService.getAll();
        if (res.data.success) {
          const activeJobs = res.data.data.filter(
            (job) => job.status === "Active"
          );
          setJobs(activeJobs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
    setSubmitSuccess(false);
    setSubmitError("");
    setFormData({ name: "", email: "", phone: "", cvFile: null });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setSubmitError("Ukuran file maksimal 10MB");
      return;
    }
    setFormData({ ...formData, cvFile: file });
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cvFile || !formData.name || !formData.email) {
      setSubmitError("Pastikan nama, email, dan CV sudah diisi");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("email", formData.email.trim());
    data.append("phone", formData.phone.trim());
    data.append("jobId", selectedJob.id);
    data.append("jobTitle", selectedJob.title);
    data.append("cv", formData.cvFile);

    try {
      setUploading(true);
      setSubmitError("");
      const response = await fetch("http://localhost:3001/api/applications", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => handleCloseDialog(), 2500);
      } else {
        setSubmitError(result.error || "Gagal mengirim lamaran");
      }
    } catch (err) {
      setSubmitError("Koneksi gagal. Pastikan server berjalan.");
    } finally {
      setUploading(false);
    }
  };

  // Konten "Mengapa RSIA Sayang Ibu?"
  const whyJoin = [
    {
      icon: <HealthAndSafetyIcon sx={{ fontSize: 52 }} />,
      title: "Fokus pada Kesehatan Ibu & Anak",
      desc: "Menjadi bagian dari rumah sakit spesialis yang berdedikasi penuh untuk ibu dan bayi.",
    },
    {
      icon: <PeopleAltIcon sx={{ fontSize: 52 }} />,
      title: "Tim Profesional & Kolaboratif",
      desc: "Bekerja bersama tenaga medis berpengalaman dalam suasana saling mendukung dan menghargai.",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 52 }} />,
      title: "Pengembangan Kompetensi Berkelanjutan",
      desc: "Pelatihan rutin, sertifikasi, dan kesempatan belajar bersama para ahli terbaik di bidangnya.",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f9fafb",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#2e7d32" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Helmet>
        <title>Karir - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Bergabunglah dengan tim profesional RSIA Sayang Ibu Batusangkar."
        />
      </Helmet>

      {/* Hero Section + Logo dengan Background Lingkaran Putih */}
      {/* Hero Section + Logo dengan Background Lingkaran Putih */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "65vh", md: "80vh" },
          // Ubah background jadi hijau solid + gradient hijau elegan
          backgroundImage: `linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)`,
          // Jika ingin tetap pakai gambar tapi dengan overlay hijau (opsional, bisa dihapus)
          // backgroundImage: `linear-gradient(rgba(27, 94, 32, 0.85), rgba(46, 125, 50, 0.9)), url('https://images.unsplash.com/photo-1576091160399-2a9b7e9df9c8?auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: "relative", display: "inline-block", mb: 4 }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 70, md: 150 },
                height: { xs: 70, md: 150 },
                bgcolor: "rgba(255,255,255,0.97)",
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src={logo}
              alt="RSIA Sayang Ibu"
              sx={{
                width: { xs: 50, md: 100 },
                position: "relative",
                zIndex: 2,
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "5.2rem" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Bergabung Bersama Kami
          </Typography>
          <Typography
            variant="h5"
            sx={{ maxWidth: 860, mx: "auto", fontWeight: 300, opacity: 0.95 }}
          >
            Jadilah bagian dari tim yang berdedikasi memberikan pelayanan
            terbaik bagi ibu dan anak di Sumatera Barat.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Mengapa RSIA Sayang Ibu? – Rata Tinggi di Desktop */}
        {/* Mengapa RSIA Sayang Ibu? – 100% RATA TINGGI di Desktop (SOLUSI TERBAIK) */}
        <Box sx={{ mb: { xs: 12, md: 16 } }}>
          <Typography
            variant="h3"
            align="center"
            sx={{ color: "#1b5e20", fontWeight: 700, mb: 9 }}
          >
            Mengapa RSIA Sayang Ibu?
          </Typography>

          {/* Gunakan Grid dengan display: grid agar tinggi otomatis sama */}
          <Grid
            container
            spacing={{ xs: 4, md: 5 }}
            justifyContent="center"
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: { md: "repeat(3, 1fr)" },
              gap: { md: "2.5rem" },
            }}
          >
            {whyJoin.map((item, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{
                  // Ini yang membuat tinggi 100% sama di desktop
                  height: { md: "100%" },
                  maxWidth: { md: "100%" },
                }}
              >
                <Fade in timeout={600 + index * 250}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 4,
                      p: { xs: 4, md: 6 },
                      height: "100%", // 100% dari parent grid
                      minHeight: { xs: "auto", md: 400 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-16px)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: "#4caf50",
                        mb: 4,
                        p: 3.5,
                        bgcolor: "rgba(76, 175, 80, 0.15)",
                        borderRadius: "50%",
                        boxShadow: "0 8px 20px rgba(76, 175, 80, 0.2)",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#1b5e20",
                        mb: 3,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.75,
                        fontSize: "1.02rem",
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Lowongan Pekerjaan */}
        <Typography
          variant="h3"
          align="center"
          sx={{ color: "#1b5e20", fontWeight: 700, mb: 7 }}
        >
          Lowongan Pekerjaan Tersedia
        </Typography>

        {jobs.length === 0 ? (
          <Paper
            elevation={3}
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Saat ini belum ada lowongan yang tersedia.
              <br />
              Silakan cek kembali secara berkala.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {jobs.map((job) => (
              <Grid item xs={12} md={6} lg={4} key={job.id}>
                <Fade in timeout={300}>
                  <Card
                    elevation={4}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      overflow: "hidden",
                      transition: "0.4s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <WorkIcon
                          sx={{ fontSize: 38, color: "#4caf50", mr: 2 }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#1b5e20" }}
                          >
                            {job.title}
                          </Typography>
                          <Chip
                            label={job.department}
                            size="small"
                            sx={{ mt: 1, bgcolor: "#e8f5e9", color: "#2e7d32" }}
                          />
                        </Box>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <LocationOnIcon
                            sx={{ fontSize: 19, mr: 1, color: "#666" }}
                          />{" "}
                          {job.location}
                        </Typography>
                        <Typography
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <AccessTimeIcon
                            sx={{ fontSize: 19, mr: 1, color: "#666" }}
                          />{" "}
                          {job.type}
                        </Typography>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={() => handleOpenDialog(job)}
                        sx={{
                          bgcolor: "#2e7d32",
                          "&:hover": { bgcolor: "#1b5e20" },
                          py: 1.6,
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        Lamar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog Lamaran */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ bgcolor: "#2e7d32", color: "#fff", py: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Lamar Posisi: {selectedJob?.title}
          </Typography>
        </DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 4 }}>
            {submitSuccess ? (
              <Alert severity="success">
                Lamaran berhasil dikirim! Kami akan segera menghubungi Anda.
              </Alert>
            ) : (
              <>
                {submitError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {submitError}
                  </Alert>
                )}

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ color: "#1b5e20", mb: 2 }}
                >
                  Deskripsi Pekerjaan
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.8, whiteSpace: "pre-line" }}
                >
                  {selectedJob?.description}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Lengkap"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="No. Telepon / WhatsApp"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AttachFileIcon />}
                      fullWidth
                      sx={{ py: 2 }}
                    >
                      {formData.cvFile
                        ? `Berhasil: ${formData.cvFile.name}`
                        : "Upload CV (PDF/DOCX, max 10MB)"}
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {formData.cvFile && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        sx={{ ml: 2, mt: 1 }}
                      >
                        {(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 3, bgcolor: "#f5f5f5", gap: 2 }}>
            <Button onClick={handleCloseDialog} size="large">
              Batal
            </Button>
            {!submitSuccess && (
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  uploading ||
                  !formData.cvFile ||
                  !formData.name ||
                  !formData.email
                }
                startIcon={
                  uploading ? <CircularProgress size={20} /> : <SendIcon />
                }
                sx={{
                  bgcolor: "#2e7d32",
                  "&:hover": { bgcolor: "#1b5e20" },
                  px: 4,
                }}
              >
                {uploading ? "Mengirim..." : "Kirim Lamaran"}
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CareersPage;
