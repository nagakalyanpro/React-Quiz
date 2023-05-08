import React, {useState} from 'react'
import BoardC from '../components/BoardC'
import NameInput from '../components/NameInput';

const MainPage = () => {
  const [userName, setUserName] = useState('');
  const [showBoard, setShowBoard] = useState(false)

  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowBoard(true)
  }


  return (
    <div>
      {showBoard? 
        <BoardC userName={userName}/> : <NameInput onNameSubmit={handleNameSubmit}/>}
    </div>
  )
}

export default MainPage