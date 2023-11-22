import './App.css';
import React from 'react';
import SignIn from './member/Member';
import { AppBar, Container, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';

function App() {
  return(
    <div> 
        <AppBar position="static">
          <Toolbar variant='dense'>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{}}>
            <MenuItem></MenuItem>
          </IconButton>
          <Typography>
            Top Menu 설정
          </Typography>
          </Toolbar>
        </AppBar>
        <SignIn></SignIn>
    </div>
  )  
}

export default App;
