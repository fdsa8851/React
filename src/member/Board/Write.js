import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import FormData from 'form-data';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Write() {

  let id = window.sessionStorage.getItem('id');
  const location = useLocation();
  const no = (location.state === null ? null : location.state.no);
  
  const url = "http://localhost:3001/Board/Regist";
  const formData = new FormData();
  const [content, setContent] = useState({
    title: '',
    content : '',
    create : id,    //userId 넣는 란.
    fileUrl : '',
    no : no
  });         //게시판 내용

  const [selectFile, setSelectFile] = useState(null); //게시판 파일

  //formData.append('selectFile',selectFile);
  //formData.append('content', content);

  useEffect(() => {
   console.log('effect1',content);
  }, [content]);

  useEffect(() => {
    console.log('effect2',content);
  }, []);

  //console.log(e.target.value);
  //const files = e.target.value;
  //setSelectFile([...files]);

  //상세조회
  const boardDetail = async() => {
    try {
      const response = await axios.get(url, {params: content});
      console.log(response);
    }catch(err) {
      console.log("Error : ", err);
    }
  }
  
  //form Submit 하는곳
  const formSubmit = (e) =>{
    e.preventDefault();
    setData();
  }

  //제목, 내용 입력 Handler
  const setBoardHandler = (e) => {
    const {name, value} = e.target;
    setContent({...content, [name] : value });
  }

  //버튼 선택에 맞는 state 입력
  const crudData = (state) => {
    setContent({...content, state : state});
  }



  //게시판 등록, 수정, 삭제
  const setData = async() => {

    let selectState = '';

    if(content.state === 'C') {
      selectState = '등록 하시겠습니까?';
    } else if(content.state === 'U') {
      selectState = '수정 하시겠습니까?';
    } else if(content.state === 'D') {
      selectState = '삭제 하시겠습니까?';
    }

    if(window.confirm(selectState)) {
      try {
        const response = await axios.post(url, null, {
          params: content,
          headers: {
            "Content-Type": `application/json`,
          },
        });
        console.log(response);
      }catch(err) {
        console.log("Error : ", err);
      }
    }   
  }

  return (

    <div>
      <h1>게시판 등록 하는 곳 입니다.</h1>
      <hr/>
      <button onClick={boardDetail}>상세조회 한번해보자</button>
      <form onSubmit={formSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>제목</th>
              <td><input type='text' name='title' placeholder='제목을 입력하세요' onChange={setBoardHandler}></input></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name='content'placeholder='내용을 입력하세요' onChange={setBoardHandler}></textarea></td>
            </tr>
            <tr>
              <th>파일 선택</th>
              <td>
                  <input 
                    type='file' 
                    // onChange={fileHandler}
                    accept='.png, .jpg,image/*'
                  ></input>
                </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        {no === null ?  <button type='submit' onClick={()=>{crudData('C')}}>등록</button> : 
          <div>
            <button tyep='submit' onClick={()=>{crudData('U')}}>수정</button>
            <button tyep='submit' onClick={()=>{crudData('D')}}>삭제</button>
          </div>
          }
      </form>
      <hr/>
      <button><Link to='/Board'>뒤로가기 버튼</Link></button>
      
    </div>
  );

}

export default Write;

