// src/components/AppointmentModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.png";
import RegistrationForm from "./RegistrationForm";
import AppointmentForm from "./AppointmentForm";
import BookingChecker from "./BookingChecker";

const AppointmentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();

  const [view, setView] = useState(user ? "appointment" : "register");

  const handleRegistrationSuccess = () => {
    setView("appointment");
  };

  const handleSwitchToLogin = () => {
    // Implementasi switch ke login jika diperlukan
    onClose();
  };

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="Pendaftaran pasien rsia sayang ibu, appointment rumah sakit batusangkar, poliklinik maternitas tanah datar, layanan kesehatan ibu anak online"
        />
      </Helmet>
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
          {/* Kiri: Banner */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #4CAF50, #81C784)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                p: 4,
              }}
            >
              <Box
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: 100, height: 100 }}
                />
              </Box>

              <Typography variant="h4" fontWeight={700}>
                RSIA Sayang Ibu
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, maxWidth: 400, textAlign: "center" }}
              >
                Kami hadir untuk memberikan pelayanan kesehatan ibu & anak
                dengan penuh kasih.
              </Typography>
            </Box>
          )}

          {/* Kanan: Konten */}
          <Box
            sx={{
              flex: 1.2,
              p: { xs: 3, md: 5 },
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {view === "register" && (
              <RegistrationForm
                onSuccess={handleRegistrationSuccess}
                onSwitchToLogin={handleSwitchToLogin}
              />
            )}

            {view === "appointment" && (
              <AppointmentForm
                user={user}
                onClose={onClose}
                onSwitchToCheck={() => setView("check")}
              />
            )}

            {view === "check" && (
              <BookingChecker
                onBack={() => setView(user ? "appointment" : "register")}
              />
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AppointmentModal;
