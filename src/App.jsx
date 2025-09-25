import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import DoctorsSection from './components/DoctorsSection';
import ContactSection from './components/ContactSection';
import DoctorsPage from './components/DoctorsPage';
import AboutPage from './components/AboutPage';
import ManagementPage from './components/ManajemenPage';
import Footer from './components/Footer';
import ChatCS from './components/ChatCS';

function AppContent() {
  return (
    <Router>
      <Helmet>
        <title>RSIA Sayang Ibu Batusangkar - Layanan Kesehatan Ibu dan Anak Terbaik di Sumatera Barat</title>
        <meta
          name="description"
          content="Rumah Sakit Ibu dan Anak Sayang Ibu Batusangkar menyediakan layanan persalinan aman, perawatan kehamilan berkualitas, dan kesehatan anak dengan fasilitas modern dan tim medis profesional."
        />
        <meta
          name="keywords"
          content="rsia sayang ibu batusangkar, rumah sakit bersalin, layanan maternitas, kesehatan ibu dan anak, persalinan normal, rumah sakit ibu anak tanah datar, sumatera barat, dokter kandungan, dokter anak"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="RSIA Sayang Ibu Batusangkar - Kesehatan Ibu dan Anak Terpercaya"
        />
        <meta
          property="og:description"
          content="Layanan kesehatan ibu dan anak berkualitas tinggi dengan pendekatan penuh kasih di Batusangkar, Tanah Datar."
        />
        <meta
          property="og:image"
          content="https://img.freepik.com/free-vector/hand-drawn-maternity-logo-template_23-2149439520.jpg"
        />
        <meta property="og:url" content="https://www.rsiasayangibu.com/" />
        <link rel="canonical" href="https://www.rsiasayangibu.com/" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <DoctorsSection />
              <ServicesSection />
              <AboutSection />
              <ContactSection />
              <Footer />
            </>
          }
        />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:slug" element={<div>Doctor Profile (TBD)</div>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/management" element={<ManagementPage/>}/>
      </Routes>
      <ChatCS />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;