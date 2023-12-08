import React, { Component } from "react";
import Slider from "react-slick";
import picture from "./../picture/picture1.jpg"
export default class SimpleSlider extends Component {
  render() {


    const IMG_ROUTE = process.env.REACT_APP_IMG_ROUTE;
 //   console.log(IMG_ROUTE+'\/'+picutre1); 
// slick slider 포기
    const settings =
     {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2
    };

    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <img src={IMG_ROUTE} alt="사진"></img>
          </div>
          <div>
          </div>
        </Slider>
      </div>
    );
  }
}