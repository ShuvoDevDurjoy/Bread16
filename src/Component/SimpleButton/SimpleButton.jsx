import React from 'react'
import './SimpleButton.css'

const SimpleButton = ({button_text, classes, index, clickText, setGameState}) => {
  return (
    <div className={`simple_button_container ${classes}`} key={index} onClick={()=>setGameState(clickText)}> 
      <p className='button_text' key={`button_text_${index}`}>{button_text}</p>
    </div>
  )
}

export default SimpleButton
