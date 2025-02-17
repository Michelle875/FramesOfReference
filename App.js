import React from "react";
import './App.css';
import DalleImage from './Pages/DALLE_Art.webp';
import oceania from './images/oceania.jpeg';
import spain from './images/spainArt.jpeg';
import russia from './images/russiaArt.jpeg';
import Slider from "react-slick";
import ImageCarousel from "./ImageCarousel";
import ParticlesBackground from "./Components/particlesbg";


function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Try disabling autoplay to test swiping
    autoplaySpeed: 3000,
    swipeToSlide: true, // Enables swiping
    touchMove: true    // Ensures touchpad/touchscreen scrolling
    
  };
  

  
  


  return (
    <div>
      <ParticlesBackground />
      {/* Header Section */}
      <header className="header">
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#contact">Spain</a></li>
            <li><a href="#contact">Oceania</a></li>
            <li><a href="#contact">Russia</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <h1 className="title">Frames of Reference</h1>
        <subtitle className="subtitle">By Michelle Shlivko</subtitle>


      </header>

    

      {/* Main Content */}
      <section className="content-section">
        <div className="content-container">
          <div className="text-wrapper">
          <h2 className="description">Description</h2>
            <p className="descriptionText">
              Art is known to mirror societal transformation. 
              It captures changes in culture, politics, and religion. 
              From prehistoric cave paintings to modern architecture, 
              art reflects how cultures define themselves and change over time. 
              This tour explores three regions—Spain, Oceania, and Russia—each
              showcasing unique art forms highlighting the region's history, values, and 
              identity. By examining ancient cave paintings, indigenous tattooing and 
              wood carving, and revolutionary photography and architecture, 
              this journey will highlight how art serves as both a preserver of 
              tradition and a catalyst for innovation. 
            </p>
          </div>
          <img className="homeImage" src={DalleImage} alt="Art Image" />
        </div>
      </section>

        {/* Image Carousel Section */}

      <section className="carousel-section">
        <h2 className="carousel-title">Explore Art from Different Regions</h2>
        <ImageCarousel settings={settings} />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="homeFooterText">
          World Cultural Regions: This assignment was created to satisfy requirements for the 
          Rutgers University Geography course "World Cultural Regions 205", 
          taught by Professor Jenny R. Isaacs, PhD.
        </p>

        <p className="homeFooterText">
          In this project, I will use course content and independent research to plan a tour to 
          international sites located in at least three regions.
        </p>
      </footer>
    </div>
  );
}

export default App;
