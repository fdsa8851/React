import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import SignIn from './member/SignIn';
import { AppBar, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import SignUp from './member/SignUp';
//import TestPage1 from './member/TestPage1';
//import TestPage2 from './member/TestPage2';
import Write from './member/Board/Write';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Board from './member/Board/Board';
import NabBarDropDown from './member/bootStrap/NavBar';


function App() {

  const [id, setId] = useState(window.sessionStorage.getItem("id"));

  return(
    <BrowserRouter>
      { 
      <NabBarDropDown></NabBarDropDown>
      }<Routes>
        {/* 웹 서비스 소개 페이지 */}
        <Route path="/Board" element={
        <Board/>
        }>
        </Route>
        <Route path="/SignIn" element={
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
