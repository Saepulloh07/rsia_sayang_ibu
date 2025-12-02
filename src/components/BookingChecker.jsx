// src/components/BookingChecker.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BookingChecker = ({ onBack }) => {
  const [searchForm, setSearchForm] = useState({
    phone: "",
    bookingId: "",
  });

  const [bookingData, setBookingData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleCheckBooking = async () => {
    if (!searchForm.phone || !searchForm.bookingId) {
      setSearchError("Harap isi nomor telepon dan nomor booking");
      return;
    }

    setSearchLoading(true);
    setSearchError("");
    setBookingData(null);

    try {
      // Simulasi API call - ganti dengan API endpoint yang sebenarnya
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy data dengan format yang sesuai - ganti dengan data dari API
      const dummyBookingData = {
        bookingNumber: searchForm.bookingId,
        bookingDate: "2025-09-24 15:16:39",
        appointmentDate: "30-09-2025",
        name: "Jane Doe",
        phone: searchForm.phone,
        email: "jane.doe@email.com",
        address: "Jl. Contoh No. 123, Batusangkar",
        clinic: "POLI KANDUNGAN",
      };

      // Simulasi kondisi data tidak ditemukan
      if (searchForm.bookingId === "NOT_FOUND") {
        setSearchError(
          "Data booking tidak ditemukan. Periksa kembali nomor booking dan telepon Anda."
        );
        return;
      }

      setBookingData(dummyBookingData);
    } catch (error) {
      setSearchError(
        "Terjadi kesalahan saat mencari data booking. Silakan coba lagi."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatDateTime = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateTimeString;
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
        Cek Booking Anda
      </Typography>

      <DialogContent sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Nomor Telepon"
            value={searchForm.phone}
            onChange={(e) =>
              setSearchForm({ ...searchForm, phone: e.target.value })
            }
            margin="normal"
            required
            placeholder="Contoh: 08123456789"
          />
          <TextField
            fullWidth
            label="Nomor Booking"
            value={searchForm.bookingId}
            onChange={(e) =>
              setSearchForm({
                ...searchForm,
                bookingId: e.target.value,
              })
            }
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
              <Typography
                variant="h6"
                sx={{
                  color: "#4CAF50",
                  fontWeight: 600,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Detail Booking
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    No. Booking:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      flex: 1,
                      color: "#4CAF50",
                      fontWeight: 600,
                    }}
                  >
                    {bookingData.bookingNumber}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    Tgl. Booking:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {formatDateTime(bookingData.bookingDate)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    Tgl. Periksa:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      flex: 1,
                      color: "#F57C00",
                      fontWeight: 600,
                    }}
                  >
                    {formatDate(bookingData.appointmentDate)}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    Nama:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {bookingData.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    No. Hp/Telp:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {bookingData.phone}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    E-Mail:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {bookingData.email}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    Alamat:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {bookingData.address}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, minWidth: 120 }}
                  >
                    Unit/Poliklinik:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "right",
                      flex: 1,
                      color: "#1976D2",
                      fontWeight: 600,
                    }}
                  >
                    {bookingData.clinic}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
        <Button
          onClick={() => {
            onBack();
            setBookingData(null);
            setSearchError("");
            setSearchForm({ phone: "", bookingId: "" });
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
          {searchLoading ? "Mencari..." : "Cari Booking"}
        </Button>
      </DialogActions>
    </>
  );
};

export default BookingChecker;
