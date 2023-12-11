import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import FormData from 'form-data';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Write() {

  const navigate = useNavigate();
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

  const [title, setTitle]= useState('');
  const [cont, setCont] = useState('');
  const [selectFile, setSelectFile] = useState(null); //게시판 파일

  //formData.append('selectFile',selectFile);
  //formData.append('content', content);

  useEffect(() => {
   
  }, [content]);

  useEffect(() => {
    if(no !== null) {
      boardDetail();  //상세조회
    }
  }, []);

  //console.log(e.target.value);
  //const files = e.target.value;
  //setSelectFile([...files]);

  //상세조회
  const boardDetail = () => {
    try {
      axios.get(url, {params: content})
      .then(response => {
        setTitle(response.data[0].title);
        setCont(response.data[0].content);        
        console.log('조회');
      })
    }catch(err) {
      console.log("Error : ", err);
    }
    console.log('나오는지 확인');
  }
  
  //form Submit 하는곳
  const formSubmit = (e) =>{
    e.preventDefault();
    setData();
  }

  //내용 입력 Handler
  const setContentHandler = (e) => {
    const {name, value} = e.target;
    setContent({...content, [name] : value });
    setCont(e.target.value);
  }

  //제목 입력 Handler
  const setTitleHandler = (e) => {
    const {name, value} = e.target;
    setContent({...content, [name] : value });
    setTitle(e.target.value);
  }

  //버튼 선택에 맞는 state 입력
  const crudData = (state) => {
    setContent({...content, state : state});
  }



  //게시판 등록, 수정, 삭제
  const setData = async() => {

    let selectState = '';
    
    if(content.state === 'C') {
      selectState = '등록';
    } else if(content.state === 'U') {
      selectState = '수정';
    } else if(content.state === 'D') {
      selectState = '삭제';
    }
  
    if(window.confirm(selectState+'하시겠습니까?')) {
      try { 
          const reponse = await axios.post(url, null, {
          params: content,
          headers: {
            "Content-Type": `application/json`,
          }});

          window.alert(selectState+'완료 되었습니다.');
          if(content.state ==='D' || content.state ==='C') {
            navigate("/board");
          }
      }catch(err) {
        console.log("Error : ", err);
      }
    }      
  }

  return (

    <div>
      <h1>게시판 등록 하는 곳 입니다.</h1>
      <hr/>
      <form onSubmit={formSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>제목</th>
              <td><input type='text' name='title' placeholder='제목을 입력하세요' onChange={setTitleHandler} value={title}></input></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name='content'placeholder='내용을 입력하세요' onChange={setContentHandler} value={cont}></textarea></td>
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
      <button><Link to='/Board'>목록</Link></button>
      
    </div>
  );

}

export default Write;

