import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Background from './Container/Background/Background'
import Home from './Container/Home/Home'
import GamePanel from './Container/GamePanel/GamePanel'
import ActionButton from './Component/ActionButton/ActionButton'
const App = () => {
  const [gameState, setGameState] = useState(1) ; 
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  useEffect(()=>{
    console.log(gameState)
  },[gameState])
  return (
      <div className='app_main_container'>
      <Routes>
        <Route path='/' element={<Home gameState={gameState} setGameState={setGameState} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2}/>}></Route>
        <Route path='/game_panel' element={<GamePanel start={gameState} player1={player1===""?'Player 1':player1} player2={player2===""?"Player 2":player2} />}></Route>
      </Routes>
    </div>
  )
}

export default App
