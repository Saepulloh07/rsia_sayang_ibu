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
} from "@mui/material";
import { Helmet } from "react-helmet";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
      setError("Artikel tidak ditemukan.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#F8F9FA",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh", py: 10 }}>
        <Container maxWidth="md">
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/articles")}
              >
                Kembali
              </Button>
            }
          >
            {error || "Artikel tidak ditemukan"}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Helmet>
        <title>{article.title} - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content={article.content.replace(/<[^>]*>/g, "").substring(0, 160)}
        />
        <meta
          name="keywords"
          content={`${article.category}, kesehatan, rsia sayang ibu`}
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "40vh", md: "50vh" },
          backgroundImage: `linear-gradient(135deg, rgba(76, 175, 80, 0.85) 0%, rgba(27, 94, 32, 0.75) 100%), url(${
            article.image || "https://via.placeholder.com/1200x600?text=Article"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            to="/articles"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "#FFF",
              mb: 3,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Kembali ke Artikel
          </Button>
          <Box
            component="img"
            src={logo}
            alt="RSIA Sayang Ibu Logo"
            sx={{
              width: { xs: 50, md: 70 },
              height: { xs: 50, md: 70 },
              mb: 2,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
          <Chip
            label={article.category}
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#4CAF50",
              fontWeight: 600,
              mb: 2,
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: "#2E7D32",
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </Typography>

          {/* Meta Information */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#4CAF50" }}>
                <PersonIcon sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {article.author}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 18, color: "#666" }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(article.date)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <VisibilityIcon sx={{ fontSize: 18, color: "#666" }} />
              <Typography variant="body2" color="text.secondary">
                {article.views} views
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Featured Image */}
          {article.image && (
            <Box
              sx={{
                mb: 4,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          )}

          {/* Content */}
          <Box
            sx={{
              "& p": {
                mb: 2,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                color: "#333",
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                color: "#2E7D32",
                fontWeight: 600,
                mt: 3,
                mb: 2,
              },
              "& ul, & ol": {
                ml: 3,
                mb: 2,
              },
              "& li": {
                mb: 1,
                lineHeight: 1.8,
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                my: 2,
              },
              "& a": {
                color: "#4CAF50",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Divider sx={{ my: 4 }} />

          {/* Back Button */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              to="/articles"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 30,
                px: 5,
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Lihat Artikel Lainnya
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default ArticleDetailPage;
