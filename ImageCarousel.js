import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import oceania from "./images/oceania.jpeg";
import spainArt from "./images/spainArt.jpeg";
import russiaArt from "./images/russiaArt.jpeg";

const ImageCarousel = ({ settings }) => {  // <-- Accept settings as a prop
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={oceania} alt="Oceania Art" className="carousel-image" />
        </div>
        <div>
          <img src={spainArt} alt="Spain Art" className="carousel-image" />
        </div>
        <div>
          <img src={russiaArt} alt="Russia Art" className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
