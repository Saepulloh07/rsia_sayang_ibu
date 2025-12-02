import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const ChatCS = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "CS",
      text: "Selamat datang di Layanan Chat RSIA Sayang Ibu. Bagaimana kami bisa membantu Anda hari ini? (Contoh: pertanyaan tentang layanan, janji temu, atau keluhan kesehatan ibu/anak)",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logika untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logika untuk mendeteksi status Drawer (sidebar) dari Navbar
  useEffect(() => {
    const drawer = document.querySelector(".MuiDrawer-root");
    if (drawer) {
      const observer = new MutationObserver(() => {
        const isOpen = drawer.style.transform === "translateX(0px)";
        setSidebarOpen(isOpen);
      });
      observer.observe(drawer, {
        attributes: true,
        attributeFilter: ["style"],
      });
      return () => observer.disconnect();
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "Pasien", text: newMessage }]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "CS",
            text: "Terima kasih atas pesan Anda. Tim kami akan segera merespons. Untuk urgensi, hubungi IGD: +62 123 456 7890.",
          },
        ]);
      }, 1000);
      setNewMessage("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Box
        component="button"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 32,
          display: sidebarOpen && isMobile ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isMobile ? "#4CAF50" : "transparent",
          border: isMobile
            ? "none"
            : `2px solid ${scrolled ? "#4CAF50" : "#FFFFFF"}`,
          borderRadius: isMobile ? "50%" : 2,
          width: isMobile ? 48 : "auto",
          height: isMobile ? 48 : "auto",
          p: isMobile ? 0 : 1,
          cursor: "pointer",
          zIndex: 1100, // Lower than Drawer (default MUI Drawer zIndex is 1200)
          transition:
            "border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            backgroundColor: isMobile ? "#388E3C" : "transparent",
            borderColor: isMobile ? "none" : "#388E3C",
          },
        }}
        aria-label="Layanan Chat CS"
      >
        <ChatIcon
          sx={{
            color: isMobile ? "#FFFFFF" : scrolled ? "#4CAF50" : "#FFFFFF",
            fontSize: isMobile ? 28 : 32,
          }}
        />
        {!isMobile && (
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: scrolled ? "#4CAF50" : "#FFFFFF",
              fontSize: "1rem",
              ml: 1,
            }}
          >
            Layanan Kami!
          </Typography>
        )}
      </Box>

      {/* Modal Chat */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            maxWidth: { xs: "90%", md: 400 },
            height: { xs: "80vh", md: "60vh" },
            mx: "auto",
            position: "relative",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
            aria-label="Tutup Chat"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="chat-modal-title"
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "#4CAF50",
              textAlign: "center",
            }}
          >
            Layanan Chat Customer Service
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent:
                    msg.sender === "Pasien" ? "flex-end" : "flex-start",
                }}
              >
                <ListItemText
                  primary={msg.text}
                  sx={{
                    backgroundColor:
                      msg.sender === "Pasien" ? "#E8F5E9" : "#F5F5F5",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "80%",
                  }}
                  primaryTypographyProps={{ color: "#333" }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ketik pesan Anda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              aria-label="Kirim Pesan"
            >
              <SendIcon />
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            sx={{ mt: 1, color: "#888", textAlign: "center" }}
          >
            Layanan ini untuk pertanyaan umum. Untuk darurat, hubungi IGD.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ChatCS;
