import React, { useState } from 'react';

const NameInput = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onNameSubmit(name);
    }
  }

  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
 <div className="modal-overlay">
      <div className="modal-content">
        <h1 className='welcome-title'>Welcome to React Quiz App</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"
          style={{color:'silver'}}
          >Enter your name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Your name"
            className='name-input'
          />
          <button className="name-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;
