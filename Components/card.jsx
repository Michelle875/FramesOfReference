// FloatingCard.jsx
import React from "react";
import './card.css';

const FloatingCard = ({ title, image, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default FloatingCard;
