// src/components/MusicPlayer.jsx
import React, { useState, useEffect, useRef } from "react";
import { Fab, Tooltip, Box, Slider, Paper, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

// Import musik dari assets
import marsSayangIbu from "../assets/Mars Sayang Ibu.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(30);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  // Inisialisasi audio
  useEffect(() => {
    audioRef.current = new Audio(marsSayangIbu);
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;

    // Auto-play segera saat web dibuka
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log(
          "Autoplay diblokir browser, klik tombol play untuk memutar musik:",
          error
        );
        // Jika diblokir, coba lagi saat user interaksi pertama
        const handleFirstClick = async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            document.removeEventListener("click", handleFirstClick);
          } catch (err) {
            console.log("Gagal play musik:", err);
          }
        };
        document.addEventListener("click", handleFirstClick, { once: true });
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
      if (newValue === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 80, md: 100 },
        right: { xs: 20, md: 30 },
        zIndex: 1000,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Panel Kontrol Extended */}
      {showControls && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            bottom: 60,
            right: 0,
            p: 2.5,
            borderRadius: 3,
            minWidth: 220,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            animation: "slideUp 0.3s ease-out",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            "@keyframes slideUp": {
              from: {
                opacity: 0,
                transform: "translateY(10px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
          // Prevent mouse leave when interacting with controls
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MusicNoteIcon sx={{ color: "#4CAF50", mr: 1 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#333" }}
            >
              Mars Sayang Ibu
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Tooltip title={isMuted ? "Unmute" : "Mute"}>
              <Box
                onClick={toggleMute}
                sx={{
                  cursor: "pointer",
                  color: isMuted ? "#999" : "#4CAF50",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "#E91E63" },
                }}
              >
                {isMuted ? (
                  <VolumeOffIcon fontSize="small" />
                ) : (
                  <VolumeUpIcon fontSize="small" />
                )}
              </Box>
            </Tooltip>
            <Box sx={{ flex: 1, px: 1 }}>
              <Slider
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                sx={{
                  color: "#4CAF50",
                  height: 6,
                  "& .MuiSlider-thumb": {
                    width: 18,
                    height: 18,
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.16)",
                    },
                  },
                  "& .MuiSlider-track": {
                    height: 6,
                  },
                  "& .MuiSlider-rail": {
                    height: 6,
                    opacity: 0.3,
                  },
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                minWidth: 38,
                color: "#666",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              {isMuted ? 0 : volume}%
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Tombol Play/Pause Utama */}
      <Tooltip
        title={isPlaying ? "Pause Musik" : "Play Musik"}
        placement="left"
      >
        <Fab
          color="primary"
          onClick={togglePlay}
          sx={{
            boxShadow: "0 8px 24px rgba(76, 175, 80, 0.4)",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 12px 32px rgba(76, 175, 80, 0.5)",
            },
            transition: "all 0.3s ease",
            animation: isPlaying ? "pulse 2s infinite" : "none",
            "@keyframes pulse": {
              "0%, 100%": {
                boxShadow: "0 8px 24px rgba(76, 175, 80, 0.4)",
              },
              "50%": {
                boxShadow: "0 8px 32px rgba(76, 175, 80, 0.7)",
              },
            },
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default MusicPlayer;
