import React from 'react'

const LevelsC = ({ currentLevel }) => {
  const levels = [];
  for (let i = 1; i <= 4; i++) {
    const className = i - 1 === currentLevel ? "each-level current-level blue-bg" : "each-level";
    levels.push(
      <div className={className} key={i}>
        Level-{i}
      </div>
    );
  }

  return (
    <div className='side-level-section'>
      {levels}
    </div>
  )
}

export default LevelsC