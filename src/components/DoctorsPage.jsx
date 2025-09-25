import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import logo from '../assets/logo.png';
import doctorImage1 from '../assets/doctor1.jpg';
import doctorImage2 from '../assets/doctor1.jpg';
import doctorImage3 from '../assets/doctor1.jpg';

const doctors = [
  {
    name: 'Dr. Andi Wijaya, Sp.OG',
    specialty: 'Obstetri dan Ginekologi',
    description: 'Dengan pengalaman lebih dari 15 tahun, Dr. Andi fokus pada persalinan aman dan perawatan kehamilan di RSIA Sayang Ibu.',
    image: doctorImage1,
    alt: 'Dr. Andi Wijaya, Spesialis Kandungan di RSIA Sayang Ibu',
    icon: <PregnantWomanIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'andi-wijaya',
    gender: 'Male',
    schedule: ['Morning', 'Afternoon'],
    popularity: 8,
  },
  {
    name: 'Dr. Budi Santoso, Sp.A',
    specialty: 'Anak',
    description: 'Ahli kesehatan anak, imunisasi, dan perawatan neonatal di rumah sakit bersalin RSIA Sayang Ibu Tanah Datar.',
    image: doctorImage2,
    alt: 'Dokter Budi Santoso, Spesialis Anak di RSIA Sayang Ibu',
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'budi-santoso',
    gender: 'Male',
    schedule: ['Morning'],
    popularity: 9,
  },
  {
    name: 'Dr. Citra Dewi, Sp.OG',
    specialty: 'Obstetri dan Ginekologi',
    description: 'Fokus pada konsultasi maternitas dan USG kehamilan untuk ibu di Sumatera Barat.',
    image: doctorImage3,
    alt: 'Dokter Citra Dewi, Spesialis Kandungan di RSIA Sayang Ibu',
    icon: <MedicalServicesIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'citra-dewi',
    gender: 'Female',
    schedule: ['Afternoon', 'Evening'],
    popularity: 7,
  },
  {
    name: 'Dr. Siti Rahmah, Sp.A',
    specialty: 'Anak',
    description: 'Spesialis anak dengan keahlian dalam perawatan bayi prematur dan imunisasi.',
    image: doctorImage1,
    alt: 'Dr. Siti Rahmah, Spesialis Anak di RSIA Sayang Ibu',
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'siti-rahmah',
    gender: 'Female',
    schedule: ['Morning', 'Evening'],
    popularity: 6,
  },
  {
    name: 'Dr. Hasan Basri, Sp.OG',
    specialty: 'Obstetri dan Ginekologi',
    description: 'Ahli dalam prosedur persalinan kompleks dan perawatan pasca-melahirkan.',
    image: doctorImage2,
    alt: 'Dr. Hasan Basri, Spesialis Kandungan di RSIA Sayang Ibu',
    icon: <PregnantWomanIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'hasan-basri',
    gender: 'Male',
    schedule: ['Afternoon'],
    popularity: 5,
  },
  {
    name: 'Dr. Laila Fitri, Sp.A',
    specialty: 'Anak',
    description: 'Berpengalaman dalam diagnosis dan pengobatan penyakit anak di RSIA Sayang Ibu.',
    image: doctorImage3,
    alt: 'Dr. Laila Fitri, Spesialis Anak di RSIA Sayang Ibu',
    icon: <ChildFriendlyIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'laila-fitri',
    gender: 'Female',
    schedule: ['Morning', 'Afternoon'],
    popularity: 10,
  },
  {
    name: 'Dr. Rudi Hartono, Sp.OG',
    specialty: 'Obstetri dan Ginekologi',
    description: 'Spesialis kandungan dengan fokus pada kehamilan berisiko tinggi.',
    image: doctorImage1,
    alt: 'Dr. Rudi Hartono, Spesialis Kandungan di RSIA Sayang Ibu',
    icon: <PregnantWomanIcon sx={{ fontSize: 40, color: '#E91E63' }} />,
    slug: 'rudi-hartono',
    gender: 'Male',
    schedule: ['Evening'],
    popularity: 4,
  },
];

const DoctorsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [schedule, setSchedule] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const doctorsPerPage = 6;

  // Filter and search logic
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = specialty ? doctor.specialty === specialty : true;
    const matchesSchedule = schedule ? doctor.schedule.includes(schedule) : true;
    const matchesGender = gender ? doctor.gender === gender : true;
    return matchesSearch && matchesSpecialty && matchesSchedule && matchesGender;
  });

  // Most popular doctors (top 3 by popularity)
  const popularDoctors = [...doctors]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * doctorsPerPage,
    page * doctorsPerPage
  );

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      <Helmet>
        <title>Temukan Dokter - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Temukan dokter spesialis kandungan dan anak di RSIA Sayang Ibu Batusangkar. Cari berdasarkan nama, spesialis, jadwal, atau jenis kelamin."
        />
        <meta
          name="keywords"
          content="dokter kandungan batusangkar, dokter anak tanah datar, temukan dokter rsia sayang ibu, spesialis maternitas, kesehatan anak sumatera barat"
        />
      </Helmet>
      <Container maxWidth="xl">
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            color: '#4CAF50',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Temukan Dokter Kami
        </Typography>

        {/* Search and Filters */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Cari Dokter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', md: 300 }, backgroundColor: '#FFFFFF', borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: '#4CAF50', mr: 1 }} />
              ),
              sx: { borderRadius: 2 },
            }}
          />
          <FormControl sx={{ width: { xs: '100%', md: 200 } }}>
            <InputLabel>Spesialis</InputLabel>
            <Select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              label="Spesialis"
            >
              <MenuItem value="">Semua Spesialis</MenuItem>
              <MenuItem value="Obstetri dan Ginekologi">Obstetri dan Ginekologi</MenuItem>
              <MenuItem value="Anak">Anak</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: { xs: '100%', md: 200 } }}>
            <InputLabel>Jadwal</InputLabel>
            <Select
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              label="Jadwal"
            >
              <MenuItem value="">Semua Jadwal</MenuItem>
              <MenuItem value="Morning">Pagi</MenuItem>
              <MenuItem value="Afternoon">Siang</MenuItem>
              <MenuItem value="Evening">Malam</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: { xs: '100%', md: 200 } }}>
            <InputLabel>Jenis Kelamin</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Jenis Kelamin"
            >
              <MenuItem value="">Semua</MenuItem>
              <MenuItem value="Male">Laki-laki</MenuItem>
              <MenuItem value="Female">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Most Popular Doctors */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: '#333', fontWeight: 600, textAlign: 'center' }}
          >
            Paling Banyak Dicari
          </Typography>
          {isMobile ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={3000}
              transitionTime={600}
              showArrows={false}
              centerMode
              centerSlidePercentage={85}
              swipeable
              emulateTouch
            >
              {popularDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </Carousel>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {popularDoctors.map((doctor, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <DoctorCard doctor={doctor} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* All Doctors */}
        <Typography
          variant="h5"
          sx={{ mb: 3, color: '#333', fontWeight: 600, textAlign: 'center' }}
        >
          Semua Dokter
        </Typography>
        <Grid container spacing={3} justifyContent= 'center' sx={{ mb: 4 }} >
          {paginatedDoctors.length > 0 ? (
            paginatedDoctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DoctorCard doctor={doctor} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', width: '100%', color: '#555' }}>
              Tidak ada dokter yang sesuai dengan kriteria pencarian.
            </Typography>
          )}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size={isMobile ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

// Reusable DoctorCard component
const DoctorCard = ({ doctor }) => (
  <Box
    component={Link}
    to={`/doctors/${doctor.slug}`}
    sx={{
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.03)' },
      width: '100%',
      maxWidth: 360,
      height: 420,
      backgroundColor: '#FFFFFF',
      mx: 'auto',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '50%',
        p: 0.5,
      }}
    >
      <img src={logo} alt="RSIA Logo" style={{ width: 24, height: 24 }} />
    </Box>
    <img
      src={doctor.image}
      alt={doctor.alt}
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
    <Box sx={{ p: 2.5, textAlign: 'center' }}>
      <Box sx={{ mb: 1 }}>{doctor.icon}</Box>
      <Typography
        variant="h6"
        sx={{ color: '#333', fontWeight: 600, fontSize: '1.2rem' }}
      >
        {doctor.name}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: '#4CAF50', mb: 1, fontSize: '0.9rem' }}
      >
        {doctor.specialty}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}
      >
        {doctor.description}
      </Typography>
    </Box>
  </Box>
);

export default DoctorsPage;