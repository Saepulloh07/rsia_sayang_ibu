// src/components/ArticlesPage.jsx
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/logo.png";
import { articleService } from "../utils/api";

const ArticlesPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const articlesPerPage = 9;

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getAll({
        status: "Published",
        page: page,
        limit: articlesPerPage,
      });

      if (response.data.success) {
        setArticles(response.data.data);
        setPagination(response.data.pagination);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Gagal memuat artikel. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(articles.map((article) => article.category))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? article.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
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

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      <Helmet>
        <title>Artikel Kesehatan - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Baca artikel kesehatan terbaru seputar ibu dan anak dari RSIA Sayang Ibu Batusangkar"
        />
        <meta
          name="keywords"
          content="artikel kesehatan, tips kesehatan ibu, kesehatan anak, rsia sayang ibu"
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "50vh", md: "60vh" },
          backgroundImage: `linear-gradient(135deg, rgba(76, 175, 80, 0.9) 0%, rgba(27, 94, 32, 0.8) 100%), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
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
            Artikel Kesehatan
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
            Informasi dan tips kesehatan ibu dan anak dari para ahli kami
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Search and Filter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: 6,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#4CAF50", mr: 1 }} />,
            }}
          />
          <FormControl sx={{ minWidth: { xs: "100%", md: 200 } }}>
            <InputLabel>Kategori</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Kategori"
              sx={{ backgroundColor: "#FFFFFF" }}
            >
              <MenuItem value="">Semua Kategori</MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
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
                      {article.content
                        .replace(/<[^>]*>/g, "")
                        .substring(0, 150)}
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
                        <CalendarTodayIcon
                          sx={{ fontSize: 16, color: "#666" }}
                        />
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
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  color: "#555",
                  py: 4,
                }}
              >
                Tidak ada artikel yang sesuai dengan kriteria pencarian.
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pagination.totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ArticlesPage;
