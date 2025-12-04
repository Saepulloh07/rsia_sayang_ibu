// src/components/ArticleDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../assets/logo.png";
import { articleService } from "../utils/api";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await articleService.getById(id);
      if (response.data.success) {
        setArticle(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      setError("Artikel tidak ditemukan atau sedang dalam perbaikan.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading & Error States (tetap sama)
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress size={70} thickness={5} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 12 }}>
        <Container maxWidth="sm">
          <Alert
            severity="warning"
            sx={{
              borderRadius: 3,
              fontSize: "1.1rem",
              py: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
            action={
              <Button
                variant="outlined"
                color="success"
                onClick={() => navigate("/articles")}
                sx={{ borderRadius: 20, px: 4 }}
              >
                Kembali ke Artikel
              </Button>
            }
          >
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content={article.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta
          name="keywords"
          content={`${article.category}, kesehatan ibu dan anak, rsia sayang ibu, artikel kesehatan`}
        />
      </Helmet>

      {/* HERO SECTION – Hanya gambar + logo + tombol kembali */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "40vh", md: "55vh" },
          minHeight: 420,
          backgroundImage: `linear-gradient(135deg, rgba(34, 139, 34, 0.92) 0%, rgba(76, 175, 80, 0.85) 100%), url(${
            article.image || "https://via.placeholder.com/1600x900"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Tombol Kembali */}
        <IconButton
          component={Link}
          to="/articles"
          sx={{
            position: "absolute",
            top: { xs: 16, md: 32 },
            left: { xs: 16, md: 32 },
            bgcolor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
            zIndex: 10,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Logo Tengah */}
        <Box
          sx={{
            width: { xs: 100, sm: 140, md: 180 },
            height: { xs: 100, sm: 140, md: 180 },
            borderRadius: "50%",
            bgcolor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <img
            src={logo}
            alt="RSIA Sayang Ibu"
            style={{ width: "62%", height: "62%", objectFit: "contain" }}
          />
        </Box>
      </Box>

      {/* MAIN CONTENT – Semua teks (kategori, judul, meta, konten) di dalam kotak artikel */}
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 6, md: 10 },
          mt: { xs: -6, md: -10 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            bgcolor: "#fff",
            boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
            border: "1px solid #e8f5e9",
          }}
        >
          <Box sx={{ p: { xs: 4, md: 7 } }}>
            {/* Kategori */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Chip
                label={article.category.toUpperCase()}
                sx={{
                  bgcolor: "#4CAF50",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: { xs: "0.95rem", md: "1.15rem" },
                  height: 44,
                  px: 3,
                  borderRadius: 30,
                  boxShadow: "0 6px 16px rgba(76,175,80,0.4)",
                }}
              />
            </Box>

            {/* Judul Artikel */}
            <Typography
              variant="h1"
              align="center"
              sx={{
                fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#1B5E20",
                mb: 5,
                px: { xs: 2, md: 0 },
              }}
            >
              {article.title}
            </Typography>

            {/* Meta Info */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: { xs: 3, md: 5 },
                mb: 6,
                pb: 4,
                borderBottom: "2px dashed #e8f5e9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "#4CAF50", width: 40, height: 40 }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Penulis
                  </Typography>
                  <Typography variant="body1" fontWeight={700} color="#1B5E20">
                    {article.author}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon sx={{ color: "#666" }} />
                <Typography variant="body1" color="text.secondary">
                  {formatDate(article.date)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <VisibilityIcon sx={{ color: "#666" }} />
                <Typography variant="body1" color="text.secondary">
                  {article.views || 0} kali dibaca
                </Typography>
              </Box>
            </Box>

            {/* Featured Image (jika ada) */}
            {article.image && (
              <Box
                sx={{
                  my: 7,
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            )}

            {/* Konten Artikel */}
            <Box
              sx={{
                fontSize: "1.18rem",
                lineHeight: 1.95,
                color: "#2e2e2e",
                "& p": { mb: 3.5 },
                "& h2": {
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "#1B5E20",
                  mt: 7,
                  mb: 3,
                },
                "& h3": {
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#2E7D32",
                  mt: 5,
                  mb: 2.5,
                },
                "& ul, & ol": { pl: 5, mb: 4 },
                "& li": { mb: 2 },
                "& blockquote": {
                  borderLeft: "5px solid #4CAF50",
                  pl: 4,
                  py: 3,
                  my: 5,
                  fontStyle: "italic",
                  bgcolor: "#f1f8e9",
                  borderRadius: 2,
                },
                "& img": {
                  borderRadius: 4,
                  my: 5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  maxWidth: "100%",
                  height: "auto",
                },
                "& a": {
                  color: "#4CAF50",
                  fontWeight: 600,
                  textDecoration: "underline",
                },
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <Divider sx={{ my: 10, borderColor: "#e8f5e9" }} />

            {/* Bottom CTA */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700} color="#1B5E20" mb={4}>
                Temukan informasi kesehatan terbaru lainnya
              </Typography>
              <Button
                component={Link}
                to="/articles"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#4CAF50",
                  borderRadius: 30,
                  px: 7,
                  py: 2,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  boxShadow: "0 10px 30px rgba(76,175,80,0.35)",
                  "&:hover": {
                    bgcolor: "#43A047",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                Lihat Semua Artikel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ArticleDetailPage;
