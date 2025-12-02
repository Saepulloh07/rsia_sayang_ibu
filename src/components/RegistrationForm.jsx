// src/components/RegistrationForm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegistrationForm = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [captcha, setCaptcha] = useState({ text: "", answer: "" });
  const [captchaError, setCaptchaError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const canvasRef = useRef(null);

  // Generate captcha image
  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha({ text: random, answer: "" });

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 28px Arial";
      ctx.fillStyle = "#4CAF50";
      ctx.fillText(random, 20, 35);

      // Random lines
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * 150, Math.random() * 50);
        ctx.lineTo(Math.random() * 150, Math.random() * 50);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validasi nama
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi telepon
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Nomor telepon harus 10-13 digit angka";
    }

    // Validasi password
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    // Validasi konfirmasi password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi captcha
    if (captcha.answer.toUpperCase() !== captcha.text) {
      setCaptchaError(true);
      return;
    }

    // Validasi form
    if (!validateForm()) {
      return;
    }

    setCaptchaError(false);

    // Simulasi pendaftaran - ganti dengan API call yang sebenarnya
    console.log("Pendaftaran Akun:", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });

    setSubmitSuccess(true);

    // Redirect ke form appointment setelah 2 detik
    setTimeout(() => {
      setSubmitSuccess(false);
      onSuccess();
    }, 2000);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error saat user mengetik
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          color: "#4CAF50",
          fontWeight: 600,
          textAlign: "center",
          mb: 3,
        }}
      >
        Pendaftaran Akun
      </Typography>

      <DialogContent sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nama Lengkap"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            margin="normal"
            required
            error={!!errors.fullName}
            helperText={errors.fullName}
          />

          <TextField
            fullWidth
            label="Alamat Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
            placeholder="contoh@email.com"
          />

          <TextField
            fullWidth
            label="Nomor Telepon"
            value={formData.phone}
            onChange={handleChange("phone")}
            margin="normal"
            required
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Contoh: 08123456789"
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange("password")}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Konfirmasi Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Captcha */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #E0E0E0",
              borderRadius: 2,
              textAlign: "center",
              backgroundColor: "#F9F9F9",
            }}
          >
            <Typography variant="body1" fontWeight={500}>
              Verifikasi Keamanan
            </Typography>
            <canvas
              ref={canvasRef}
              width={150}
              height={50}
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                marginTop: 8,
              }}
            />
            <TextField
              fullWidth
              placeholder="Masukkan teks di atas"
              value={captcha.answer}
              onChange={(e) =>
                setCaptcha({ ...captcha, answer: e.target.value })
              }
              margin="normal"
              required
            />
            {captchaError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Captcha salah. Silakan coba lagi.
              </Alert>
            )}
            <Button onClick={generateCaptcha} variant="text" size="small">
              Ganti Captcha
            </Button>
          </Box>

          {submitSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Pendaftaran akun berhasil! Mengarahkan ke form pendaftaran
              periksa...
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button onClick={onSwitchToLogin} color="secondary" variant="text">
          Sudah punya akun? Login
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Daftar Akun
        </Button>
      </DialogActions>
    </>
  );
};

export default RegistrationForm;
