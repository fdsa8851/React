import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import FormData from 'form-data';

const formData = new FormData();

export default function Write() {

  const FileUpload = (e) => {
    setFile(e.target.files[0])
  }

  const [file, setFile] = useState(null);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [subject1, setSubject1] = useState('');
  const [subject2, setSubject2] = useState('');

  const subjectHandler1 = (e) => {
    setSubject1(e.target.value);
  }

  const subjectHandler2 = (e) => {
    setSubject2(e.target.value);
  }

  const contentHandler1 = (e) => {
    setContent1(e.target.value);
  }

  const contentHandler2 = (e) => {
    setContent2(e.target.value);
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const formValue = [{
      subject1 : subject1,
      subject2 : subject2,
      content1 : content1,
      content2 : content2
    }];
    
    formData.append("file", file);
    formData.append('formValue',formValue);

    axios.post("http://localhost:3001/Board/Write", formData, { 
      headers: {
            'Content-Type': 'multipart/form-data'}
            ,
      }).then((result)=>{console.log('요청성공')
      console.log(result)
    
    })
      .catch((error)=>{console.log('요청실패')
      console.log(error)  
    })
  }

  return (
    <form id="upload" encType="multipart/form-data" >
        <div>
          <table>
            <thead>
                <tr>
                  <th>제목</th>
                  <th>내용</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td><input type="text" name="subject1" onChange={subjectHandler1}></input></td>
                  <td><input type="text" name="content2" onChange={contentHandler1}></input></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                  <td><input type="text" name="subject2" onChange={subjectHandler2}></input></td>
                  <td><input type="text" name="content2" onChange={contentHandler2}></input></td>
                </tr>
            </tfoot>
        </table>
        <button onClick={formSubmit}>전송</button>
        <input type="file" accept='image/*' onClick={FileUpload}></input>
      </div>        
      </form>
  );
}