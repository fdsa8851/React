import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import SignIn from './member/SignIn';
import { AppBar, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import SignUp from './member/SignUp';
//import TestPage1 from './member/TestPage1';
//import TestPage2 from './member/TestPage2';
import Write from './member/Board/Write';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Board from './member/Board/Board';
import LeftMenu from "./component/LeftMenu";
import MenuIcon from '@mui/icons-material/Menu';
import TopMenu from './adornment/TopeMenu';


function App() {

  const [topMenu, setTopMenu] = useState('');
  const location = window.location.href;
  
  //url에 따른 topMenu 변경
  useEffect(() => {
    
    if(location.includes('Board')) {
      setTopMenu('게시판');
    } else if (location.includes('Login')){ 
      setTopMenu('로그인');
    } else if(location.includes('SignUp')) {
      setTopMenu('회원가입')
    } else {
      setTopMenu('로그인');
    }
    console.log("topMenu : ", topMenu);

  }, [topMenu]);

  return(
    <BrowserRouter>
        <div>
          <TopMenu></TopMenu>
        </div>     
      <Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/Board" element={
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
        <Route path="/Board/Write/:no" element={
          <Write></Write>
        }></Route>
        <Route path="/Board/Write" element={
          <Write></Write>
        }></Route>
      </Routes>
    </BrowserRouter>     
  )  
}

export default App;
