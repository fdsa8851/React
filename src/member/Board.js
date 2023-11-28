import React, { Component } from "react";
import Slider from "react-slick";
import picture from "./src/picture/picture1.jpg"

export default class SimpleSlider extends Component {

  render() {

    const IMG_FILE = process.env.REACT_APP_IMG_FILE;

    console.log(IMG_FILE);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2
    };
    
    

    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
          <img
            src={'${IMG_FILE}'/picture2.jpg} alt="사진">       
          </img>
          <img
            src={picture} alt="사진">       
          </img>
          </div>
          <div>
            <img src='./../picture/picture2.jpg' alt="사진"></img>
          </div>
        </Slider>
      </div>
    );
  }
}