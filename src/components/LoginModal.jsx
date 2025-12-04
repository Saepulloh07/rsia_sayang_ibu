// src/components/LoginModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import TutorialSidebar from "./TutorialSidebar";
import TutorialMobilePopup from "./TutorialMobilePopup";

const LoginModal = ({ open, onClose, onLoginSuccess }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ phone: "", name: "" });
  const [error, setError] = useState("");
  const [showTutorial, setShowTutorial] = useState(true);
  const [showMobileTutorial, setShowMobileTutorial] = useState(false);

  // Reset tutorial saat modal dibuka
  useEffect(() => {
    if (open) {
      const hasSeenTutorial = localStorage.getItem("tutorial_login_seen");
      if (!hasSeenTutorial) {
        setShowTutorial(true);
        if (isMobile) {
          setShowMobileTutorial(true);
        }
      } else {
        setShowTutorial(false);
        setShowMobileTutorial(false);
      }
    }
  }, [open, isMobile]);

  const handleGoogleLogin = () => {
    login({ email: "user@google.com", name: "Google User" });
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || !/^\d{10,13}$/.test(formData.phone)) {
      setError("Masukkan nomor telepon yang valid (10-13 digit).");
      return;
    }
    if (!isLogin && !formData.name) {
      setError("Masukkan nama lengkap untuk pendaftaran.");
      return;
    }
    setError("");
    login({
      email: `phone_${formData.phone}@example.com`,
      name: formData.name || "Phone User",
    });
    onClose();
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleSkipTutorial = () => {
    localStorage.setItem("tutorial_login_seen", "true");
    setShowTutorial(false);
    setShowMobileTutorial(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Mobile Tutorial Popup */}
      {isMobile && (
        <TutorialMobilePopup
          open={showMobileTutorial}
          type="login"
          onClose={handleSkipTutorial}
        />
      )}

      <Dialog open={open} onClose={onClose} fullScreen>
        {/* Tombol Close */}
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
          <IconButton onClick={onClose} sx={{ color: "#4CAF50" }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            height: "100vh",
          }}
        >
          {/* Kiri: Tutorial Sidebar (Desktop only) */}
          {!isMobile && showTutorial && (
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                borderRight: "1px solid rgba(76, 175, 80, 0.2)",
                overflowY: "auto",
              }}
            >
              <TutorialSidebar type="login" onSkip={handleSkipTutorial} />
            </Box>
          )}

          {/* Kanan: Form */}
          <Box
            sx={{
              flex: showTutorial && !isMobile ? 1.2 : 1,
              p: { xs: 3, md: 5 },
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#4CAF50",
                fontWeight: 600,
                textAlign: "center",
                mb: 3,
              }}
            >
              {isLogin ? "Masuk ke Akun Anda" : "Daftar Akun Baru"}
            </Typography>
            <DialogContent sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
              <Box component="form" onSubmit={handlePhoneSubmit} sx={{ mt: 2 }}>
                <Button
                  onClick={handleGoogleLogin}
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    py: 1.5,
                    mb: 3,
                    borderColor: "#E0E0E0",
                    color: "#333",
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#F5F5F5" },
                  }}
                >
                  Masuk dengan Google
                </Button>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "#666", mb: 2 }}
                >
                  atau
                </Typography>
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    margin="normal"
                    required
                    variant="outlined"
                  />
                )}
                <TextField
                  fullWidth
                  label="Nomor Telepon"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  margin="normal"
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PhoneIcon sx={{ color: "#4CAF50", mr: 1 }} />
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                    {error}
                  </Typography>
                )}
                <Button
                  onClick={() => setIsLogin(!isLogin)}
                  variant="text"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none", fontWeight: 500 }}
                >
                  {isLogin
                    ? "Belum punya akun? Daftar sekarang"
                    : "Sudah punya akun? Masuk"}
                </Button>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
              <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
                Batal
              </Button>
              <Button
                type="submit"
                onClick={handlePhoneSubmit}
                variant="contained"
                color="primary"
              >
                {isLogin ? "Masuk" : "Daftar"}
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default LoginModal;
