import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const ChatCS = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "CS",
      text: (
        <>
          <strong>Assalamualaikum warahmatullahi wabarakatuh</strong>
          <br />
          Selamat datang di Layanan Customer Service RS Sayang Ibu
          <br />
          <br />
          Ada yang bisa kami bantu hari ini?
        </>
      ),
    },
  ]);

  const messagesEndRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto scroll ke bawah
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Deteksi scroll halaman
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Deteksi drawer/sidebar (untuk mobile)
  useEffect(() => {
    const drawer = document.querySelector(".MuiDrawer-root");
    if (drawer) {
      const observer = new MutationObserver(() => {
        const isOpen =
          drawer.style.transform === "translateX(0px)" ||
          drawer.getAttribute("aria-hidden") === "false";
        setSidebarOpen(isOpen);
      });
      observer.observe(drawer, {
        attributes: true,
        attributeFilter: ["style", "aria-hidden"],
      });
      return () => observer.disconnect();
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userText = newMessage.trim();
    setNewMessage("");

    // Tambah pesan pengguna
    setMessages((prev) => [...prev, { sender: "Pasien", text: userText }]);

    // Balasan otomatis profesional + tombol WhatsApp
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "CS",
          text: (
            <Box sx={{ lineHeight: 1.6 }}>
              Terima kasih atas pesan Anda.
              <br />
              Untuk informasi yang lebih lengkap, akurat, dan cepat ditangani,
              kami sarankan Anda menghubungi tim kami langsung melalui WhatsApp
              resmi:
              <br />
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  href="https://wa.me/6281234567890?text=Halo%20Admin%20RS%20Harapan%20Sehat%2C%20saya%20ingin%20bertanya%3A%0A"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#25D366",
                    color: "white",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                    "&:hover": {
                      backgroundColor: "#128C7E",
                      boxShadow: "0 6px 16px rgba(37, 211, 102, 0.4)",
                    },
                  }}
                >
                  Hubungi via WhatsApp
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Respon lebih cepat • Tersedia 24 jam • Langsung dijawab tim
                resmi
              </Typography>
            </Box>
          ),
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <Box
        component="button"
        onClick={handleOpen}
        aria-label="Chat dengan Customer Service"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 32 },
          right: { xs: 20, md: 32 },
          display: sidebarOpen && isMobile ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          backgroundColor: isMobile ? "#25D366" : "rgba(37, 211, 102, 0.1)",
          color: isMobile ? "white" : scrolled ? "#25D366" : "white",
          border: isMobile
            ? "none"
            : `2px solid ${scrolled ? "#25D366" : "white"}`,
          borderRadius: isMobile ? "50%" : 50,
          width: isMobile ? 60 : "auto",
          height: isMobile ? 60 : 56,
          px: isMobile ? 0 : 3,
          py: isMobile ? 0 : 1.5,
          cursor: "pointer",
          zIndex: 1100,
          boxShadow: isMobile ? "0 8px 20px rgba(37, 211, 102, 0.4)" : "none",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: isMobile ? "#128C7E" : "rgba(37, 211, 102, 0.2)",
            transform: "translateY(-2px)",
            boxShadow: isMobile
              ? "0 12px 28px rgba(37, 211, 102, 0.5)"
              : "none",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: isMobile ? 32 : 28 }} />
        {!isMobile && (
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "1rem" }}
          >
            Butuh Bantuan?
          </Typography>
        )}
      </Box>

      {/* Modal Chat */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 0, md: "auto" },
            right: { xs: 0, md: "auto" },
            top: { xs: "auto", md: "50%" },
            left: { xs: "auto", md: "50%" },
            transform: { md: "translate(-50%, -50%)" },
            width: { xs: "100%", sm: 420 },
            height: { xs: "100vh", md: "80vh" },
            maxHeight: "800px",
            bgcolor: "background.paper",
            borderRadius: { xs: 0, md: 3 },
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "#25D366",
              color: "white",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: "white", color: "#25D366" }}>
                <WhatsAppIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Customer Service
                </Typography>
                <Typography variant="caption">
                  Online • Respon cepat via WhatsApp
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Area */}
          <List
            sx={{ flexGrow: 1, overflowY: "auto", p: 2, bgcolor: "#f5f5f5" }}
          >
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent:
                    msg.sender === "Pasien" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    maxWidth: "85%",
                    backgroundColor:
                      msg.sender === "Pasien" ? "#25D366" : "white",
                    color: msg.sender === "Pasien" ? "white" : "text.primary",
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    primaryTypographyProps={{
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: "1px solid #eee", bgcolor: "white" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Tulis pesan Anda..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!newMessage.trim()}
                sx={{
                  bgcolor: "#25D366",
                  color: "white",
                  "&:hover": { bgcolor: "#128C7E" },
                  "&:disabled": { bgcolor: "#ccc" },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1, textAlign: "center" }}
            >
              Setelah mengirim pesan, Anda akan diarahkan ke WhatsApp untuk
              dilayani lebih lanjut.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChatCS;
