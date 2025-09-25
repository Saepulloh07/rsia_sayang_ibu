// src/components/AppointmentModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Typography, Box, Select, MenuItem, FormControl,
  InputLabel, Alert, IconButton, useMediaQuery, useTheme
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png';

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
  "Unit IGD"
];

const AppointmentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    phone: '',
    email: user?.email || '',
    date: null,
    clinic: '',
    message: '',
  });

  const [captcha, setCaptcha] = useState({ text: '', answer: '' });
  const [captchaError, setCaptchaError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [view, setView] = useState("form"); // "form" | "check"
  const [bookingData, setBookingData] = useState(null);

  const canvasRef = useRef(null);

  // Generate captcha image
  const generateCaptcha = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha({ text: random, answer: '' });

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
    if (open && view === "form") generateCaptcha();
  }, [open, view]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captcha.answer.toUpperCase() !== captcha.text) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    console.log('Janji Temu:', formData);
    setSubmitSuccess(true);
    setTimeout(() => {
      onClose();
      setSubmitSuccess(false);
    }, 2000);
  };

  const handleCheckBooking = (phone, bookingId) => {
    // Dummy data → connect to your backend
    setBookingData({
      phone,
      bookingId,
      name: "Jane Doe",
      clinic: "POLI KANDUNGAN",
      date: "2025-10-10"
    });
  };

  if (!open) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Helmet>
        <meta
          name="keywords"
          content="buat janji temu rsia sayang ibu, appointment rumah sakit batusangkar, poliklinik maternitas tanah datar, layanan kesehatan ibu anak online"
        />
      </Helmet>
      <Dialog open={open} onClose={onClose} fullScreen>
        {/* Tombol Close */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
          <IconButton onClick={onClose} sx={{ color: '#4CAF50' }}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh' }}>
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
              <Box sx={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2
              }}>
                <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
              </Box>

              <Typography variant="h4" fontWeight={700}>
                RSIA Sayang Ibu
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, maxWidth: 400, textAlign: "center" }}>
                Kami hadir untuk memberikan pelayanan kesehatan ibu & anak dengan penuh kasih.
              </Typography>
            </Box>
          )}

          {/* Kanan: Konten */}
          <Box sx={{ flex: 1.2, p: { xs: 3, md: 5 }, backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
            {view === "form" && (
              <>
                <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600, textAlign: 'center', mb: 3 }}>
                  Formulir Janji Temu
                </Typography>
                <DialogContent sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField fullWidth label="Nama Lengkap" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      margin="normal" required />
                    <TextField fullWidth label="Alamat Lengkap" value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      margin="normal" required multiline rows={2} />
                    <TextField fullWidth label="Nomor Telepon" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      margin="normal" required />
                    <TextField fullWidth label="Alamat Email" type="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      margin="normal" required />

                    <DatePicker
                      label="Pilih Tanggal Janji"
                      value={formData.date}
                      onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                      minDate={new Date()}
                      enableAccessibleFieldDOMStructure={false}
                      slots={{ textField: TextField }}
                      slotProps={{ textField: { fullWidth: true, margin: "normal", required: true } }}
                    />

                    <FormControl fullWidth margin="normal" required>
                      <InputLabel>Poliklinik</InputLabel>
                      <Select value={formData.clinic} onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}>
                        {clinics.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                      </Select>
                    </FormControl>

                    <TextField fullWidth label="Pesan Tambahan" value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      margin="normal" multiline rows={3} />

                    {/* Captcha */}
                    <Box sx={{ mt: 3, p: 2, border: '1px solid #E0E0E0', borderRadius: 2, textAlign: 'center', backgroundColor: '#F9F9F9' }}>
                      <Typography variant="body1" fontWeight={500}>Verifikasi Keamanan</Typography>
                      <canvas ref={canvasRef} width={150} height={50} style={{ border: "1px solid #ccc", borderRadius: 4, marginTop: 8 }} />
                      <TextField fullWidth placeholder="Masukkan teks di atas"
                        value={captcha.answer}
                        onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                        margin="normal" required />
                      {captchaError && <Alert severity="error">Captcha salah. Silakan coba lagi.</Alert>}
                      <Button onClick={generateCaptcha} variant="text" size="small">Ganti Captcha</Button>
                    </Box>

                    {submitSuccess && <Alert severity="success" sx={{ mt: 2 }}>Janji temu berhasil dibuat!</Alert>}
                  </Box>
                </DialogContent>

                {/* Tombol */}
                <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                  <Button onClick={() => setView("check")} color="secondary" variant="outlined">Cek Booking</Button>
                  <Box>
                    <Button onClick={onClose} color="inherit" sx={{ mr: 2 }}>Batal</Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">Kirim Janji Temu</Button>
                  </Box>
                </DialogActions>
              </>
            )}

            {view === "check" && (
              <>
                <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600, textAlign: 'center', mb: 3 }}>
                  Cek Booking Anda
                </Typography>
                <DialogContent>
                  <TextField fullWidth label="Nomor Telepon" margin="normal" id="checkPhone" />
                  <TextField fullWidth label="Nomor Booking" margin="normal" id="checkBooking" />
                  {bookingData && (
                    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                      <Typography variant="body2"><b>Nama:</b> {bookingData.name}</Typography>
                      <Typography variant="body2"><b>Poliklinik:</b> {bookingData.clinic}</Typography>
                      <Typography variant="body2"><b>Tanggal:</b> {bookingData.date}</Typography>
                    </Box>
                  )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between' }}>
                  <Button onClick={() => setView("form")} color="inherit">Kembali</Button>
                  <Button
                    onClick={() => {
                      const phone = document.getElementById("checkPhone").value;
                      const bookingId = document.getElementById("checkBooking").value;
                      handleCheckBooking(phone, bookingId);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Cari
                  </Button>
                </DialogActions>
              </>
            )}
          </Box>
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AppointmentModal;