import React, { useState } from "react";
import "./Home.css";
import SimpleButton from "../../Component/SimpleButton/SimpleButton";
import ActionButton from "../../Component/ActionButton/ActionButton";
const Home = ({gameState,setGameState,player1,setPlayer1,player2,setPlayer2}) => {
  return (
    <div className="home_main_container">
      <h1 className="h_type_1">Welcome to Bread16 Game</h1>
      <div className="game_select">
        <SimpleButton
          button_text={"16 Guti"}
          classes={gameState === 1 ? "active" : ""}
          key={"16_guti_selection_button"}
          clickText={1}
          setGameState={setGameState}
        />
        <SimpleButton
          button_text={"10 Guti"}
          classes={gameState === 0 ? "active" : ""}
          key={"10_guti_selection_button"}
          clickText={0}
          setGameState={setGameState}
        />
      </div>
      <div className="players_name">
        <input type="text" placeholder="Player 1's Name " value={player1} onChange={(event)=>{setPlayer1(event.target.value)}} />
        <input type="text" name="" id="" placeholder="player 2's Name " value={player2} onChange={(event)=>{setPlayer2(event.target.value)}} />
      </div>
      <div className="game_start_link">
        <ActionButton
          button_text={"Start Game"}
          classes={""}
          action="game_panel"
          index="staring_game_button"
        />
      </div>
    </div>
  );
};

export default Home;
