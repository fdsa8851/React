import React, { useEffect, useState } from 'react';


export default function useFetch(url) {

    const [count, setCount] = useState('');

    useEffect(()=> {
        console.log("count Change");
    }, [count]);

    // useEffect(()=> {
    //     console.log("count Change");
    // }, []); <- 빈배열 호출시 최초 한번만 호출 실행됨.


    function onClick() {
        setCount(count +1);
    }

    return (
        <>
          <div style={{ minHeight: 800, marginTop: 20 }}>
            <h1>Profile Page</h1>
    
            <div>
              <button type="button">
                Sign Out
              </button>
              <button onClick ={onClick}>{count}</button>
            </div>
          </div>
        </>
      );
    
}
