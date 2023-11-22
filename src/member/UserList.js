import { useState} from 'react';

function UserList() {

  //정보가져오기
  function getUserList () {
  
    let reqOption = {
      method : "get",
      headers : {
        "content-type" : "application/json"
      }
    }

    // fetch("/../../server.js", reqOption).then((res) => res.json())
    // .then(data => console.log(data));

  }
  getUserList();
  
  return (
    <div className="contents">
    </div>
  )
}

export default UserList;