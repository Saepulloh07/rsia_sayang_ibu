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
          py: { xs: 8, md: 12 },
          bgcolor: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#2e7d32" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  if (articles.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#f8f9fa" }}>
      <Helmet>
        <meta
          name="keywords"
          content="artikel kesehatan, tips ibu dan anak, rsia sayang ibu"
        />
      </Helmet>

      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            color: "#1b5e20",
            fontWeight: 700,
            fontSize: { xs: "2.2rem", md: "3.2rem" },
          }}
        >
          Artikel Kesehatan Terbaru
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{
            mb: { xs: 6, md: 8 },
            color: "#555",
            maxWidth: 720,
            mx: "auto",
            fontSize: "1.1rem",
          }}
        >
          Dapatkan informasi terpercaya seputar kesehatan ibu hamil, menyusui,
          dan tumbuh kembang anak dari tim medis kami.
        </Typography>

        {/* Grid dengan teknik 100% rata tinggi di desktop */}
        <Grid
          container
          spacing={4}
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "repeat(3, 1fr)" },
            gap: { md: "2rem" },
          }}
        >
          {articles.map((article) => (
            <Grid
              item
              xs={12}
              md={4}
              key={article.id}
              sx={{
                height: { md: "100%" },
                display: "flex",
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-12px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.16)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={
                    article.image ||
                    "https://via.placeholder.com/400x220?text=Artikel+Kesehatan"
                  }
                  alt={article.title}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Chip
                    label={article.category || "Kesehatan"}
                    size="small"
                    sx={{
                      mb: 2,
                      bgcolor: "#e8f5e9",
                      color: "#2e7d32",
                      fontWeight: 600,
                      alignSelf: "flex-start",
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#1b5e20",
                      mb: 1.5,
                      lineHeight: 1.3,
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
                      flexGrow: 1,
                      mb: 2,
                      lineHeight: 1.7,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.content?.replace(/<[^>]*>/g, "").substring(0, 140)}
                    ...
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 3,
                      fontSize: "0.85rem",
                      color: "#666",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 16 }} />
                      <span>{formatDate(article.date)}</span>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <VisibilityIcon sx={{ fontSize: 16 }} />
                      <span>{article.views || 0} views</span>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PersonIcon sx={{ fontSize: 16 }} />
                      <span>{article.author || "Tim Medis"}</span>
                    </Box>
                  </Box>

                  {/* Tombol selalu di bawah */}
                  <Button
                    component={Link}
                    to={`/articles/${article.id}`}
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: "auto",
                      bgcolor: "#2e7d32",
                      "&:hover": { bgcolor: "#1b5e20" },
                      borderRadius: 2,
                      py: 1.4,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tombol Lihat Semua */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Button
            component={Link}
            to="/articles"
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#2e7d32",
              color: "#2e7d32",
              borderRadius: 30,
              px: 6,
              py: 1.6,
              fontWeight: 600,
              fontSize: "1.1rem",
              "&:hover": {
                bgcolor: "#2e7d32",
                color: "#fff",
                borderColor: "#2e7d32",
              },
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
