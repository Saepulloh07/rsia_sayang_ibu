// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Hijau tepercaya
    },
    secondary: {
      main: "#E91E63", // Pink lembut untuk maternitas
    },
    background: {
      default: "#FAFAFA",
    },
    text: {
      primary: "#212121", // Kontras tinggi untuk aksesibilitas
      secondary: "#757575",
      white: "#ffffffff",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
