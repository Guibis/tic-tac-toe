const currentPlayer = document.querySelector(".currentPlayer");
const score = document.querySelector(".score");
const mainElement = document.querySelector("main");
const bodyElement = document.querySelector("body");

let selected;
let scores = [0,0];
let player = "X";

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];

  currentPlayer.innerHTML = `Player's turn: ${player}`;

  playerBorder();

  score.innerHTML = `Player X: ${scores[0]}<br/>Player O: ${scores[1]}`;

  document.querySelectorAll(".tic-tac button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `Player's turn: ${player}`;

  playerBorder();
}

function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("THE PLAYER '" + playerLastMove + "' WIN!");
      if(playerLastMove === "X"){
        scores[0]++;
      }
      if(playerLastMove === "O"){
        scores[1]++;
      }
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {
    alert("IT WAS A DRAW!");
    init();
    return;
  }
}

function reset(){
    document.querySelectorAll(".tic-tac button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
  if(scores[0] > scores[1]){
      alert("THE PLAYER 'X' WON THIS MATCH!!");
    }
    if(scores[1] > scores[0]){
        alert("THE PLAYER 'O' WON THIS MATCH!!");
    }
    if(scores[0] == scores[1]){
        alert("DRAW!!");
    }
    score.innerHTML = `Player X: ${scores[0] = 0}<br/>Player O: ${scores[1] = 0}`;
  init();
}

function playerBorder(){
  if(player === "X"){
    mainElement.style.border = "4px inset rgb(0, 228, 0)";
    bodyElement.style.backgroundColor = "#02AB72";
  } else if(player === "O"){
    mainElement.style.border = "4px outset rgb(0, 0, 207)";
    bodyElement.style.backgroundColor = "#03D5FB";
  }
}