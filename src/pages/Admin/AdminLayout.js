import React, { useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Container, Paper, Button, Toolbar } from '@mui/material';

import History from './History';
import Program from './Program';

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const tabIndex = path.includes('program') ? 1 : 0;

  // ✅ 로그인 여부 검사
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert('로그인이 필요합니다.');
      navigate('/admin');
    }
  }, [navigate]);

  const handleTabChange = (_, newValue) => {
    if (newValue === 0) navigate('/admin/dashboard/history');
    else if (newValue === 1) navigate('/admin/dashboard/program');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('adminID');
    navigate('/admin');
  };

  return (
    <Box sx={{ bgcolor: '#f5f6f8', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="연혁" />
            <Tab label="교육 프로그램" />
          </Tabs>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Routes>
            <Route path="history" element={<History />} />
            <Route path="program" element={<Program />} />
          </Routes>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminLayout;
