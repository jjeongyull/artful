import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
 Container,
 Box,
 TextField,
 Button,
 Typography,
 Paper
} from '@mui/material';
import { supabase } from '../../lib/supabaseClient';

function Login() {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [textError, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('userId', userId)
      .eq('userPw', userPw)
      .single(); // 단일 결과만 가져옴

    if (error || !data) {
      setError('로그인 실패: 아이디 또는 비밀번호가 틀립니다.');
      console.log(error)
      alert(textError)
      return;
    }

    // 성공: 로그인 정보 저장
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('adminID', userId);

    // 관리자 대시보드로 이동
    navigate('/admin/dashboard/history');
  };

  return (
   <Container maxWidth="sm" sx={{ mt: 10 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        ArtFul 관리자 로그인
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="ID"
          variant="outlined"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={userPw}
          onChange={e => setUserPw(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 1 }}
        >
          로그인
        </Button>
      </Box>
    </Paper>
  </Container>
  );
}

export default Login;
