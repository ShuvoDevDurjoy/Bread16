import React, { useEffect } from 'react'
import './ActionButton.css'
import { Link } from 'react-router-dom'

const ActionButton = ({button_text, index, action, classes,func}) => {
  function clickHandle(){
    if(func){
      func();
    }
  }
  return (
    <div className={`action_button ${classes}`} key={index} onClick={clickHandle} >
        <Link to={`/${action}`}>{button_text}</Link>
    </div>
  )
}

export default ActionButton;
