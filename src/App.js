import './App.css';
import React from 'react';
import SignIn from './member/SignIn';
import { AppBar, Container, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import UserList from './member/UserList';
import SignUp from './member/SignUp';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Board from './member/Board';

function App() {

  return(
    <BrowserRouter>
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
        </div>     
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/Borad" element={
        <Board/>
        }>
        </Route>
        <Route path="/" element={
        <SignIn/>
        }>
        </Route>
        <Route path="/SignUp" element={
          <SignUp></SignUp>
        }></Route>
      </Routes>
    </BrowserRouter>     
  )  
}

export default App;
