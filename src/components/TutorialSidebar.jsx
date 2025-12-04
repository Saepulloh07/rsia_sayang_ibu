// src/components/TutorialSidebar.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const TutorialSidebar = ({ type, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorials = {
    register: {
      title: "Panduan Pendaftaran Akun",
      icon: <PersonAddIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
      steps: [
        {
          label: "Isi Nama Lengkap",
          description:
            "Masukkan nama lengkap Anda sesuai KTP atau identitas resmi",
          icon: <PersonAddIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Masukkan Email & Telepon",
          description:
            "Gunakan email dan nomor telepon aktif untuk verifikasi akun",
          icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Buat Password Aman",
          description:
            "Minimal 6 karakter, kombinasi huruf dan angka untuk keamanan",
          icon: <LockIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Verifikasi Captcha",
          description:
            "Ketik teks pada gambar captcha untuk verifikasi keamanan",
          icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
      ],
    },
    login: {
      title: "Panduan Login",
      icon: <LoginIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
      steps: [
        {
          label: "Login dengan Google",
          description:
            "Klik tombol 'Masuk dengan Google' untuk login cepat menggunakan akun Google Anda",
          icon: <EmailIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Atau Login dengan Telepon",
          description: "Masukkan nomor telepon yang terdaftar (10-13 digit)",
          icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Belum Punya Akun?",
          description:
            "Klik 'Belum punya akun? Daftar sekarang' untuk membuat akun baru",
          icon: <PersonAddIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
      ],
    },
    appointment: {
      title: "Panduan Pendaftaran Periksa",
      icon: <CheckCircleIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
      steps: [
        {
          label: "Data Pribadi",
          description:
            "Isi nama lengkap, alamat, nomor telepon, dan email Anda dengan benar",
          icon: <PersonAddIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Pilih Tanggal & Poliklinik",
          description:
            "Tentukan tanggal periksa dan pilih poliklinik yang sesuai kebutuhan",
          icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Verifikasi & Kirim",
          description:
            "Isi captcha untuk keamanan, lalu klik 'Kirim Pendaftaran'",
          icon: <VerifiedUserIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Simpan Nomor Booking",
          description:
            "Catat nomor booking Anda untuk mengecek status pendaftaran",
          icon: <SearchIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
      ],
    },
    check: {
      title: "Panduan Cek Booking",
      icon: <SearchIcon sx={{ fontSize: 60, color: "#4CAF50" }} />,
      steps: [
        {
          label: "Masukkan Nomor Telepon",
          description: "Isi nomor telepon yang Anda gunakan saat pendaftaran",
          icon: <PhoneAndroidIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Masukkan Nomor Booking",
          description:
            "Ketik nomor booking yang Anda terima setelah pendaftaran",
          icon: <SearchIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
        {
          label: "Klik Cari Booking",
          description:
            "Tekan tombol 'Cari Booking' untuk melihat detail pendaftaran Anda",
          icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
        },
      ],
    },
  };

  const currentTutorial = tutorials[type] || tutorials.register;
  const steps = currentTutorial.steps;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box sx={{ mb: 2 }}>{currentTutorial.icon}</Box>
        <Typography
          variant="h5"
          sx={{ color: "#1B5E20", fontWeight: 700, mb: 1 }}
        >
          {currentTutorial.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#555", mb: 3 }}>
          Ikuti langkah-langkah berikut untuk menyelesaikan proses dengan mudah
        </Typography>
      </Box>

      {/* Stepper Content */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 3 }}>
        <Stepper activeStep={currentStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor:
                        currentStep >= index
                          ? "#4CAF50"
                          : "rgba(76, 175, 80, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                    }}
                  >
                    {currentStep > index ? "✓" : index + 1}
                  </Box>
                )}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: currentStep >= index ? "#1B5E20" : "#757575",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <Box sx={{ pl: 7, pb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {step.icon}
                  <Typography
                    variant="body2"
                    sx={{
                      color: currentStep >= index ? "#555" : "#999",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Navigation Buttons */}
      <Stack spacing={2}>
        {currentStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={() => setCurrentStep(currentStep + 1)}
            sx={{
              bgcolor: "#4CAF50",
              "&:hover": { bgcolor: "#43A047" },
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Lanjut ke Langkah {currentStep + 2}
          </Button>
        )}

        {currentStep > 0 && (
          <Button
            variant="outlined"
            onClick={() => setCurrentStep(currentStep - 1)}
            sx={{
              borderColor: "#4CAF50",
              color: "#4CAF50",
              "&:hover": {
                borderColor: "#43A047",
                bgcolor: "rgba(76, 175, 80, 0.05)",
              },
            }}
          >
            Kembali
          </Button>
        )}

        <Button
          variant="text"
          onClick={onSkip}
          sx={{
            color: "#757575",
            "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
          }}
        >
          Lewati Tutorial
        </Button>
      </Stack>
    </Box>
  );
};

export default TutorialSidebar;
