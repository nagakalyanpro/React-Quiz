import React, { useState } from "react";

const NavC = (props) => {
  const { currentLevel, score, handleGame } = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          Quiz App
        </a>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
         
            Level: {currentLevel}
        
        </li>
        <li className="nav-item">
        
            Score: <span>{score}</span>
       
        </li>
        <li className="nav-item">
          <a href="/leaderboard" className="nav-link">
            {/* Leaderboard */}
          </a>
        </li>
      </ul>
      <div className="quit" onClick={handleGame()}
      style={{color:'orange', cursor:'pointer'}}
      >
        Quit
      </div>
    </nav>
  );
};

export default NavC;
