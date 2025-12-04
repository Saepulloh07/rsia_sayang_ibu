// src/components/TutorialMobilePopup.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  MobileStepper,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TutorialMobilePopup = ({ open, type, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const tutorials = {
    register: {
      title: "Panduan Pendaftaran Akun",
      steps: [
        {
          label: "Isi Nama Lengkap",
          description:
            "Masukkan nama lengkap Anda sesuai KTP atau identitas resmi",
          icon: <PersonAddIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Masukkan Email & Telepon",
          description:
            "Gunakan email dan nomor telepon aktif untuk verifikasi akun",
          icon: <PhoneAndroidIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Buat Password Aman",
          description:
            "Minimal 6 karakter, kombinasi huruf dan angka untuk keamanan",
          icon: <LockIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Verifikasi Captcha",
          description:
            "Ketik teks pada gambar captcha untuk verifikasi keamanan",
          icon: <VerifiedUserIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
      ],
    },
    login: {
      title: "Panduan Login",
      steps: [
        {
          label: "Login dengan Google",
          description: "Klik tombol 'Masuk dengan Google' untuk login cepat",
          icon: <EmailIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Atau Login dengan Telepon",
          description: "Masukkan nomor telepon yang terdaftar (10-13 digit)",
          icon: <PhoneAndroidIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Belum Punya Akun?",
          description:
            "Klik 'Belum punya akun? Daftar sekarang' untuk membuat akun baru",
          icon: <PersonAddIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
      ],
    },
    appointment: {
      title: "Panduan Pendaftaran Periksa",
      steps: [
        {
          label: "Data Pribadi",
          description:
            "Isi nama lengkap, alamat, nomor telepon, dan email dengan benar",
          icon: <PersonAddIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Pilih Tanggal & Poliklinik",
          description:
            "Tentukan tanggal periksa dan pilih poliklinik yang sesuai",
          icon: <CheckCircleIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Verifikasi & Kirim",
          description:
            "Isi captcha untuk keamanan, lalu klik 'Kirim Pendaftaran'",
          icon: <VerifiedUserIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Simpan Nomor Booking",
          description:
            "Catat nomor booking Anda untuk mengecek status pendaftaran",
          icon: <SearchIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
      ],
    },
    check: {
      title: "Panduan Cek Booking",
      steps: [
        {
          label: "Masukkan Nomor Telepon",
          description: "Isi nomor telepon yang Anda gunakan saat pendaftaran",
          icon: <PhoneAndroidIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Masukkan Nomor Booking",
          description:
            "Ketik nomor booking yang Anda terima setelah pendaftaran",
          icon: <SearchIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
        {
          label: "Klik Cari Booking",
          description:
            "Tekan tombol 'Cari Booking' untuk melihat detail pendaftaran",
          icon: <CheckCircleIcon sx={{ fontSize: 70, color: "#4CAF50" }} />,
        },
      ],
    },
  };

  const currentTutorial = tutorials[type] || tutorials.register;
  const maxSteps = currentTutorial.steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          m: 2,
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#757575",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pt: 6, pb: 2 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* Icon */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor: "rgba(76, 175, 80, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentTutorial.steps[activeStep].icon}
          </Box>

          {/* Title */}
          <Typography variant="h5" sx={{ color: "#1B5E20", fontWeight: 700 }}>
            {currentTutorial.title}
          </Typography>

          {/* Step Label */}
          <Box
            sx={{
              bgcolor: "#E8F5E9",
              px: 3,
              py: 1,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "#2E7D32", fontWeight: 600 }}
            >
              Langkah {activeStep + 1} dari {maxSteps}
            </Typography>
          </Box>

          {/* Step Title */}
          <Typography
            variant="h6"
            sx={{ color: "#1B5E20", fontWeight: 600, px: 2 }}
          >
            {currentTutorial.steps[activeStep].label}
          </Typography>

          {/* Step Description */}
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              lineHeight: 1.7,
              px: 2,
              minHeight: 60,
            }}
          >
            {currentTutorial.steps[activeStep].description}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", gap: 2, p: 3, pt: 0 }}>
        {/* Mobile Stepper */}
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            width: "100%",
            bgcolor: "transparent",
            "& .MuiMobileStepper-dot": {
              bgcolor: "rgba(76, 175, 80, 0.3)",
            },
            "& .MuiMobileStepper-dotActive": {
              bgcolor: "#4CAF50",
            },
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{ color: "#4CAF50", fontWeight: 600 }}
            >
              Lanjut
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: "#4CAF50", fontWeight: 600 }}
            >
              <KeyboardArrowLeft />
              Kembali
            </Button>
          }
        />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            sx={{
              borderColor: "#E0E0E0",
              color: "#757575",
              "&:hover": {
                borderColor: "#BDBDBD",
                bgcolor: "rgba(0,0,0,0.02)",
              },
            }}
          >
            Lewati
          </Button>
          {activeStep === maxSteps - 1 && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#43A047" },
              }}
            >
              Mulai
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialMobilePopup;
