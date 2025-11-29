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
} from "@mui/material";
import { Helmet } from "react-helmet";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import logo from "../assets/logo.png";
import { jobService, uploadService } from "../utils/api";

const CareersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cvFile: null,
    cvUrl: "",
  });

  const benefits = [
    {
      title: "Gaji Kompetitif",
      description: "Sistem remunerasi yang menarik sesuai kompetensi",
      icon: "💰",
    },
    {
      title: "Asuransi Kesehatan",
      description: "BPJS Kesehatan dan asuransi swasta untuk karyawan",
      icon: "🏥",
    },
    {
      title: "Pengembangan Karir",
      description: "Program pelatihan dan pendidikan berkelanjutan",
      icon: "📚",
    },
    {
      title: "Lingkungan Islami",
      description: "Budaya kerja yang Islami dan profesional",
      icon: "🕌",
    },
    {
      title: "Cuti Tahunan",
      description: "Cuti tahunan dan cuti besar sesuai ketentuan",
      icon: "🖍️",
    },
    {
      title: "Bonus Kinerja",
      description: "Insentif berdasarkan pencapaian kinerja",
      icon: "🎁",
    },
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobService.getAll();
      if (response.data.success) {
        // Filter only active jobs for public view
        const activeJobs = response.data.data.filter(
          (job) => job.status === "Active"
        );
        setJobs(activeJobs);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Gagal memuat data lowongan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
    setSubmitSuccess(false);
    setSubmitError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      cvFile: null,
      cvUrl: "",
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("Ukuran file maksimal 5MB");
        return;
      }

      try {
        setUploading(true);
        setSubmitError("");
        const response = await uploadService.uploadFile(file);

        if (response.data.success) {
          setFormData({
            ...formData,
            cvFile: file,
            cvUrl: response.data.data.url,
          });
        }
      } catch (err) {
        console.error("Error uploading file:", err);
        setSubmitError("Gagal mengupload file. Silakan coba lagi.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cvUrl) {
      setSubmitError("Mohon upload CV Anda terlebih dahulu");
      return;
    }

    try {
      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        jobId: selectedJob.id,
        cvUrl: formData.cvUrl,
      };

      const response = await jobService.apply(applicationData);

      if (response.data.success) {
        setSubmitSuccess(true);
        setSubmitError("");
        setTimeout(() => {
          handleCloseDialog();
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      setSubmitError(
        err.response?.data?.error ||
          "Gagal mengirim lamaran. Silakan coba lagi."
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#FAFAFA",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#FAFAFA", minHeight: "100vh" }}>
      <Helmet>
        <title>Karir - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Bergabunglah dengan tim profesional RSIA Sayang Ibu Batusangkar. Temukan peluang karir di bidang kesehatan ibu dan anak."
        />
        <meta
          name="keywords"
          content="lowongan kerja rumah sakit, karir rsia sayang ibu, dokter kandungan, bidan, perawat, apoteker"
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          backgroundImage: `linear-gradient(135deg, rgba(76, 175, 80, 0.9) 0%, rgba(27, 94, 32, 0.8) 100%), url('https://images.unsplash.com/photo-1582560475093-ba66accbc424?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              animation: "fadeInUp 1s ease-out",
              "@keyframes fadeInUp": {
                "0%": { opacity: 0, transform: "translateY(50px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Box
                component="img"
                src={logo}
                alt="RSIA Sayang Ibu Logo"
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                }}
              />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 2,
                textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              Bergabung dengan Kami
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                maxWidth: 700,
                mx: "auto",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Wujudkan karir impian Anda di bidang kesehatan ibu dan anak
              bersama RSIA Sayang Ibu
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Benefits Section */}
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
            Keuntungan Bekerja Bersama Kami
          </Typography>

          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {benefit.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "#2E7D32", fontWeight: 600, mb: 1 }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Job Openings Section */}
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
          Lowongan Tersedia
        </Typography>

        {jobs.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "#F5F5F5",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Saat ini belum ada lowongan yang tersedia.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Silakan cek kembali nanti untuk informasi lowongan terbaru.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {jobs.map((job, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <WorkIcon
                        sx={{ fontSize: 40, color: "#4CAF50", mr: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{ color: "#2E7D32", fontWeight: 700, mb: 1 }}
                        >
                          {job.title}
                        </Typography>
                        <Chip
                          label={job.department}
                          size="small"
                          sx={{
                            backgroundColor: "#E8F5E9",
                            color: "#2E7D32",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 20, color: "#666", mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon
                          sx={{ fontSize: 20, color: "#666", mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {job.type}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {job.description}
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleOpenDialog(job)}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Lamar Sekarang
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Application Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ backgroundColor: "#4CAF50", color: "#FFF" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Lamar: {selectedJob?.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {submitSuccess ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              Lamaran Anda berhasil dikirim! Tim HR kami akan menghubungi Anda
              segera.
            </Alert>
          ) : (
            <>
              {submitError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {submitError}
                </Alert>
              )}

              {selectedJob && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E7D32", mb: 2, fontWeight: 600 }}
                  >
                    Deskripsi Pekerjaan:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, whiteSpace: "pre-line" }}
                  >
                    {selectedJob.description}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Nomor Telepon"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AttachFileIcon />}
                    disabled={uploading}
                    fullWidth
                  >
                    {uploading
                      ? "Mengupload..."
                      : formData.cvFile
                      ? formData.cvFile.name
                      : "Upload CV (PDF/DOC, Max 5MB)"}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.cvUrl && (
                    <Typography
                      variant="caption"
                      color="success.main"
                      sx={{ mt: 1, display: "block" }}
                    >
                      ✓ CV berhasil diupload
                    </Typography>
                  )}
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Tutup
          </Button>
          {!submitSuccess && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              disabled={uploading || !formData.cvUrl}
            >
              Kirim Lamaran
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CareersPage;
