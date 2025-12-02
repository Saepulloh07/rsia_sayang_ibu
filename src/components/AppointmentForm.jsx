// src/components/AppointmentForm.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const clinics = [
  "BABY SPA",
  "CEK LABOR",
  "IMUNISASI",
  "POLI ANAK",
  "POLI BEDAH",
  "POLI KANDUNGAN",
  "POLI PENYAKIT DALAM",
  "POLI PSIKOLOGI",
  "RAWAT INAP",
  "Unit IGD",
];

const AppointmentForm = ({ user, onClose, onSwitchToCheck }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    address: "",
    phone: user?.phone || "",
    email: user?.email || "",
    appointmentDate: null,
    clinic: "",
    message: "",
  });

  const [captcha, setCaptcha] = useState({ text: "", answer: "" });
  const [captchaError, setCaptchaError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

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

  const generateBookingNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BKG${timestamp}${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi captcha
    if (captcha.answer.toUpperCase() !== captcha.text) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);

    // Generate booking number
    const newBookingNumber = generateBookingNumber();
    setBookingNumber(newBookingNumber);

    // Simulasi submit - ganti dengan API call yang sebenarnya
    console.log("Pendaftaran Periksa:", {
      ...formData,
      bookingNumber: newBookingNumber,
    });

    setSubmitSuccess(true);

    // Auto close setelah 3 detik
    setTimeout(() => {
      onClose();
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography
        variant="h5"
        sx={{
          color: "#4CAF50",
          fontWeight: 600,
          textAlign: "center",
          mb: 3,
        }}
      >
        Formulir Pendaftaran Periksa Pasien
      </Typography>

      <DialogContent sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nama Lengkap"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Alamat Lengkap"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            margin="normal"
            required
            multiline
            rows={2}
          />

          <TextField
            fullWidth
            label="Nomor Telepon"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            margin="normal"
            required
            placeholder="Contoh: 08123456789"
          />

          <TextField
            fullWidth
            label="Alamat Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            margin="normal"
            required
          />

          <DatePicker
            label="Tanggal Periksa"
            value={formData.appointmentDate}
            onChange={(newValue) =>
              setFormData({ ...formData, appointmentDate: newValue })
            }
            minDate={new Date()}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true,
                helperText: "Pilih tanggal yang Anda inginkan untuk periksa",
              },
            }}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Poliklinik</InputLabel>
            <Select
              value={formData.clinic}
              onChange={(e) =>
                setFormData({ ...formData, clinic: e.target.value })
              }
            >
              {clinics.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Pesan Tambahan"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            margin="normal"
            multiline
            rows={3}
            placeholder="Keluhan atau informasi tambahan (opsional)"
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
              <Typography variant="body1" fontWeight={600}>
                Pendaftaran berhasil dibuat!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Nomor Booking Anda: <strong>{bookingNumber}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Simpan nomor booking ini untuk mengecek status pendaftaran Anda.
              </Typography>
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button onClick={onSwitchToCheck} color="secondary" variant="outlined">
          Cek Booking
        </Button>
        <Box>
          <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>
            Batal
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Kirim Pendaftaran
          </Button>
        </Box>
      </DialogActions>
    </LocalizationProvider>
  );
};

export default AppointmentForm;
