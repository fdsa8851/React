import * as React from "react";
import axios from "axios";
import { useState } from "react";
import FormData from "form-data";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useCookies } from 'react-cookie';

function Write() {
  const navigate = useNavigate();
  let id = window.sessionStorage.getItem("id");
  const location = useLocation();
  const no = location.state === null ? null : location.state.no;

  const url = "http://localhost:3001/Board/Regist";
  const viewUrl = "http://localhost:3001/Board/View";
  const formData = new FormData();

  const fileInputRef = useRef(); //file
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");
  const [selectFile, setSelectFile] = useState(null); //formData 넘겨줄때 사용
  const [viewFile, setViewFile] = useState(null); //게시된 임시 이미지 화면에 표시
  const [detailView, setDetailView] = useState(null); //등록된 이미지 화면에 표시 (상세조회)
  const [content, setContent] = useState({
    title: "",
    content: "",
    create: id, //userId 넣는 란.
    no: no
  }); //게시판 내용
  
  const [cookies, setCookie, removeCookie] = useCookies(['viewDuplieCntChk']); //쿠키 관리

  //쿠키가 있거나 viewCnt 값이 변경될때만 상세조회를 실행한다.
  useEffect(() => {

  }, [content]);

  useEffect(() => {

    if (no !== null) {
      boardDetail();
    }
  }, []);

  //조회수
  // const view = async() => {
  //   console.log("no",no);
  //   try {
  //     const addViewCnt = axios.post(viewUrl, null, {
  //       params : {no : no}
  //     });
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  //상세조회
  const boardDetail = async () => {

    const time = 3600 * 24; //24시간
    const expiration = new Date(Date.now() + time * 1000);
    setCookie(`board_${no}`, id, { path: "/", expires: expiration }); 

    //쿠키를 이용하여 조회수 중복 안되게 수정
    const keys = Object.keys(cookies);
    if((keys.includes(`board_${no}`)) == false) {
        try {
          const response = await axios.get(viewUrl, { params: {'no':no}});
          console.log(response);
        } catch(err) {
          console.log('view err : ', err);
        } 
    }

    //상세조회
    try {
      const response = await axios.get(url, { params: content });
      setTitle(response.data[0].title);
      setCont(response.data[0].content);
      setSelectFile(response.data[0].fileUrl);
      setDetailView(response.data[0].fileUrl);
      
    } catch (err) {
      console.log("Error : ", err);
    }

  };

  //form Submit 하는곳
  const formSubmit = (e) => { 
    e.preventDefault();
    setData();
    //test();
  };

  //파일 관련 핸들러
  const fileHandler = async(e) => {
    
    const { files } = e.target;
    const uploadFile = files[0];

    setSelectFile(uploadFile); //formData넘겨줄 파일

    const reader = new FileReader(); //FileReader 객체 생성
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      setViewFile(reader.result);
    };

  };

  //input 버튼 클릭
  // const handleClickFileInput = () => {
  //   fileInputRef.current.click();
  // };

  //내용 입력 Handler
  const setContentHandler = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
    setCont(e.target.value);
  };

  //제목 입력 Handler
  const setTitleHandler = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
    setTitle(e.target.value);
  };

  //버튼 선택에 맞는 state 입력
  const crudData = (state) => {
    setContent({ ...content, state: state });
  };

  //게시판 등록, 수정, 삭제
  const setData = async () => {
    //object 형태를 json 으로 변환
    let selectState = "";

    console.log(content);

    formData.append("file", selectFile);
    formData.append("content", JSON.stringify(content));

    if (content.state === "C") {
      selectState = "등록";
    } else if (content.state === "U") {
      selectState = "수정";
    } else if (content.state === "D") {
      selectState = "삭제";
    }

    if (window.confirm(selectState + "하시겠습니까?")) {
      try {
        const reponse = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            //application/json
            //multipart/form-data
            //application/x-www-form-urlencoded
          },
        });

        window.alert(selectState + "완료 되었습니다.");
        console.log(reponse);
        if (content.state === "D" || content.state === "C") {
          //navigate("/board");
        }
      } catch (err) {
        console.log("Error : ", err);
      }
    }
  };

  const test = async() => {
    console.log('확인');
    formData.append('file', selectFile);
    try {
    const reponse = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            //application/json
            //multipart/form-data
            //application/x-www-form-urlencoded
          },
        });
        console.log(reponse);
        window.alert("완료 되었습니다.");
      } catch (err) {
        console.log("Error : ", err);
      }
  }

  return (
    <div>
      <h1>게시판 등록 하는 곳 입니다.</h1>
      <hr />
      <form onSubmit={formSubmit}>
      <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력하세요"
                  onChange={setTitleHandler}
                  value={title}
                ></input>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  name="content"
                  placeholder="내용을 입력하세요"
                  onChange={setContentHandler}
                  value={cont}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
              <input
                  type="file"
                  onChange={fileHandler}
                  accept=".png, .jpg,image/*"
                  name="upload"
                  ref={fileInputRef}
                ></input>
                {
                  detailView !== null && viewFile === null ?<img src ={`http://localhost:3001/${detailView}`}></img> : <img src={viewFile} img="img"></img>
                }
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        {no === null ? (
          <button
            type="submit"
            onClick={() => {
              crudData("C");
            }}
          >
            등록
          </button>
        ) : (
          <div>
            <button
              tyep="submit"
              onClick={() => {
                crudData("U");
              }}
            >
              수정
            </button>
            <button
              tyep="submit"
              onClick={() => {
                crudData("D");
              }}
            >
              삭제
            </button>
          </div>
        )}        
      </form>
      <hr />
      <button>
        <Link to="/Board">목록</Link>
      </button>      
    </div>
  );
}

export default Write;
