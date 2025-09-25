import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import logo from '../assets/logo.png';

const ManagementPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Data Dewan Komisaris
  const boardOfCommissioners = [
    {
      name: 'Dr. H. Ahmad Syahrial, Sp.OG',
      position: 'Komisaris Utama',
      education: 'Spesialis Obstetri dan Ginekologi',
      experience: '25+ tahun',
      specialization: 'Kesehatan Maternal, Tata Kelola Korporasi',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Hj. Siti Rahma, S.E., M.M.',
      position: 'Komisaris',
      education: 'Magister Manajemen',
      experience: '20+ tahun',
      specialization: 'Manajemen Strategis, Keuangan Korporasi',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  // Data Direksi
  const boardOfDirectors = [
    {
      name: 'Dr. H. Basuki Rahmanto, Sp.A',
      position: 'Direktur Utama',
      education: 'Spesialis Anak',
      experience: '22+ tahun',
      specialization: 'Kesehatan Anak, Manajemen Rumah Sakit',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Dr. Hj. Fatimah Azzahra, Sp.OG',
      position: 'Direktur Medis',
      education: 'Spesialis Obstetri dan Ginekologi',
      experience: '18+ tahun',
      specialization: 'Pelayanan Medis, Quality Assurance',
      image: 'https://images.unsplash.com/photo-1594824475704-b8b47ea8f8ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Ir. Muhammad Fadli, M.M.',
      position: 'Direktur Operasional',
      education: 'Magister Manajemen',
      experience: '15+ tahun',
      specialization: 'Operasional Rumah Sakit, Sistem Informasi',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  // Data Komite
  const committees = [
    {
      name: 'Komite Medik',
      chairman: 'Dr. H. Rizky Pratama, Sp.B',
      members: 8,
      responsibilities: [
        'Kredensial tenaga medis',
        'Mutu pelayanan medis',
        'Etika profesi kedokteran',
        'Pengembangan staf medis',
      ],
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    },
    {
      name: 'Komite Keperawatan',
      chairman: 'Ns. Hj. Sri Wahyuni, S.Kep., M.Kep',
      members: 12,
      responsibilities: [
        'Standar asuhan keperawatan',
        'Pengembangan profesi',
        'Mutu pelayanan keperawatan',
        'Pendidikan berkelanjutan',
      ],
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    },
    {
      name: 'Komite Mutu & Keselamatan Pasien',
      chairman: 'Dr. Hj. Anita Sari, Sp.PK',
      members: 10,
      responsibilities: [
        'Manajemen risiko klinis',
        'Peningkatan mutu berkelanjutan',
        'Keselamatan pasien',
        'Audit internal',
      ],
      icon: <StarIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    },
    {
      name: 'Komite Etik & Hukum',
      chairman: 'Dr. H. Abdullah Rahman, Sp.F',
      members: 6,
      responsibilities: [
        'Etika rumah sakit',
        'Aspek hukum pelayanan',
        'Informed consent',
        'Penyelesaian konflik',
      ],
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    },
  ];

  const ManagementCard = ({ person, type }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        border: '1px solid #E8F5E9',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 48px rgba(76, 175, 80, 0.12)',
          '& .avatar-container': {
            transform: 'scale(1.05)',
          },
          '&::before': {
            opacity: 1,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: type === 'commissioner' 
            ? 'linear-gradient(90deg, #E91E63 0%, #F06292 100%)'
            : 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
      }}
    >
      <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          className="avatar-container"
          sx={{
            mb: 3,
            transition: 'transform 0.3s ease',
            position: 'relative',
          }}
        >
          <Avatar
            src={person.image}
            alt={person.name}
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              border: '4px solid #FFFFFF',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 100%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -5,
              right: 'calc(50% - 60px + 15px)',
              width: 30,
              height: 30,
              backgroundColor: type === 'commissioner' ? '#E91E63' : '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #FFFFFF',
            }}
          >
            {type === 'commissioner' ? (
              <AccountBalanceIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
            ) : (
              <BusinessCenterIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
            )}
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: '#4CAF50',
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
          }}
        >
          {person.name}
        </Typography>

        <Chip
          label={person.position}
          sx={{
            mb: 3,
            backgroundColor: type === 'commissioner' ? '#FCE4EC' : '#E8F5E9',
            color: type === 'commissioner' ? '#E91E63' : '#4CAF50',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        />

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                mb: 1,
                fontWeight: 600,
              }}
            >
              Pendidikan:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#424242',
                mb: 2,
                fontSize: '0.95rem',
              }}
            >
              {person.education}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#666',
                mb: 1,
                fontWeight: 600,
              }}
            >
              Pengalaman:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#424242',
                mb: 2,
                fontSize: '0.95rem',
              }}
            >
              {person.experience}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#424242',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}
            >
              {person.specialization}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const CommitteeCard = ({ committee }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        border: '1px solid #E8F5E9',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              p: 2,
              borderRadius: '50%',
              backgroundColor: '#E8F5E9',
              mb: 2,
            }}
          >
            {committee.icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#2E7D32',
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.1rem', md: '1.2rem' },
            }}
          >
            {committee.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              fontWeight: 600,
            }}
          >
            Ketua: {committee.chairman}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              mt: 0.5,
            }}
          >
            Jumlah Anggota: {committee.members} orang
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: '#4CAF50',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Tanggung Jawab:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {committee.responsibilities.map((responsibility, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  color: '#666',
                  fontSize: '0.9rem',
                  mb: 1,
                  lineHeight: 1.5,
                }}
              >
                {responsibility}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
      <Helmet>
        <title>Manajemen - RSIA Sayang Ibu Batusangkar</title>
        <meta
          name="description"
          content="Profil lengkap Dewan Komisaris, Direksi, dan Komite RSIA Sayang Ibu Batusangkar. Tim profesional berpengalaman dalam bidang kesehatan ibu dan anak."
        />
        <meta
          name="keywords"
          content="manajemen rsia sayang ibu, dewan komisaris, direksi, komite rumah sakit, struktur organisasi"
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          backgroundImage: `linear-gradient(135deg, rgba(233, 30, 99, 0.9) 0%, rgba(76, 175, 80, 0.85) 50%, rgba(76, 175, 80, 0.8) 100%), url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              animation: 'fadeInUp 1s ease-out',
              '@keyframes fadeInUp': {
                '0%': { opacity: 0, transform: 'translateY(50px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                mb: 3,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: 100, md: 140 },
                  height: { xs: 100, md: 140 },
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '50%',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }}
              />
              <Box
                component="img"
                src={logo}
                alt="RSIA Sayang Ibu Logo"
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                }}
              />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                mb: 2,
                color: '#FFFFFF',
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                letterSpacing: '-0.02em',
              }}
            >
              Tim Manajemen
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1.3rem', md: '1.6rem' },
                mb: 4,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Kepemimpinan Profesional untuk Pelayanan Kesehatan Terbaik
            </Typography>
            <Box
              sx={{
                width: 100,
                height: 4,
                backgroundColor: '#FFFFFF',
                mx: 'auto',
                borderRadius: 2,
                opacity: 0.9,
              }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Dewan Komisaris Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 6,
              background: 'linear-gradient(90deg, #E91E63 0%, #F06292 100%)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 48, color: '#E91E63', mr: 2 }} />
              <Typography
                variant="h3"
                sx={{
                  color: '#E91E63',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Dewan Komisaris
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Dewan Komisaris yang berpengalaman dalam mengawasi dan memberikan arahan strategis untuk kemajuan rumah sakit
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {boardOfCommissioners.map((commissioner, index) => (
              <Grid item xs={12} md={6} lg={5} key={index}>
                <ManagementCard person={commissioner} type="commissioner" />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Direksi Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 6,
              background: 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 48, color: '#4CAF50', mr: 2 }} />
              <Typography
                variant="h3"
                sx={{
                  color: '#4CAF50',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Dewan Direksi
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Tim direksi profesional yang memimpin operasional harian dan pengembangan strategis rumah sakit
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {boardOfDirectors.map((director, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ManagementCard person={director} type="director" />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Komite Section */}
        <Paper
          elevation={0}
          sx={{
            mb: 6,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E0E0E0',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 6,
              background: 'linear-gradient(90deg, #2E7D32 0%, #66BB6A 100%)',
            },
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <GroupsIcon sx={{ fontSize: 48, color: '#2E7D32', mr: 2 }} />
              <Typography
                variant="h3"
                sx={{
                  color: '#2E7D32',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                Komite Rumah Sakit
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                fontSize: { xs: '1.1rem', md: '1.2rem' },
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Komite-komite profesional yang bertugas menjaga standar mutu, keselamatan, dan etika pelayanan rumah sakit
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {committees.map((committee, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CommitteeCard committee={committee} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ManagementPage;