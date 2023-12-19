import axios from "axios";
import {useCookies} from 'react-cookie'

/** no게시판 key(no) , url : url */
function View(no, url) {

  const [cookies, setCookie, removeCookie] = useCookies(["viewCookie"]);
 
    const handleLogin = (no) => {
        if (no === `board_${no}`) {
            const time = 3600 * 24; //24시간
            const expiration = new Date(Date.now() + time * 1000);
            // setCookie('키값','데이터값',{path,expires,maxAge...})
            setCookie('board_id', true, { path: "/", expires: expiration });  //cookie값, ??, path(/)->모든쿠키 엑세스, expires 만료 시간
            setTimeout(() => {
                // 1시간 후에 알림창을 표시하고 페이지를 새로고침
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.reload();
            }, time * 1000); // 3초 후에 실행
        }
    };

  console.log('여기오는지확인 no, url :', no, url);
}

export default View;