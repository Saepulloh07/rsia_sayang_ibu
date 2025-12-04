// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import RegistrationForm from "./RegistrationForm";
import AppointmentForm from "./AppointmentForm";
import BookingChecker from "./BookingChecker";
import TutorialSidebar from "./TutorialSidebar";
import TutorialMobilePopup from "./TutorialMobilePopup";

const AppointmentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();

  const [view, setView] = useState(user ? "appointment" : "register");
  const [showTutorial, setShowTutorial] = useState(true);
  const [showMobileTutorial, setShowMobileTutorial] = useState(false);

  // Reset tutorial saat modal dibuka
  useEffect(() => {
    if (open) {
      // Cek apakah user sudah pernah melihat tutorial (gunakan localStorage)
      const hasSeenTutorial = localStorage.getItem(`tutorial_${view}_seen`);
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
  }, [open, view, isMobile]);

  const handleRegistrationSuccess = () => {
    setView("appointment");
  };

  const handleSwitchToLogin = () => {
    onClose();
  };

  const handleSkipTutorial = () => {
    // Tandai tutorial sudah dilihat
    localStorage.setItem(`tutorial_${view}_seen`, "true");
    setShowTutorial(false);
    setShowMobileTutorial(false);
  };

  const getTutorialType = () => {
    if (view === "register") return "register";
    if (view === "appointment") return "appointment";
    if (view === "check") return "check";
    return "register";
  };

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="Pendaftaran pasien rsia sayang ibu, appointment rumah sakit batusangkar, poliklinik maternitas tanah datar, layanan kesehatan ibu anak online"
        />
      </Helmet>

      {/* Mobile Tutorial Popup */}
      {isMobile && (
        <TutorialMobilePopup
          open={showMobileTutorial}
          type={getTutorialType()}
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
              <TutorialSidebar
                type={getTutorialType()}
                onSkip={handleSkipTutorial}
              />
            </Box>
          )}

          {/* Kanan: Konten Form */}
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
