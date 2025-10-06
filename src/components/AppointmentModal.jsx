// src/components/AppointmentModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, Typography, Box, Select, MenuItem, FormControl,
  InputLabel, Alert, IconButton, useMediaQuery, useTheme,
  Card, CardContent, Divider
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
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

  const [view, setView] = useState("form"); 
  const [bookingData, setBookingData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // State untuk form pencarian
  const [searchForm, setSearchForm] = useState({
    phone: '',
    bookingId: ''
  });

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

  const handleCheckBooking = async () => {
    if (!searchForm.phone || !searchForm.bookingId) {
      setSearchError('Harap isi nomor telepon dan nomor booking');
      return;
    }

    setSearchLoading(true);
    setSearchError('');
    setBookingData(null);

    try {
      // Simulasi API call - ganti dengan API endpoint yang sebenarnya
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy data dengan format yang sesuai - ganti dengan data dari API
      const dummyBookingData = {
        bookingNumber: searchForm.bookingId,
        bookingDate: "2025-09-24 15:16:39",
        appointmentDate: "30-09-2025",
        name: "Jane Doe",
        phone: searchForm.phone,
        email: "jane.doe@email.com",
        address: "Jl. Contoh No. 123, Batusangkar",
        clinic: "POLI KANDUNGAN"
      };

      // Simulasi kondisi data tidak ditemukan
      if (searchForm.bookingId === "NOT_FOUND") {
        setSearchError('Data booking tidak ditemukan. Periksa kembali nomor booking dan telepon Anda.');
        return;
      }

      setBookingData(dummyBookingData);
    } catch (error) {
      setSearchError('Terjadi kesalahan saat mencari data booking. Silakan coba lagi.');
    } finally {
      setSearchLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return dateTimeString;
    }
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
                <DialogContent sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                  <Box sx={{ mb: 3 }}>
                    <TextField 
                      fullWidth 
                      label="Nomor Telepon" 
                      value={searchForm.phone}
                      onChange={(e) => setSearchForm({ ...searchForm, phone: e.target.value })}
                      margin="normal" 
                      required
                      placeholder="Contoh: 08123456789"
                    />
                    <TextField 
                      fullWidth 
                      label="Nomor Booking" 
                      value={searchForm.bookingId}
                      onChange={(e) => setSearchForm({ ...searchForm, bookingId: e.target.value })}
                      margin="normal" 
                      required
                      placeholder="Masukkan nomor booking Anda"
                    />
                    
                    {searchError && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {searchError}
                      </Alert>
                    )}
                  </Box>

                  {bookingData && (
                    <Card sx={{ mt: 3, boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                          Detail Booking
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              No. Booking:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1, color: '#4CAF50', fontWeight: 600 }}>
                              {bookingData.bookingNumber}
                            </Typography>
                          </Box>
                          
                          <Divider />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              Tgl. Booking:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1 }}>
                              {formatDateTime(bookingData.bookingDate)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              Tgl. Periksa:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1, color: '#F57C00', fontWeight: 600 }}>
                              {formatDate(bookingData.appointmentDate)}
                            </Typography>
                          </Box>
                          
                          <Divider />
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              Nama:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1 }}>
                              {bookingData.name}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              No. Hp/Telp:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1 }}>
                              {bookingData.phone}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              E-Mail:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1 }}>
                              {bookingData.email}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              Alamat:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1 }}>
                              {bookingData.address}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 120 }}>
                              Unit/Poliklinik:
                            </Typography>
                            <Typography variant="body2" sx={{ textAlign: 'right', flex: 1, color: '#1976D2', fontWeight: 600 }}>
                              {bookingData.clinic}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  )}
                </DialogContent>
                
                <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    onClick={() => {
                      setView("form");
                      setBookingData(null);
                      setSearchError('');
                      setSearchForm({ phone: '', bookingId: '' });
                    }} 
                    color="inherit"
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={handleCheckBooking}
                    variant="contained"
                    color="primary"
                    disabled={searchLoading || !searchForm.phone || !searchForm.bookingId}
                    startIcon={searchLoading ? null : <SearchIcon />}
                  >
                    {searchLoading ? 'Mencari...' : 'Cari Booking'}
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