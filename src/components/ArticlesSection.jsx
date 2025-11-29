// src/components/ArticlesSection.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { articleService } from "../utils/api";

const ArticlesSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getAll({
        status: "Published",
        page: 1,
        limit: 3,
      });

      if (response.data.success) {
        setArticles(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Gagal memuat artikel. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: "#F8F9FA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#4CAF50" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#F8F9FA" }}>
        <Container maxWidth="lg">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#F8F9FA" }}>
      <Helmet>
        <meta
          name="keywords"
          content="artikel kesehatan, tips kesehatan ibu dan anak, berita rsia sayang ibu"
        />
      </Helmet>
      <Container maxWidth="lg">
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
          Artikel Kesehatan Terbaru
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            color: "#555",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          Baca artikel terbaru seputar kesehatan ibu dan anak dari para ahli
          kami
        </Typography>

        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} md={4} key={article.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    article.image ||
                    "https://via.placeholder.com/400x200?text=Article"
                  }
                  alt={article.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      mb: 2,
                      backgroundColor: "#E8F5E9",
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#333",
                      fontWeight: 600,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.content.replace(/<[^>]*>/g, "").substring(0, 150)}
                    ...
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.date)}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <VisibilityIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="caption" color="text.secondary">
                        {article.views} views
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PersonIcon sx={{ fontSize: 16, color: "#666" }} />
                      <Typography variant="caption" color="text.secondary">
                        {article.author}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    component={Link}
                    to={`/articles/${article.id}`}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            component={Link}
            to="/articles"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 30,
              px: 6,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Lihat Semua Artikel
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticlesSection;
