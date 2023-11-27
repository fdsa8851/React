import React, { Component } from "react";
import Slider from "react-slick";
import picture from "./../picture/picture1.jpg"
export default class SimpleSlider extends Component {
  render() {
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
            <img src={'./../picture/picture1.jpg'} alt="사진"></img>
          </div>
          <div>
            <img src='./../picture/picture2.jpg' alt="사진"></img>
          </div>
        </Slider>
      </div>
    );
  }
}