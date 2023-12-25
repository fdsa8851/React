import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { tokenState } from './GlobalState';

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const login = () => navigate('/Board');

  const [token, setToken] = useRecoilState(tokenState);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
          
  const handleInputId = (e) => {
    setInputId(e.target.value);
  }  
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }  

  const handleSubmit = async (event) => {
    event.preventDefault();

    //const data = new FormData(event.currentTarget); // 추후 로그인 시간 등을 DB 저장
    console.log("id :",inputId, "\n pw :", inputPw);    

    try {
      const response = await axios.post("http://localhost:3001/login", null,{ params : {
        id : inputId,
        pw : inputPw
    }})
      const id = window.sessionStorage.setItem('id', inputId);
      console.log("id값 확인 : " , id);
      setToken(window.sessionStorage.getItem('id'));

      response.data.length === 0 ? alert("빈값입니다.") : login();    

    } catch (err) {
      console.log('에러 :', err);
    }
  }

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
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* id */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputId}
            />
            {/* pw */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputPw}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 1 }}
              href="/SignUp"
            >회원가입
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/SignUp" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}