"use client"; 

import { useEffect, useState, useRef } from "react";
import JSConfetti from "js-confetti";
import "./styles.css";

const ConfettiCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    
    if (canvasRef.current) {
      confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
    }
  }, []);

  const handleClick = () => {
    if (!isFlipped && confettiRef.current) {
      confettiRef.current.addConfetti({
        confettiRadius: 5,
        confettiNumber: 300,
      });
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? "active" : "inactive"}`}>
      <div className="card-front">
        <button type="button" onClick={handleClick} className="trigger icon">
          {frontContent}
        </button>
      </div>

 
    </div>
  );
};

export default ConfettiCard;
