import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const succSignUp = () => navigate('/Board');

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const idHandle = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
  }
  const pwHandle = (e) => {
    setPw(e.target.value);
  }
  const emailHandle = (e) => {
    setEmail(e.target.value);
  }
  const nameHandle = (e) => {
    setName(e.target.value);
  }

  const idBlure = (e) => {
    axios.post('http://localhost:3001/idCheck', null, {params : {
      id : id,
    }}).then(function(response) {

      console.log(" 넘어온 데이터 확인 ",response);
      response.data.length > 0 ? alert("id가 중복입니다. \n 변경해주세요") : alert('중복아님'); 
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    
    console.log("form Data :" + data);

    axios.post('http://localhost:3001/SignUp', null, {params : {
      id : id,
      pw : pw,
      email : email,
      name : name
    }}).then(function(response) {
      response.data.length === 0 ? alert("회원가입에 실패했습니다. \n다시 시도해 주세요") : succSignUp(); 
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="id"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="id"
                  autoFocus
                  onBlur={idBlure}
                  onChange={idHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={emailHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={pwHandle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="kr_name"
                  required
                  fullWidth
                  id="firstName"
                  label="이름"
                  onChange={nameHandle}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}