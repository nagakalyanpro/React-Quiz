import React from "react";

const QuitC = (props) => {
  const { handleQuit } = props;
  return (
    <div className="modal-overlay">
      <div className="quit-sec">
        <h2 className="quit-heading">Good Bye</h2>
        <h4 className="quit-subheading">Have a Great Day</h4>
        <button className="quit-button" onClick={handleQuit()}>
          <a href="/"
          style={{backgroundColor:"#4CAF50", color:'white', underline:"none"}}
          >Restart</a>
        </button>
      </div>
    </div>
  );
};

export default QuitC;
