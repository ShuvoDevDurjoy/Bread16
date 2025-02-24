import React, { useEffect, useRef, useState } from "react";
import "./GamePanel.css";
import ActionButton from "../../Component/ActionButton/ActionButton";
import background_video from '../../images/win_video.mp4'

const GamePanel = ({ start = 0, player1, player2 }) => {
  const canvasRef = useRef(null);
  const canvasWidth = useRef(0);
  const canvasHeight = useRef(0);
  const canvasDistanceWidth = useRef(0);
  const canvasDistanceHeight = useRef(0);
  const gamePanel = useRef([]);
  const [playerPanel, setPlayerPanel] = useState([]);
  const playerBoard = useRef([]);
  const [currentSelection, setCurrentSelection] = useState([-1, -1]);
  const current_turn = useRef("*");
  const [player1Count,setPlayer1Count] = useState(0) ; 
  const [player2Count,setPlayer2Count] = useState(0) ;

  function loadWidthAndHeightAndCanvasDistance() {
    const boundingRef_canvas =
      canvasRef.current.parentElement.getBoundingClientRect();
    canvasWidth.current = boundingRef_canvas.width - 50;
    canvasHeight.current = boundingRef_canvas.height - 50;
    // console.log("canvaswidthcurrent", canvasWidth.current);
    canvasRef.current.width = boundingRef_canvas.width;
    canvasRef.current.height = boundingRef_canvas.height;
    canvasDistanceWidth.current = canvasWidth.current / 4;
    canvasDistanceHeight.current = canvasHeight.current / (start ? 6 : 4);
  }

  function reload(){
    setPlayer1Count(0);
    setPlayer2Count(0) ; 
    const g = canvasRef.current.getContext('2d');
    fill(g);
    draw(g);
    console.log('game panel is : ');
    console.log(gamePanel.current);
    console.log('player board is : ');
    console.log(playerBoard.current);
    console.log('player panel is : ');
    console.log(playerPanel)
  }

  function fillup(){
    let temp = [];
    playerBoard.current = [];
    if (start === 1) {
      temp = ["*", "-", "*", "-", "*"];
      playerBoard.current.push(temp);
      temp = ["-", "*", "*", "*", "-"];
      playerBoard.current.push(temp);
    }
    for (let i = 0; i < 5; ++i) {
      temp = [];
      for (let j = 0; j < 5; ++j) {
        if (i === 2) {
          temp.push(".");
        } else if (i < 2) {
          temp.push("*");
        } else {
          temp.push("/");
        }
      }
      playerBoard.current.push(temp);
    }
    if (start === 1) {
      temp = ["-", "/", "/", "/", "-"];
      playerBoard.current.push(temp);
      temp = ["/", "-", "/", "-", "/"];
      playerBoard.current.push(temp);
    }
  }

  function fill(g) {
    g.clearRect(0, 0, canvasWidth.current, canvasHeight.current);
    g.beginPath();
    gamePanel.current = [];
    var temp;
    if (start === 1) {
      temp = [
        [25 + 1*canvasDistanceWidth.current, 25],
        [25 + 1.5 * canvasDistanceWidth.current, 25],
        [25 + 2 * canvasDistanceWidth.current, 25],
        [25 + 2.5 * canvasDistanceWidth.current, 25],
        [25 + 3 * canvasDistanceWidth.current, 25],
      ];
      gamePanel.current.push(temp);
      temp = [
        [25 , 25 + canvasDistanceHeight.current / 2],
        [
          25 + 1.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current / 2,
        ],
        [
          25 + 2 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current / 2,
        ],
        [
          25 + 2.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current / 2,
        ],
        [
          25 + 4 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current / 2,
        ],
      ];
      gamePanel.current.push(temp);
    }

    // console.log("starting");
    for (let i = start; i < start + 5; ++i) {
      temp = [];
      for (let j = 0; j < 5; ++j) {
        temp.push([
          25 + j * canvasDistanceWidth.current,
          25 + i * canvasDistanceHeight.current,
        ]);
      }
      gamePanel.current.push(temp);
    }

    if (start === 1) {
      temp = [
        [25, 25 + canvasDistanceHeight.current * 5.5],
        [
          25 + 1.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 5.5,
        ],
        [
          25 + 2 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 5.5,
        ],
        [
          25 + 2.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 5.5,
        ],
        [
          25 + 4 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 5.5,
        ],
      ];
      gamePanel.current.push(temp);
      temp = [
        [25 + 1*canvasDistanceWidth.current, 25 + canvasDistanceHeight.current * 6],
        [
          25 + 1.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 6,
        ],
        [
          25 + 2 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 6,
        ],
        [
          25 + 2.5 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 6,
        ],
        [
          25 + 3 * canvasDistanceWidth.current,
          25 + canvasDistanceHeight.current * 6,
        ],
      ];
      gamePanel.current.push(temp);
    }

    setPlayerPanel(gamePanel.current);
    g.stroke();    
    // console.log(playerBoard.current);
  }

  function draw(g) {
    const panel = gamePanel.current;
    g.fillStyle = "red";
    g.beginPath();
    var inc = start === 0 ? 0 : 2;
    if (start === 1) {
      g.moveTo(panel[2][2][0], panel[2][2][1]);
      g.lineTo(panel[0][0][0], panel[0][0][1]);
      g.lineTo(panel[0][4][0], panel[0][4][1]);
      g.lineTo(panel[2][2][0], panel[2][2][1]);
      g.lineTo(panel[0][2][0], panel[0][2][1]);
      g.moveTo(panel[1][1][0], panel[1][1][1]);
      g.lineTo(panel[1][3][0], panel[1][3][1]);
    }
    for (let i = inc; i < 5 + inc; ++i) {
      for (let j = 1; j < 5; ++j) {
        if (j === 1 && i > 0 + inc) {
          g.moveTo(panel[i - 1][j - 1][0], panel[i - 1][j - 1][1]);
          g.lineTo(panel[i][j - 1][0], panel[i][j - 1][1]);
        }
        if (i === inc) {
          g.moveTo(panel[i][j][0], panel[i][j][1]);
          g.lineTo(panel[i][j - 1][0], panel[i][j - 1][1]);
        } else {
          g.moveTo(panel[i][j][0], panel[i][j][1]);
          g.lineTo(panel[i - 1][j][0], panel[i - 1][j][1]);
          g.moveTo(panel[i][j][0], panel[i][j][1]);
          g.lineTo(panel[i][j - 1][0], panel[i][j - 1][1]);
          g.moveTo(panel[i][j][0], panel[i][j][1]);
          g.lineTo(panel[i - 1][j - 1][0], panel[i - 1][j - 1][1]);
          g.moveTo(panel[i - 1][j][0], panel[i - 1][j][1]);
          g.lineTo(panel[i][j - 1][0], panel[i][j - 1][1]);
          g.lineWidth = 3;
          g.fillStyle = "red";
        }
      }
    }
    if (start === 1) {
      g.moveTo(panel[6][2][0], panel[6][2][1]);
      g.lineTo(panel[8][0][0], panel[8][0][1]);
      g.lineTo(panel[8][4][0], panel[8][4][1]);
      g.lineTo(panel[6][2][0], panel[6][2][1]);
      g.lineTo(panel[8][2][0], panel[8][2][1]);
      g.moveTo(panel[7][1][0], panel[7][1][1]);
      g.lineTo(panel[7][3][0], panel[7][3][1]);
    }
    g.stroke();
  }

  function check_helper(x, y, a, b, str) {
    let checkingValue = Math.sqrt(
      Math.pow(Math.abs(x - a), 2) + Math.pow(Math.abs(y - b), 2)
      );
      if (start === 1 && (x < 2 || a < 2 || x > 6 || a > 6)) {
        if(((x===0&&y===0&&a===0&&b===4)||(x===0&&y===4&&a===0&&b===0))||((x===8&&y===0&&a===8&&b===4)||(x===8&&y===4&&a===8&&y===0))){
          checkingValue = 2 ; 
        }
      console.log('exceprion',checkingValue)
      if(checkingValue !== 2&&checkingValue !== Math.sqrt(8)){
        return false;
      }
      
      const arr = {
        "00": ['20',"02"],
        "80": ['60','82'],
        "02": ["20", "24",'04','00'],
        "82": ["60", "64","80","84"],
        "04": ["24","02"],
        "84": ['64','82'],
        "11": ['31'],
        "71": ['51'],
        "12": ["30", "34","10","14"],
        "72": ["50", "54","70","74"],
        "13": ['33'],
        "73": ['53'],
        "22": [],
        "62": [],
      };
      let t = `${x}${y}`;
      let s = `${a}${b}`;
      let found = false;
      console.log('t is : ',t);
      console.log('s is : ',s);
      

      arr[t]?.map((cur,ind)=>{
        if(cur===s){
          found = true;
          return false;
        }
      })

      if(found) return false ;
      arr[s]?.map((cur,ind)=>{
        if(cur===t){
          found = true;
          return false;
        }
      })
      if(found){
        return false;
      }

      if((a<0||a>8||b<0||b>4)) return false;

      if (playerBoard.current[a][b] !== ".") {
        return false;
      }
      let c = x + (a - x) / 2;
      let d = y + (b - y) / 2;
      console.log(c, d);
      if (
        playerBoard.current[c][d] === "." ||
        playerBoard.current[c][d] === current_turn.current
      ) {
        return false;
      }
      return true;

    }
    // console.log(`${str}`,x,y,a,b)
    if (
      a < (start === 1 ? 2 : 0) ||
      a > (start === 1 ? 6 : 4) ||
      b < 0 ||
      b > 4
    ) {
      return false;
    }

    if (checkingValue !== 2 && checkingValue !== Math.sqrt(8)) {
      console.log(checkingValue);
      console.log("returning from here");
      return false;
    }

    if (playerBoard.current[a][b] !== ".") {
      return false;
    }
    let c = x + (a - x) / 2;
    let d = y + (b - y) / 2;
    console.log(c, d);
    if (
      playerBoard.current[c][d] === "." ||
      playerBoard.current[c][d] === current_turn.current
    ) {
      return false;
    }
    // window.alert('returning true for : ',x,y,a,b);
    return true;
  }

  function checking_turn(a, b) {
    if (
      check_helper(a, b, a - 2, b - 2, "calling") ||
      check_helper(a, b, a + 2, b + 2, "calling") ||
      check_helper(a, b, a + 2, b, "calling") ||
      check_helper(a, b, a - 2, b, "calling") ||
      check_helper(a, b, a, b + 2, "calling") ||
      check_helper(a, b, a, b - 2, "calling") ||
      check_helper(a, b, a - 2, b + 2, "calling") ||
      check_helper(a, b, a + 2, b - 2, "calling")
    ) {
      console.log("returning true");
      return true;
    }
    return false;
  }

  useEffect(() => {
    // console.log("loaded");
    loadWidthAndHeightAndCanvasDistance();
    fillup(); 
    fill(canvasRef.current.getContext("2d"));
    draw(canvasRef.current.getContext("2d"));
    // console.log(playerPanel.current);
  }, []);

  function clickHandler(index, i) {
    console.log(
      "current selction : ",
      currentSelection[0],
      currentSelection[1]
    );
    if (currentSelection[0] === -1) {
      if (
        playerBoard.current[index][i] === "." ||
        playerBoard.current[index][i] !== current_turn.current
      )
        return;
      else setCurrentSelection([index, i]);
      return;
    } else if (
      playerBoard.current[currentSelection[0]][currentSelection[1]] ===
      playerBoard.current[index][i]
    ) {
      setCurrentSelection([index, i]);
      return;
    }
    // window.alert(playerBoard.current[index][i]);
    if (currentSelection[0] === -1 && currentSelection[1] === -1) {
      setCurrentSelection([index, i]);
    } else if (playerBoard.current[index][i] === ".") {
      let x = Math.sqrt(
        Math.pow(Math.abs(currentSelection[0] - index), 2) +
          Math.pow(Math.abs(currentSelection[1] - i), 2)
      );

      if(start===1){
        if((currentSelection[0]===0&&currentSelection[1]===0&&index===0&&i===2)||
        (currentSelection[0]===0&&currentSelection[1]===2&&index===0&&i===0)||
        (currentSelection[0]===0&&currentSelection[1]===2&&index===0&&i===4)||
        (currentSelection[0]===0&&currentSelection[1]===4&&index===0&&i===2)){
          x = 1 ; 
        }
        else if((currentSelection[0]===8&&currentSelection[1]===0&&index===8&&i===2)||
        (currentSelection[0]===8&&currentSelection[1]===2&&index===8&&i===0)||
        (currentSelection[0]===8&&currentSelection[1]===2&&index===8&&i===4)||
        (currentSelection[0]===8&&currentSelection[1]===4&&index===8&&i===2)){
          x = 1 ; 
        }
      }

      // console.log(x);
      if (
        start === 1 &&
        (currentSelection[0] < 2 ||
          index < 2 ||
          currentSelection[0] > 6 ||
          index > 6) && (x===1||x===Math.sqrt(2))
      ) {
        const arr = {
          "00": ["02", "11"],
          "80": ["82", "71"],
          "02": ["00", "04", "12"],
          "82": ["80", "84", "72"],
          "04": ["02", "13"],
          "84": ["82", "73"],
          "11": ["00", "22", "12"],
          "71": ["80", "62", "72"],
          "12": ["11", "13", "02", "22"],
          "72": ["62", "72", "73", "82"],
          "13": ["04", "12", "22"],
          "73": ["84", "62", "72"],
          "22": ["11", "12", "13"],
          "62": ["71", "72", "73"],
        };
        let t = `${currentSelection[0]}${currentSelection[1]}`;
        let s = `${index}${i}`;
        let found = false;
        arr[t]?.map((cur, ind) => {
          if (cur === s) {
            console.log("returning from first block");
            console.log("current is : ", cur);
            console.log("temp is : ", t);
            playerBoard.current[index][i] = current_turn.current;
            playerBoard.current[currentSelection[0]][currentSelection[1]] = ".";
            setCurrentSelection([-1, -1]);
            current_turn.current =
              playerBoard.current[index][i] === "/" ? "*" : "/";
            found = true;
            return;
          }
        });
        if(found) return;
        arr[s]?.map((cur, ind) => {
          if (cur === t) {
            console.log("returning from the second block");
            console.log("current is : ", cur);
            console.log("temp is : ", t);
            playerBoard.current[index][i] = current_turn.current;
            playerBoard.current[currentSelection[0]][currentSelection[1]] = ".";
            setCurrentSelection([-1, -1]);
            current_turn.current =
              playerBoard.current[index][i] === "/" ? "*" : "/";
            return;
          }
        });
        return;
      }
      if (
        x === 1 ||
        (x === Math.sqrt(2) &&
          !(
            start === 1 &&
            !(
              currentSelection[0] > 1 &&
              index > 1 &&
              currentSelection[0] < 7 &&
              index < 7
            )
          ))
      ) {
        //  else {
        playerBoard.current[index][i] =
          playerBoard.current[currentSelection[0]][currentSelection[1]];
        playerBoard.current[currentSelection[0]][currentSelection[1]] = ".";
        setCurrentSelection([-1, -1]);
        current_turn.current =
          playerBoard.current[index][i] === "/" ? "*" : "/";
        // }
      } else if (
        check_helper(
          currentSelection[0],
          currentSelection[1],
          index,
          i,
          "called to helper : "
        )
      ) {
        console.log(
          "current selction : ",
          currentSelection[0],
          currentSelection[1]
        );
        console.log("clicked : ", index, i);
        let a = currentSelection[0] + (index - currentSelection[0]) / 2;
        let b = currentSelection[1] + (i - currentSelection[1]) / 2;
        playerBoard.current[a][b] = ".";
        playerBoard.current[currentSelection[0]][currentSelection[1]] = ".";
        playerBoard.current[index][i] = current_turn.current;
        if(current_turn.current==='*'){
          setPlayer1Count(prev=>prev+1);
        }
        else{
          setPlayer2Count(prev=>prev+1);
        }
        setCurrentSelection([-1, -1]);
        let c = 0,
          count = 0;
        for (let p = 0; p < 5 + (start === 1 ? 4 : 0); p++) {
          for (let q = 0; q < 5; q++) {
            if (playerBoard.current[p][q] === current_turn.current) {
              c++;
              if (!checking_turn(p, q)) {
                count++;
              }
            }
          }
        }
        if (c === count) {
          current_turn.current = current_turn.current === "/" ? "*" : "/";
        }
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    async function resized() {
      loadWidthAndHeightAndCanvasDistance();
      fill(canvasRef.current.getContext("2d"));
      // fill();
      draw(canvasRef.current.getContext("2d"));
      // console.log(playerPanel.current);
    }

    window.addEventListener("resize", resized);

    return () => {
      window.removeEventListener("resize", resized);
    };
  }, []);

  return (
    <div className="game_panel_main_container">
      {
        ((start===1&&player1Count===16)||
        (start===1&&player2Count===16)||
        (start===0&&player1Count===10)||
        (start===0&&player2Count===10))?
        <div className="win">
          <div className="background_video">
            <video src={background_video} autoPlay='true' muted loop></video>
          </div>
            <div>
              <h2>Congratulations!!!</h2>
            <h1>
            {
              (player1Count===10||player1Count===16)?`${player1} Won The Game`:`${player2} Won The Game`
            }
          </h1>
            </div>
            <div className="fl">
            <ActionButton button_text={'Back To Home'} classes={'z-index-inherit'} index='back_to_home_finish_button' action=''></ActionButton>
            <ActionButton button_text={'Play Again'} classes={'z-index-inherit'} index='play_again_finish_button' action='game_panel' func={reload}></ActionButton>

            </div>
        </div>
          :''
      }
      <div className="game_panel_container">
        <div className="player1" onClick={(event)=>{
          console.log(event.target.classList);
          event.target.classList.toggle('rotate');}}>{
          <p>{player1} {player1Count===0?"":` : ${player1Count}`}</p>
        }</div>
        <div className="player2" onClick={(event)=>{
          event.target.classList.toggle('rotate');
        }}>
          {
            <p>{player2} {player2Count===0?"":` : ${player2Count}`}</p>
          }
        </div>
        <div className="game_board">
          <canvas id="game_panel" ref={canvasRef}></canvas>
          {playerPanel.map((current, index) => {
            return current.map((_, i) => {
              let index1 = index,
                index2 = i;
              return (
                <div
                  className={`player ${
                    playerBoard.current[index][i] === "."
                      ? "inactive"
                      : currentSelection[0] === index &&
                        currentSelection[1] === i
                      ? "active"
                      : ""
                  }
                  ${
                    current_turn.current === playerBoard.current[index][i]
                      ? "allactive"
                      : ""
                  }`}
                  onClick={(index, i) => {
                    // console.log("index is : ", index);
                    // console.log("i is : ", i);
                    clickHandler(index1, index2);
                  }}
                  style={{ left: `${_[0]}px`, top: `${_[1]}px` }}
                  key={`${index}----${i}`}
                >
                  <div
                    className={`inner_div ${
                      playerBoard.current[index][i] === "/"
                        ? "red"
                        : playerBoard.current[index][i] === "."
                        ? "inactive"
                        : playerBoard.current[index][i] === "-"
                        ? "notactive"
                        : "blue"
                    }`}
                  ></div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
