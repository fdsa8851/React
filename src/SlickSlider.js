import axios from "axios";
import React, { Component, useState } from "react";
import Slider from "react-slick";

const [count, setCount] = useState('');  
const [pciture, setPciture] = useState('');
const ArrPicutre = [];
export default class SimpleSlider extends Component {

  render() {

    axios.post("http://localhost:3001/picture/ssBoard", null,{ params : {
//useState 언제 사용 해야하는지 진지하게 고민 해봐야함.!    -- 화면 데이터가 들어올때마다 화면 렌더링 됨.
      }}).then(function (response) {
        for(let i =0; i < count; i++) {
            setCount = response.data.count;
            setPciture = response.data.pciture;
            ArrPicutre.push(pciture);    
        }
      }).catch(function (error) {
          console.log(error)
      })

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log("id :",inputId, "\n pw :", inputPw);    
        
        //slick slider 사용을 위한 그림 갯수 확인
        
        
          
      };
    
      slickSlider = <div></div>

    return (
      <div>
        <Slider {...settings}>
        {Sslider()}
        </Slider>
      </div>
    );
  }
}